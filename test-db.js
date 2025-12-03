import { createClient } from '@libsql/client';

const url = "https://portfolio-yadui.aws-ap-south-1.turso.io";
const authToken = "eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJpYXQiOjE3NjQ3NTUxOTUsImlkIjoiYzk3MzAzNDktN2E3Mi00NDM1LWFkOTAtYzJmNzg5NmRmZWRjIiwicmlkIjoiYjAyYjc4ZGYtMWEwZS00ZTg2LTgzOWEtODk2ZGFhZWE5ODk2In0.rjcNI3aaIXzVBd436zjbTyzbcqkWgtaoVZ5IzniUNpCTF72DRKwTEvahRHIDp7dwNeUwvp3-2L2dV2Ic_5RgCw";

const client = createClient({
  url,
  authToken,
});

async function testConnection() {
  try {
    const result = await client.execute("SELECT 1");
    console.log("Connection successful!", result);
  } catch (e) {
    console.error("Connection failed:", e);
  }
}

testConnection();
