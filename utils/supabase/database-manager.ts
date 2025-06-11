import { createClient } from "@supabase/supabase-js";

// Configuration interface for data generation
export interface DataGenerationConfig {
  countries: number; // Will use predefined list, not random
  cities: number; // Will use predefined list, not random
  users: number;
  products: number;
  orders: number;
  orderItemsPerOrder: { min: number; max: number };
  dateRange: {
    start: string; // YYYY-MM-DD
    end: string; // YYYY-MM-DD
  };
}

// Default configuration
export const DEFAULT_CONFIG: DataGenerationConfig = {
  countries: 25,
  cities: 50,
  users: 100,
  products: 100,
  orders: 500,
  orderItemsPerOrder: { min: 1, max: 5 },
  dateRange: {
    start: "2024-01-01",
    end: "2025-06-30",
  },
};

// Predefined data that shouldn't be random
const PREDEFINED_COUNTRIES = [
  { name: "United States", code: "US", continent: "North America" },
  { name: "United Kingdom", code: "UK", continent: "Europe" },
  { name: "France", code: "FR", continent: "Europe" },
  { name: "Germany", code: "DE", continent: "Europe" },
  { name: "Japan", code: "JP", continent: "Asia" },
  { name: "Australia", code: "AU", continent: "Oceania" },
  { name: "Brazil", code: "BR", continent: "South America" },
  { name: "Canada", code: "CA", continent: "North America" },
  { name: "India", code: "IN", continent: "Asia" },
  { name: "China", code: "CN", continent: "Asia" },
  { name: "Italy", code: "IT", continent: "Europe" },
  { name: "Spain", code: "ES", continent: "Europe" },
  { name: "Mexico", code: "MX", continent: "North America" },
  { name: "Russia", code: "RU", continent: "Europe" },
  { name: "South Korea", code: "KR", continent: "Asia" },
  { name: "Netherlands", code: "NL", continent: "Europe" },
  { name: "Sweden", code: "SE", continent: "Europe" },
  { name: "Norway", code: "NO", continent: "Europe" },
  { name: "Argentina", code: "AR", continent: "South America" },
  { name: "South Africa", code: "ZA", continent: "Africa" },
  { name: "Egypt", code: "EG", continent: "Africa" },
  { name: "Thailand", code: "TH", continent: "Asia" },
  { name: "Singapore", code: "SG", continent: "Asia" },
  { name: "New Zealand", code: "NZ", continent: "Oceania" },
  { name: "Switzerland", code: "CH", continent: "Europe" },
  { name: "Belgium", code: "BE", continent: "Europe" },
  { name: "Austria", code: "AT", continent: "Europe" },
  { name: "Portugal", code: "PT", continent: "Europe" },
  { name: "Denmark", code: "DK", continent: "Europe" },
  { name: "Finland", code: "FI", continent: "Europe" },
];

