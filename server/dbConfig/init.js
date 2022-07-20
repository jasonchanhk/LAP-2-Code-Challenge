const { Pool } = require('pg');
require('dotenv').config()

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

pool.query(`
    DROP TABLE IF EXISTS posts; 
    CREATE TABLE posts (
    id serial PRIMARY KEY,
    title VARCHAR(200),
    name VARCHAR(200),
    body VARCHAR(500)
    );
    INSERT INTO post (title, name, body) 
    VALUES 
    ('Yesterday is hot', 'Jason', '39C is really hot, my house is like an oven.'),
    ('Today is Wednesday', 'Nouria', 'The weather is chill!'),
    ('Tomorrow is submission day', 'Sergi', 'Make sure you commit everything before 1PM!');
    `
);

module.exports = pool;
