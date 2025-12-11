const sql = require('mssql');
require('dotenv').config();

const config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_SERVER,
  database: process.env.DB_DATABASE,
  options: {
    encrypt: process.env.DB_ENCRYPT === 'true', // Use true for Azure SQL Database, or if you have an SSL certificate
    trustServerCertificate: process.env.DB_TRUST_SERVER_CERTIFICATE === 'true' // Change to true for local dev / self-signed certs
  },
  pool: {
    max: 10, // Max number of connections in the pool
    min: 0,
    idleTimeoutMillis: 30000
  }
};

// Singleton to ensure only one pool is created.
let pool = null;

const getPool = async () => {
  if (pool) {
    return pool;
  }
  try {
    pool = await new sql.ConnectionPool(config).connect();
    console.log('Connection pool created successfully.');
    return pool;
  } catch (err) {
    console.error('Database Connection Failed! Bad Config: ', err);
    // Re-throw the error to be caught by the application's startup logic
    throw err;
  }
};

// Generic query function
const query = async (queryString) => {
  const pool = await getPool();
  const result = await pool.request().query(queryString);
  return result.recordset;
};

module.exports = {
  getPool,
  query
};