const PREDEFINED_CITIES = [
  { name: "New York", countryCode: "US", population: 8804190 },
  { name: "Los Angeles", countryCode: "US", population: 3898747 },
  { name: "Chicago", countryCode: "US", population: 2746388 },
  { name: "Houston", countryCode: "US", population: 2304580 },
  { name: "Phoenix", countryCode: "US", population: 1608139 },
  { name: "London", countryCode: "UK", population: 8982000 },
  { name: "Manchester", countryCode: "UK", population: 547627 },
  { name: "Birmingham", countryCode: "UK", population: 1141816 },
  { name: "Paris", countryCode: "FR", population: 2148271 },
  { name: "Lyon", countryCode: "FR", population: 516092 },
  { name: "Marseille", countryCode: "FR", population: 861635 },
  { name: "Berlin", countryCode: "DE", population: 3669491 },
  { name: "Munich", countryCode: "DE", population: 1488202 },
  { name: "Hamburg", countryCode: "DE", population: 1899160 },
  { name: "Tokyo", countryCode: "JP", population: 13960000 },
  { name: "Osaka", countryCode: "JP", population: 2691185 },
  { name: "Kyoto", countryCode: "JP", population: 1474570 },
  { name: "Sydney", countryCode: "AU", population: 5312163 },
  { name: "Melbourne", countryCode: "AU", population: 5078193 },
  { name: "Brisbane", countryCode: "AU", population: 2560720 },
  { name: "São Paulo", countryCode: "BR", population: 12325232 },
  { name: "Rio de Janeiro", countryCode: "BR", population: 6748000 },
  { name: "Brasília", countryCode: "BR", population: 3055149 },
  { name: "Toronto", countryCode: "CA", population: 2930000 },
  { name: "Vancouver", countryCode: "CA", population: 675218 },
  { name: "Montreal", countryCode: "CA", population: 1780000 },
  { name: "Mumbai", countryCode: "IN", population: 20411274 },
  { name: "Delhi", countryCode: "IN", population: 32941309 },
  { name: "Bangalore", countryCode: "IN", population: 12764935 },
  { name: "Beijing", countryCode: "CN", population: 21540000 },
  { name: "Shanghai", countryCode: "CN", population: 28516904 },
  { name: "Guangzhou", countryCode: "CN", population: 18676605 },
  { name: "Rome", countryCode: "IT", population: 2872800 },
  { name: "Milan", countryCode: "IT", population: 1396059 },
  { name: "Madrid", countryCode: "ES", population: 3223334 },
  { name: "Barcelona", countryCode: "ES", population: 1620343 },
  { name: "Mexico City", countryCode: "MX", population: 9209944 },
  { name: "Guadalajara", countryCode: "MX", population: 1385629 },
  { name: "Moscow", countryCode: "RU", population: 12506468 },
  { name: "St. Petersburg", countryCode: "RU", population: 5384342 },
  { name: "Seoul", countryCode: "KR", population: 9720846 },
  { name: "Busan", countryCode: "KR", population: 3448737 },
  { name: "Amsterdam", countryCode: "NL", population: 872680 },
  { name: "Stockholm", countryCode: "SE", population: 975551 },
  { name: "Oslo", countryCode: "NO", population: 697549 },
  { name: "Buenos Aires", countryCode: "AR", population: 3054300 },
  { name: "Cape Town", countryCode: "ZA", population: 4618263 },
  { name: "Cairo", countryCode: "EG", population: 10230350 },
  { name: "Bangkok", countryCode: "TH", population: 10539415 },
  { name: "Auckland", countryCode: "NZ", population: 1695200 },
];

// Random data generators
const FIRST_NAMES = [
  "James",
  "Mary",
  "John",
  "Patricia",
  "Robert",
  "Jennifer",
  "Michael",
  "Linda",
  "William",
  "Elizabeth",
  "David",
  "Barbara",
  "Richard",
  "Susan",
  "Joseph",
  "Jessica",
  "Thomas",
  "Sarah",
  "Christopher",
  "Karen",
  "Charles",
  "Nancy",
  "Daniel",
  "Lisa",
  "Matthew",
  "Betty",
  "Anthony",
  "Helen",
  "Mark",
  "Sandra",
  "Donald",
  "Donna",
  "Steven",
  "Carol",
  "Paul",
  "Ruth",
  "Andrew",
  "Sharon",
  "Joshua",
  "Michelle",
  "Kenneth",
  "Laura",
  "Kevin",
  "Sarah",
  "Brian",
  "Kimberly",
  "George",
  "Deborah",
  "Edward",
  "Dorothy",
  "Ronald",
  "Lisa",
  "Timothy",
  "Nancy",
  "Jason",
  "Karen",
  "Jeffrey",
  "Betty",
  "Ryan",
  "Helen",
  "Jacob",
  "Sandra",
  "Gary",
  "Donna",
  "Nicholas",
  "Carol",
  "Eric",
  "Ruth",
  "Jonathan",
  "Sharon",
  "Stephen",
  "Michelle",
  "Larry",
  "Laura",
  "Justin",
  "Sarah",
  "Scott",
  "Kimberly",
  "Brandon",
  "Deborah",
  "Benjamin",
  "Dorothy",
  "Samuel",
  "Amy",
  "Gregory",
  "Angela",
  "Alexander",
  "Ashley",
  "Patrick",
  "Brenda",
  "Frank",
  "Emma",
  "Raymond",
  "Olivia",
  "Jack",
  "Cynthia",
];

