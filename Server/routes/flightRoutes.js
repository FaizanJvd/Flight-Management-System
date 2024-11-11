const express = require('express');
const flightController = require('../controllers/flightController');
const { protect, authorize } = require('../middlewares/auth');
const router = express.Router();

router.get('/', flightController.getFlightsController);

router.put('/update', protect, authorize('admin'), flightController.updateFlightStatusController);

module.exports = router;
