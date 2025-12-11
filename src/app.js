require('dotenv').config(); // Load environment variables from .env file
const express = require('express');
const { getPool } = require('./config/database');
const apiRoutes = require('./api/routes');

const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Main API route
app.use('/api', apiRoutes);

// Root endpoint
app.get('/', (req, res) => {
  res.send('API is running. Use /api/health to check API status.');
});

// Graceful shutdown
const gracefulShutdown = (server) => {
  console.log('Closing http server.');
  server.close(async () => {
    console.log('Http server closed.');
    const pool = await getPool();
    if (pool) {
      await pool.close();
      console.log('Database connection pool closed.');
    }
    process.exit(0);
  });
};

const startServer = async () => {
  try {
    // Initialize the database pool on application startup
    await getPool();

    const server = app.listen(port, () => {
      console.log(`Server listening at http://localhost:${port}`);
    });

    // Handle shutdown signals
    process.on('SIGINT', () => gracefulShutdown(server));
    process.on('SIGTERM', () => gracefulShutdown(server));

  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();