const LAST_NAMES = [
  "Smith",
  "Johnson",
  "Williams",
  "Brown",
  "Jones",
  "Garcia",
  "Miller",
  "Davis",
  "Rodriguez",
  "Martinez",
  "Hernandez",
  "Lopez",
  "Gonzalez",
  "Wilson",
  "Anderson",
  "Thomas",
  "Taylor",
  "Moore",
  "Jackson",
  "Martin",
  "Lee",
  "Perez",
  "Thompson",
  "White",
  "Harris",
  "Sanchez",
  "Clark",
  "Ramirez",
  "Lewis",
  "Robinson",
  "Walker",
  "Young",
  "Allen",
  "King",
  "Wright",
  "Scott",
  "Torres",
  "Nguyen",
  "Hill",
  "Flores",
  "Green",
  "Adams",
  "Nelson",
  "Baker",
  "Hall",
  "Rivera",
  "Campbell",
  "Mitchell",
  "Carter",
  "Roberts",
  "Gomez",
  "Phillips",
  "Evans",
  "Turner",
  "Diaz",
  "Parker",
  "Cruz",
  "Edwards",
  "Collins",
  "Reyes",
  "Stewart",
  "Morris",
  "Morales",
  "Murphy",
  "Cook",
  "Rogers",
  "Gutierrez",
  "Ortiz",
  "Morgan",
  "Cooper",
  "Peterson",
  "Bailey",
  "Reed",
  "Kelly",
  "Howard",
  "Ramos",
  "Kim",
  "Cox",
  "Ward",
  "Richardson",
];

const PRODUCT_CATEGORIES = [
  "Electronics",
  "Clothing",
  "Home & Garden",
  "Sports",
  "Kitchen",
  "Books",
  "Health & Beauty",
  "Toys",
  "Automotive",
  "Office Supplies",
  "Pet Supplies",
  "Jewelry",
  "Music",
  "Movies",
  "Games",
  "Food & Beverages",
];

const PRODUCT_ADJECTIVES = [
  "Premium",
  "Professional",
  "Deluxe",
  "Ultra",
  "Smart",
  "Wireless",
  "Portable",
  "Compact",
  "Heavy-duty",
  "Lightweight",
  "Waterproof",
  "Eco-friendly",
  "Vintage",
  "Modern",
  "Classic",
  "Advanced",
  "Basic",
  "Essential",
  "Luxury",
  "Budget",
];

const PRODUCT_NOUNS = [
  "Phone",
  "Laptop",
  "Tablet",
  "Watch",
  "Camera",
  "Speaker",
  "Headphones",
  "Keyboard",
  "Mouse",
  "Monitor",
  "Printer",
  "Router",
  "Charger",
  "Cable",
  "Case",
  "Stand",
  "Holder",
  "Mount",
  "Adapter",
  "Battery",
  "Light",
  "Fan",
  "Heater",
  "Cooler",
  "Blender",
  "Mixer",
  "Toaster",
  "Kettle",
  "Pot",
  "Pan",
  "Knife",
  "Spoon",
  "Fork",
  "Plate",
  "Bowl",
  "Cup",
  "Mug",
  "Bottle",
  "Jar",
  "Box",
  "Bag",
  "Backpack",
  "Wallet",
  "Belt",
  "Hat",
  "Shirt",
  "Pants",
  "Shoes",
  "Jacket",
  "Dress",
  "Skirt",
  "Shorts",
  "Socks",
  "Gloves",
  "Scarf",
  "Tie",
];

// Utility functions
function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomChoice<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

function randomDate(start: Date, end: Date): Date {
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  );
}

function formatDate(date: Date): string {
  return date.toISOString().split("T")[0];
}

function generateEmail(firstName: string, lastName: string): string {
  const domains = [
    "gmail.com",
    "yahoo.com",
    "hotmail.com",
    "outlook.com",
    "example.com",
  ];
  const separators = [".", "_", ""];
  const numbers = Math.random() > 0.7 ? randomInt(1, 999).toString() : "";

  return `${firstName.toLowerCase()}${randomChoice(
    separators
  )}${lastName.toLowerCase()}${numbers}@${randomChoice(domains)}`;
}

