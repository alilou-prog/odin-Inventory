#! /usr/bin/env node

const { Client } = require("pg");
require('dotenv').config()

const DB_URL = process.env.DB_URL;

const SQL = `
CREATE TABLE IF NOT EXISTS categories (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name VARCHAR ( 255 )
);

INSERT INTO categories (name) 
VALUES
    ('electronics'),
    ('fruits'),
    ('vegetables');
`;

async function main() {
  console.log("seeding...");
  const client = new Client({
    connectionString: DB_URL,
  });
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log("done");
}

main();
