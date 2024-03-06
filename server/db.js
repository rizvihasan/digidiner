const { Pool } = require('pg');

const pgPool = new Pool({
  connectionString: process.env.PG_DATABASE_URL,
});

module.exports = pgPool;