function generateProductName(): string {
  const adjective = randomChoice(PRODUCT_ADJECTIVES);
  const noun = randomChoice(PRODUCT_NOUNS);
  const hasModel = Math.random() > 0.6;
  const model = hasModel
    ? ` ${randomChoice([
        "Pro",
        "Max",
        "Plus",
        "Elite",
        "X",
        "Ultra",
        "2024",
        "V2",
        "HD",
      ])}`
    : "";

  return `${adjective} ${noun}${model}`;
}

function generateProductDescription(name: string): string {
  const features = [
    "high-quality materials",
    "advanced technology",
    "user-friendly design",
    "durable construction",
    "energy efficient",
    "compact size",
    "premium finish",
    "easy to use",
    "versatile functionality",
    "modern styling",
    "reliable performance",
    "innovative features",
    "ergonomic design",
    "long-lasting",
    "professional grade",
  ];

  const benefits = [
    "perfect for daily use",
    "ideal for professionals",
    "great for home or office",
    "suitable for all ages",
    "enhances productivity",
    "saves time and effort",
    "provides excellent value",
    "meets all your needs",
    "exceeds expectations",
    "delivers outstanding results",
    "offers superior performance",
    "ensures satisfaction",
  ];

  const feature = randomChoice(features);
  const benefit = randomChoice(benefits);

  return `${name} with ${feature}, ${benefit}.`;
}

// Create admin client with service role key
function createAdminClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceRoleKey) {
    throw new Error(
      "Missing Supabase environment variables. Please check your .env.local file."
    );
  }

  return createClient(supabaseUrl, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}

// Execute a single SQL statement using run_query
async function executeStatement(client: any, statement: string): Promise<void> {
  const trimmed = statement.trim();
  if (!trimmed || trimmed.startsWith("--") || trimmed.startsWith("/*")) {
    return; // Skip comments and empty statements
  }

  try {
    const { data, error } = await client.rpc("run_query", {
      query_text: trimmed,
    });

    if (error) {
      throw new Error(`SQL Error: ${error.message}`);
    }

    // Check if the response indicates an error
    if (data && typeof data === "object" && data.error) {
      throw new Error(`SQL Error: ${data.message}`);
    }

    console.log(`✅ Executed: ${trimmed.substring(0, 50)}...`);
  } catch (error: any) {
    console.error(`❌ Failed: ${trimmed.substring(0, 50)}...`);
    throw error;
  }
}

/**
 * Fix the run_query function to handle multiple rows properly
 */
export async function fixRunQueryFunction(): Promise<void> {
  console.log("🔧 Fixing run_query function...");

  const client = createAdminClient();

  const fixedFunction = `
    CREATE OR REPLACE FUNCTION run_query(query_text TEXT)
    RETURNS JSONB
    LANGUAGE plpgsql
    SECURITY DEFINER
    AS $$
    DECLARE
      result JSONB;
      rec RECORD;
      results JSONB := '[]'::JSONB;
    BEGIN
      -- Handle different types of queries
      IF UPPER(TRIM(query_text)) LIKE 'SELECT%' THEN
        -- For SELECT queries, collect all rows
        FOR rec IN EXECUTE query_text LOOP
          results := results || to_jsonb(rec);
        END LOOP;
        RETURN results;
      ELSE
        -- For non-SELECT queries (INSERT, UPDATE, DELETE, etc.)
        EXECUTE query_text;
        RETURN '{"success": true, "message": "Query executed successfully"}'::JSONB;
      END IF;
    EXCEPTION WHEN OTHERS THEN
      -- Return error as JSON instead of raising exception
      RETURN json_build_object(
        'error', true,
        'message', SQLERRM,
        'detail', SQLSTATE
      )::JSONB;
    END;
    $$
  `;

  try {
    await executeStatement(client, fixedFunction);
    console.log("✅ run_query function fixed successfully!");
  } catch (error) {
    console.error("❌ Failed to fix run_query function:", error);
    throw error;
  }
}

/**
 * Create all database tables
 */
