export const databaseSchema = [
  {
    name: 'users',
    columns: [
      { name: 'id', type: 'int', isPrimary: true, isForeign: false },
      { name: 'first_name', type: 'text', isPrimary: false, isForeign: false },
      { name: 'last_name', type: 'text', isPrimary: false, isForeign: false },
      { name: 'email', type: 'text', isPrimary: false, isForeign: false },
      { name: 'country_id', type: 'int', isPrimary: false, isForeign: true, references: 'countries.id' },
      { name: 'city_id', type: 'int', isPrimary: false, isForeign: true, references: 'cities.id' },
      { name: 'created_at', type: 'timestamp', isPrimary: false, isForeign: false },
      { name: 'updated_at', type: 'timestamp', isPrimary: false, isForeign: false },
    ],
  },
  {
    name: 'products',
    columns: [
      { name: 'id', type: 'int', isPrimary: true, isForeign: false },
      { name: 'name', type: 'text', isPrimary: false, isForeign: false },
      { name: 'description', type: 'text', isPrimary: false, isForeign: false },
      { name: 'price', type: 'decimal', isPrimary: false, isForeign: false },
      { name: 'category', type: 'text', isPrimary: false, isForeign: false },
      { name: 'stock', type: 'int', isPrimary: false, isForeign: false },
      { name: 'created_at', type: 'timestamp', isPrimary: false, isForeign: false },
      { name: 'updated_at', type: 'timestamp', isPrimary: false, isForeign: false },
    ],
  },
  {
    name: 'orders',
    columns: [
      { name: 'id', type: 'int', isPrimary: true, isForeign: false },
      { name: 'user_id', type: 'int', isPrimary: false, isForeign: true, references: 'users.id' },
      { name: 'total_amount', type: 'decimal', isPrimary: false, isForeign: false },
      { name: 'status', type: 'text', isPrimary: false, isForeign: false },
      { name: 'created_at', type: 'timestamp', isPrimary: false, isForeign: false },
      { name: 'updated_at', type: 'timestamp', isPrimary: false, isForeign: false },
    ],
  },
  {
    name: 'order_items',
    columns: [
      { name: 'id', type: 'int', isPrimary: true, isForeign: false },
      { name: 'order_id', type: 'int', isPrimary: false, isForeign: true, references: 'orders.id' },
      { name: 'product_id', type: 'int', isPrimary: false, isForeign: true, references: 'products.id' },
      { name: 'quantity', type: 'int', isPrimary: false, isForeign: false },
      { name: 'price', type: 'decimal', isPrimary: false, isForeign: false },
      { name: 'created_at', type: 'timestamp', isPrimary: false, isForeign: false },
      { name: 'updated_at', type: 'timestamp', isPrimary: false, isForeign: false },
    ],
  },
  {
    name: 'countries',
    columns: [
      { name: 'id', type: 'int', isPrimary: true, isForeign: false },
      { name: 'name', type: 'text', isPrimary: false, isForeign: false },
      { name: 'code', type: 'text', isPrimary: false, isForeign: false },
      { name: 'continent', type: 'text', isPrimary: false, isForeign: false },
    ],
  },
  {
    name: 'cities',
    columns: [
      { name: 'id', type: 'int', isPrimary: true, isForeign: false },
      { name: 'name', type: 'text', isPrimary: false, isForeign: false },
      { name: 'country_id', type: 'int', isPrimary: false, isForeign: true, references: 'countries.id' },
      { name: 'population', type: 'int', isPrimary: false, isForeign: false },
    ],
  },
];