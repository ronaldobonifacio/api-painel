const express = require('express');
const view1Service = require('./view1.service');

const router = express.Router();

/**
 * @swagger
 * /view1:
 *   get:
 *     summary: Retrieve all data from View 1
 *     description: Fetches a complete dataset from a predefined SQL view without any parameters.
 *     responses:
 *       200:
 *         description: A successful response with the data from the view.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *       500:
 *         description: Internal server error.
 */
const getAllData = async (req, res) => {
  try {
    const data = await view1Service.getAllData();
    // The result from the database is already an array of objects (JSON-like)
    // We just send it directly.
    res.json(data);
  } catch (error) {
    console.error('Error in view1Controller:', error);
    res.status(500).json({ message: 'Error fetching data from view 1' });
  }
};

// Define the route
router.get('/', getAllData);

module.exports = router;
