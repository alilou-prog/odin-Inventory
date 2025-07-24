#! /usr/bin/env node

const { Client } = require("pg");
require('dotenv').config()

const DB_URL = process.env.DB_URL;

const reset_SQL = `
DROP TABLE IF EXISTS categories CASCADE;
DROP TABLE IF EXISTS items;
`

const model_SQL = `
CREATE TABLE IF NOT EXISTS categories (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name VARCHAR ( 255 )
);

CREATE TABLE IF NOT EXISTS items (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name VARCHAR (255),
  content VARCHAR (255),
  category_id INTEGER REFERENCES categories(id)
);
`
const feed_cat_SQL = `
INSERT INTO categories (name) 
VALUES
    ('CS-industry'),
    ('CS-academy'),
    ('life');
`
const feed_items_SQL = `
INSERT INTO items (name, content, category_id)
VALUES
  ('webdev', 'learn webdev by following odin-project', 1),
  ('study', 'work hard on ai modules', 2),
  ('study', 'explain ai topics to people', 2),
  ('sport', 'build a strong body', 3);
`;

async function main() {
  console.log("seeding...");
  const client = new Client({
    connectionString: DB_URL,
  });
  await client.connect();
  await client.query(reset_SQL);
  await client.query(model_SQL);
  await client.query(feed_cat_SQL);
  await client.query(feed_items_SQL);
  await client.end();
  console.log("done");
}

main();
