const express = require('express');
const view1Controller = require('./view1/view1.controller');
const view2Controller = require('./view2/view2.controller');

const router = express.Router();

// Health check endpoint
router.get('/health', (req, res) => {
  res.status(200).json({ status: 'API is running' });
});

// Register all the routes
router.use('/view1', view1Controller);
router.use('/view2', view2Controller);

/*
 * To add a new route, simply create a new folder in the `api` directory
 * with a service and a controller, then import the controller and register it here.
 *
 * Example for a '/newview' endpoint:
 *
 * const newViewController = require('./newview/newview.controller');
 * router.use('/newview', newViewController);
 *
 */

module.exports = router;