export async function createTables(): Promise<void> {
  console.log("📋 Creating database tables...");

  const client = createAdminClient();

  const tableStatements = [
    `CREATE TABLE IF NOT EXISTS countries (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      code TEXT NOT NULL,
      continent TEXT NOT NULL
    )`,

    `CREATE TABLE IF NOT EXISTS cities (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      country_id INTEGER REFERENCES countries(id),
      population INTEGER
    )`,

    `CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      first_name TEXT NOT NULL,
      last_name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      country_id INTEGER REFERENCES countries(id),
      city_id INTEGER REFERENCES cities(id)
    )`,

    `CREATE TABLE IF NOT EXISTS products (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      description TEXT,
      price DECIMAL(10, 2) NOT NULL,
      category TEXT,
      stock INTEGER DEFAULT 0
    )`,

    `CREATE TABLE IF NOT EXISTS orders (
      id SERIAL PRIMARY KEY,
      user_id INTEGER REFERENCES users(id),
      total_amount DECIMAL(10, 2) NOT NULL,
      status TEXT DEFAULT 'pending',
      order_date DATE DEFAULT CURRENT_DATE,
      estimated_delivery DATE,
      delivery_date DATE
    )`,

    `CREATE TABLE IF NOT EXISTS order_items (
      id SERIAL PRIMARY KEY,
      order_id INTEGER REFERENCES orders(id),
      product_id INTEGER REFERENCES products(id),
      quantity INTEGER NOT NULL,
      price DECIMAL(10, 2) NOT NULL
    )`,
  ];

  for (const statement of tableStatements) {
    await executeStatement(client, statement);
  }

  console.log("✅ All tables created successfully!");
}

/**
 * Generate and insert sample data with advanced configuration
 */
