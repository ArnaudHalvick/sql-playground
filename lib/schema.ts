export const databaseSchema = [
  {
    name: "countries",
    columns: [
      { name: "id", type: "SERIAL", isPrimary: true, isForeign: false },
      { name: "name", type: "TEXT", isPrimary: false, isForeign: false },
      { name: "code", type: "TEXT", isPrimary: false, isForeign: false },
      { name: "continent", type: "TEXT", isPrimary: false, isForeign: false },
    ],
  },
  {
    name: "cities",
    columns: [
      { name: "id", type: "SERIAL", isPrimary: true, isForeign: false },
      { name: "name", type: "TEXT", isPrimary: false, isForeign: false },
      {
        name: "country_id",
        type: "INTEGER",
        isPrimary: false,
        isForeign: true,
        references: "countries(id)",
      },
      {
        name: "population",
        type: "INTEGER",
        isPrimary: false,
        isForeign: false,
      },
    ],
  },
  {
    name: "users",
    columns: [
      { name: "id", type: "SERIAL", isPrimary: true, isForeign: false },
      { name: "first_name", type: "TEXT", isPrimary: false, isForeign: false },
      { name: "last_name", type: "TEXT", isPrimary: false, isForeign: false },
      { name: "email", type: "TEXT", isPrimary: false, isForeign: false },
      {
        name: "country_id",
        type: "INTEGER",
        isPrimary: false,
        isForeign: true,
        references: "countries(id)",
      },
      {
        name: "city_id",
        type: "INTEGER",
        isPrimary: false,
        isForeign: true,
        references: "cities(id)",
      },
    ],
  },
  {
    name: "products",
    columns: [
      { name: "id", type: "SERIAL", isPrimary: true, isForeign: false },
      { name: "name", type: "TEXT", isPrimary: false, isForeign: false },
      { name: "description", type: "TEXT", isPrimary: false, isForeign: false },
      {
        name: "price",
        type: "DECIMAL(10,2)",
        isPrimary: false,
        isForeign: false,
      },
      { name: "category", type: "TEXT", isPrimary: false, isForeign: false },
      { name: "stock", type: "INTEGER", isPrimary: false, isForeign: false },
    ],
  },
  {
    name: "orders",
    columns: [
      { name: "id", type: "SERIAL", isPrimary: true, isForeign: false },
      {
        name: "user_id",
        type: "INTEGER",
        isPrimary: false,
        isForeign: true,
        references: "users(id)",
      },
      {
        name: "total_amount",
        type: "DECIMAL(10,2)",
        isPrimary: false,
        isForeign: false,
      },
      { name: "status", type: "TEXT", isPrimary: false, isForeign: false },
      { name: "order_date", type: "DATE", isPrimary: false, isForeign: false },
      {
        name: "estimated_delivery",
        type: "DATE",
        isPrimary: false,
        isForeign: false,
      },
      {
        name: "delivery_date",
        type: "DATE",
        isPrimary: false,
        isForeign: false,
      },
    ],
  },
  {
    name: "order_items",
    columns: [
      { name: "id", type: "SERIAL", isPrimary: true, isForeign: false },
      {
        name: "order_id",
        type: "INTEGER",
        isPrimary: false,
        isForeign: true,
        references: "orders(id)",
      },
      {
        name: "product_id",
        type: "INTEGER",
        isPrimary: false,
        isForeign: true,
        references: "products(id)",
      },
      { name: "quantity", type: "INTEGER", isPrimary: false, isForeign: false },
      {
        name: "price",
        type: "DECIMAL(10,2)",
        isPrimary: false,
        isForeign: false,
      },
    ],
  },
];
