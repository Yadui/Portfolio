import 'dotenv/config';

export default {
  schema: './lib/schema.js',
  out: './drizzle',
  dialect: 'sqlite',
  dbCredentials: {
    url: process.env.TURSO_DATABASE_URL,
  },
};
