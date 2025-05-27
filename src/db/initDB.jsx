import { PGlite } from "@electric-sql/pglite";

const db = new PGlite("idb://patient-db");

async function setup() {
  await db.exec(`
    CREATE TABLE IF NOT EXISTS patients (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      age INTEGER,
      gender TEXT,
      contact TEXT
    );
  `);
}

setup();

export default db;