export async function insertSampleData(
  config: DataGenerationConfig = DEFAULT_CONFIG
): Promise<void> {
  console.log("📊 Generating advanced sample data...");
  console.log(`📈 Configuration:`, config);

  const client = createAdminClient();

  // Insert countries (using predefined data)
  console.log("🌍 Inserting countries...");
  const countriesToInsert = PREDEFINED_COUNTRIES.slice(0, config.countries);
  const countriesValues = countriesToInsert
    .map(
      (country) =>
        `('${country.name}', '${country.code}', '${country.continent}')`
    )
    .join(",\n    ");

  const countriesData = `
    INSERT INTO countries (name, code, continent) VALUES
    ${countriesValues}
    ON CONFLICT DO NOTHING
  `;
  await executeStatement(client, countriesData);

  // Get country IDs for reference
  const { data: countries } = await client.rpc("run_query", {
    query_text: "SELECT id, code FROM countries ORDER BY id",
  });
  const countryMap = new Map(countries.map((c: any) => [c.code, c.id]));

  // Insert cities (using predefined data)
  console.log("🏙️ Inserting cities...");
  const citiesToInsert = PREDEFINED_CITIES.slice(0, config.cities);
  const citiesValues = citiesToInsert
    .filter((city) => countryMap.has(city.countryCode))
    .map(
      (city) =>
        `('${city.name}', ${countryMap.get(city.countryCode)}, ${
          city.population
        })`
    )
    .join(",\n    ");

  const citiesData = `
    INSERT INTO cities (name, country_id, population) VALUES
    ${citiesValues}
    ON CONFLICT DO NOTHING
  `;
  await executeStatement(client, citiesData);

  // Get city IDs for reference
  const { data: cities } = await client.rpc("run_query", {
    query_text: "SELECT id FROM cities ORDER BY id",
  });
  const cityIds = cities.map((c: any) => c.id);

  // Generate users
  console.log(`👥 Generating ${config.users} users...`);
  const usersData: string[] = [];
  const generatedEmails = new Set<string>();

  for (let i = 0; i < config.users; i++) {
    const firstName = randomChoice(FIRST_NAMES);
    const lastName = randomChoice(LAST_NAMES);
    let email = generateEmail(firstName, lastName);

    // Ensure unique emails
    while (generatedEmails.has(email)) {
      email = generateEmail(firstName, lastName);
    }
    generatedEmails.add(email);

    const countryId = randomChoice(Array.from(countryMap.values()));
    const cityId = randomChoice(cityIds);

    usersData.push(
      `('${firstName}', '${lastName}', '${email}', ${countryId}, ${cityId})`
    );
  }

  // Insert users in batches
  const batchSize = 100;
  for (let i = 0; i < usersData.length; i += batchSize) {
    const batch = usersData.slice(i, i + batchSize);
    const usersBatch = `
      INSERT INTO users (first_name, last_name, email, country_id, city_id) VALUES
      ${batch.join(",\n      ")}
      ON CONFLICT (email) DO NOTHING
    `;
    await executeStatement(client, usersBatch);
  }

  // Generate products
  console.log(`📦 Generating ${config.products} products...`);
  const productsData: string[] = [];
  const generatedProductNames = new Set<string>();

  for (let i = 0; i < config.products; i++) {
    let productName = generateProductName();

    // Ensure unique product names
    while (generatedProductNames.has(productName)) {
      productName = generateProductName();
    }
    generatedProductNames.add(productName);

    const description = generateProductDescription(productName);
    const price = randomInt(5, 2000);
    const category = randomChoice(PRODUCT_CATEGORIES);
    const stock = randomInt(0, 500);

    productsData.push(
      `('${productName.replace(/'/g, "''")}', '${description.replace(
        /'/g,
        "''"
      )}', ${price}, '${category}', ${stock})`
    );
  }

  // Insert products in batches
  for (let i = 0; i < productsData.length; i += batchSize) {
    const batch = productsData.slice(i, i + batchSize);
    const productsBatch = `
      INSERT INTO products (name, description, price, category, stock) VALUES
      ${batch.join(",\n      ")}
      ON CONFLICT DO NOTHING
    `;
    await executeStatement(client, productsBatch);
  }

  // Get user and product IDs for orders
  const { data: users } = await client.rpc("run_query", {
    query_text: "SELECT id FROM users ORDER BY id",
  });
  const userIds = users.map((u: any) => u.id);

  const { data: products } = await client.rpc("run_query", {
    query_text: "SELECT id, price FROM products ORDER BY id",
  });
  const productData = products.map((p: any) => ({ id: p.id, price: p.price }));

  // Generate orders with realistic date distribution
  console.log(`🛒 Generating ${config.orders} orders...`);
  const startDate = new Date(config.dateRange.start);
  const endDate = new Date(config.dateRange.end);
  const ordersData: string[] = [];
  const orderItemsData: string[] = [];

  for (let i = 0; i < config.orders; i++) {
    const userId = randomChoice(userIds);
    const orderDate = randomDate(startDate, endDate);
    const orderDateStr = formatDate(orderDate);

    // Determine order status based on date
    const now = new Date();
    const isInPast = orderDate < now;
    const daysSinceOrder = Math.floor(
      (now.getTime() - orderDate.getTime()) / (1000 * 60 * 60 * 24)
    );

    let status: string;
    let estimatedDelivery: string | null = null;
    let deliveryDate: string | null = null;

    if (orderDate > now) {
      // Future orders are pending
      status = "pending";
      const estimatedDays = randomInt(3, 14);
      estimatedDelivery = formatDate(
        new Date(orderDate.getTime() + estimatedDays * 24 * 60 * 60 * 1000)
      );
    } else if (daysSinceOrder < 2) {
      // Very recent orders are pending
      status = "pending";
      const estimatedDays = randomInt(3, 14);
      estimatedDelivery = formatDate(
        new Date(orderDate.getTime() + estimatedDays * 24 * 60 * 60 * 1000)
      );
    } else {
      // Older orders have various statuses
      const statusRand = Math.random();
      if (statusRand < 0.8) {
        status = "delivered";
        const estimatedDays = randomInt(3, 14);
        estimatedDelivery = formatDate(
          new Date(orderDate.getTime() + estimatedDays * 24 * 60 * 60 * 1000)
        );

        // Delivery can be early, on time, or late
        const deliveryVariation = randomInt(-2, 5); // -2 to +5 days from estimated
        const actualDeliveryDate = new Date(
          new Date(estimatedDelivery).getTime() +
            deliveryVariation * 24 * 60 * 60 * 1000
        );

        // Don't deliver in the future
        if (actualDeliveryDate <= now) {
          deliveryDate = formatDate(actualDeliveryDate);
        }
      } else if (statusRand < 0.9) {
        status = "pending";
        const estimatedDays = randomInt(3, 14);
        estimatedDelivery = formatDate(
          new Date(orderDate.getTime() + estimatedDays * 24 * 60 * 60 * 1000)
        );
      } else {
        status = "cancelled";
        // Cancelled orders have no delivery dates
      }
    }

    // Generate order items
    const numItems = randomInt(
      config.orderItemsPerOrder.min,
      config.orderItemsPerOrder.max
    );
    const selectedProducts = new Set<number>();
    let totalAmount = 0;

    for (let j = 0; j < numItems; j++) {
      let product: { id: number; price: number } = randomChoice(productData);

      // Avoid duplicate products in same order
      while (
        selectedProducts.has(product.id) &&
        selectedProducts.size < productData.length
      ) {
        product = randomChoice(productData);
      }
      selectedProducts.add(product.id);

      const quantity = randomInt(1, 5);
      const itemPrice = product.price;
      totalAmount += itemPrice * quantity;

      orderItemsData.push(
        `(${i + 1}, ${product.id}, ${quantity}, ${itemPrice})`
      );
    }

    const orderValues = [
      userId,
      totalAmount.toFixed(2),
      `'${status}'`,
      `'${orderDateStr}'`,
      estimatedDelivery ? `'${estimatedDelivery}'` : "NULL",
      deliveryDate ? `'${deliveryDate}'` : "NULL",
    ].join(", ");

    ordersData.push(`(${orderValues})`);
  }

  // Insert orders in batches
  for (let i = 0; i < ordersData.length; i += batchSize) {
    const batch = ordersData.slice(i, i + batchSize);
    const ordersBatch = `
      INSERT INTO orders (user_id, total_amount, status, order_date, estimated_delivery, delivery_date) VALUES
      ${batch.join(",\n      ")}
      ON CONFLICT DO NOTHING
    `;
    await executeStatement(client, ordersBatch);
  }

  // Insert order items in batches
  console.log("📋 Inserting order items...");
  for (let i = 0; i < orderItemsData.length; i += batchSize) {
    const batch = orderItemsData.slice(i, i + batchSize);
    const orderItemsBatch = `
      INSERT INTO order_items (order_id, product_id, quantity, price) VALUES
      ${batch.join(",\n      ")}
      ON CONFLICT DO NOTHING
    `;
    await executeStatement(client, orderItemsBatch);
  }

  console.log("✅ Advanced sample data generated successfully!");
  console.log(`📊 Generated:`);
  console.log(`   • ${countriesToInsert.length} countries`);
  console.log(`   • ${citiesToInsert.length} cities`);
  console.log(`   • ${config.users} users with unique emails`);
  console.log(
    `   • ${config.products} products across ${PRODUCT_CATEGORIES.length} categories`
  );
  console.log(
    `   • ${config.orders} orders from ${config.dateRange.start} to ${config.dateRange.end}`
  );
  console.log(`   • ${orderItemsData.length} order items`);
  console.log(`   • Realistic order statuses with proper date handling`);
}

