import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  schema: './src/lib/adapters/mysql2/mysql2.schema.ts',
  out: '../../drizzle/mysql',
  dialect: 'mysql',
  dbCredentials: {
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'zinc',
  },
});
