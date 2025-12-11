const express = require('express');
const view2Service = require('./view2.service');

const router = express.Router();

/**
 * @swagger
 * /view2:
 *   get:
 *     summary: Retrieve all data from View 2
 *     description: Fetches a complete dataset from a second predefined SQL view without any parameters.
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
    const data = await view2Service.getAllData();
    res.json(data);
  } catch (error) {
    console.error('Error in view2Controller:', error);
    res.status(500).json({ message: 'Error fetching data from view 2' });
  }
};

// Define the route
router.get('/', getAllData);

module.exports = router;