/**
 * Drop all tables in correct order
 */
export async function dropAllTables(): Promise<void> {
  console.log("🗑️ Dropping all tables...");

  const client = createAdminClient();

  const dropStatements = [
    "DROP TABLE IF EXISTS order_items CASCADE",
    "DROP TABLE IF EXISTS orders CASCADE",
    "DROP TABLE IF EXISTS products CASCADE",
    "DROP TABLE IF EXISTS users CASCADE",
    "DROP TABLE IF EXISTS cities CASCADE",
    "DROP TABLE IF EXISTS countries CASCADE",
  ];

  for (const statement of dropStatements) {
    await executeStatement(client, statement);
  }

  console.log("✅ All tables dropped successfully!");
}

/**
 * Set up the complete database from scratch with custom configuration
 * This function automatically drops existing tables before recreating them
 */
export async function setupDatabase(
  config?: DataGenerationConfig
): Promise<void> {
  console.log("🚀 Setting up SQL Playground database...");

  try {
    // Always drop existing tables first to ensure clean setup
    console.log("🗑️ Cleaning existing database...");
    await dropAllTables();

    await fixRunQueryFunction();
    await createTables();
    await insertSampleData(config);

    const finalConfig = config || DEFAULT_CONFIG;
    console.log("🎉 Database setup completed successfully!");
    console.log("📊 Your database now contains:");
    console.log(`   • ${finalConfig.countries} countries with sample data`);
    console.log(`   • ${finalConfig.cities} cities with population data`);
    console.log(`   • ${finalConfig.users} users with realistic profiles`);
    console.log(
      `   • ${finalConfig.products} products across multiple categories`
    );
    console.log(
      `   • ${finalConfig.orders} orders with realistic date distribution`
    );
    console.log(`   • Order items with proper relationships`);
    console.log(`   • Working run_query() function`);
  } catch (error) {
    console.error("💥 Database setup failed:", error);
    throw error;
  }
}

