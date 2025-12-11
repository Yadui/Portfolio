
const { db } = require('../lib/db');
const { users } = require('../lib/schema');
const { eq } = require('drizzle-orm');
// We need to use 'dotenv' to load env vars if they are needed for DB connection
require('dotenv').config({ path: '.env.local' });

async function seed() {
  console.log('Seeding admin user...');
  
  // simple password hashing for demo (in production use bcrypt/argon2)
  // For this "simple" request, we might store plain text or simple hash. 
  // Let's store plain for now as requested "simple username and password", 
  // but better to least create a hash placeholder.
  // User asked for "simple username and password login as stored in the database".
  // I'll assume they want me to create an entry.
  
  const username = "admin";
  const password = "password123"; 
  
  // Check if exists
  const existing = await db.select().from(users).where(eq(users.username, username)).get();
  
  if (!existing) {
      await db.insert(users).values({
          username,
          password, // Storing plain text for simplicity as per "simple" request, but warning: insecure.
      });
      console.log('Admin user created: admin / password123');
  } else {
      console.log('Admin user already exists.');
  }
}

seed().then(() => {
    console.log('Done');
    process.exit(0);
}).catch(err => {
    console.error(err);
    process.exit(1);
});
