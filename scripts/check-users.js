
const { db } = require('../lib/db');
const { users } = require('../lib/schema');
const { sql } = require('drizzle-orm');
require('dotenv').config({ path: '.env.local' });

async function checkUsers() {
  try {
    // Try to list all users
    const result = await db.select().from(users).all();
    console.log("Users in DB:", result);
  } catch (e) {
    console.error("Error fetching users:", e);
  }
}

checkUsers().then(() => process.exit(0));