/**
 * Set up database with large dataset for testing
 */
export async function setupLargeDatabase(): Promise<void> {
  const largeConfig: DataGenerationConfig = {
    countries: 30,
    cities: 100,
    users: 1000,
    products: 500,
    orders: 2000,
    orderItemsPerOrder: { min: 1, max: 8 },
    dateRange: {
      start: "2024-01-01",
      end: "2025-06-30",
    },
  };

  console.log("🚀 Setting up large SQL Playground database...");
  await setupDatabase(largeConfig);
}

/**
 * @deprecated Use setupDatabase() instead. This function is kept for backward compatibility.
 * Reset the database by dropping and recreating everything
 */
export async function resetDatabase(): Promise<void> {
  console.log("🔄 Resetting SQL Playground database...");
  console.log("⚠️ resetDatabase() is deprecated. Use setupDatabase() instead.");

  try {
    await setupDatabase();
    console.log("🎉 Database reset completed successfully!");
  } catch (error) {
    console.error("💥 Database reset failed:", error);
    throw error;
  }
}

/**
 * Check database health and return table information
 */
export async function getDatabaseInfo(): Promise<any> {
  console.log("📊 Checking database information...");

  const client = createAdminClient();

  try {
    const tables = [
      "countries",
      "cities",
      "users",
      "products",
      "orders",
      "order_items",
    ];
    const results: any = {};

    for (const table of tables) {
      try {
        const { data, error } = await client.rpc("run_query", {
          query_text: `SELECT COUNT(*) as count FROM ${table}`,
        });

        if (error || (data && data.error)) {
          results[table] = { error: "Table does not exist or query failed" };
        } else {
          results[table] = { count: data?.[0]?.count || 0 };
        }
      } catch (error) {
        results[table] = { error: "Table does not exist or query failed" };
      }
    }

    console.log("📊 Database info retrieved:", results);
    return results;
  } catch (error) {
    console.error("💥 Failed to get database info:", error);
    throw error;
  }
}

/**
 * Execute a custom SQL query safely
 */
export async function executeQuery(query: string): Promise<any> {
  console.log("🔍 Executing custom query...");

  const client = createAdminClient();

  try {
    const { data, error } = await client.rpc("run_query", {
      query_text: query,
    });

    if (error) {
      throw new Error(`Query execution failed: ${error.message}`);
    }

    console.log("✅ Query executed successfully");
    return data;
  } catch (error) {
    console.error("❌ Query execution failed:", error);
    throw error;
  }
}

/**
 * Utility to create the exec_sql RPC function if it doesn't exist
 * This is needed for the database manager to work
 */
export async function ensureExecSqlFunction(): Promise<void> {
  const client = createAdminClient();

  const createExecSqlFunction = `
    CREATE OR REPLACE FUNCTION exec_sql(sql_query TEXT)
    RETURNS VOID
    LANGUAGE plpgsql
    SECURITY DEFINER
    AS $$
    BEGIN
      EXECUTE sql_query;
    END;
    $$;
  `;

  try {
    const { error } = await client
      .from("pg_proc")
      .select("proname")
      .eq("proname", "exec_sql")
      .single();

    if (error) {
      // Function doesn't exist, create it
      await client.rpc("exec", { sql: createExecSqlFunction });
      console.log("✅ Created exec_sql function");
    }
  } catch (error) {
    // Try to create the function directly
    try {
      await client.rpc("exec", { sql: createExecSqlFunction });
      console.log("✅ Created exec_sql function");
    } catch (createError) {
      console.warn(
        "⚠️ Could not create exec_sql function. Manual setup may be required."
      );
    }
  }
}
