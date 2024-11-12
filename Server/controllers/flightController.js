const { getFlights, updateFlightStatus } = require('../services/flightServices');

const getFlightsController = async (req, res) => {
  try {
    const { search = '', airline, flightType, status, page = 1, limit = 10 } = req.query;

    const filters = { airline, flightType, status };

    const result = await getFlights(filters, search, parseInt(page), parseInt(limit));

    res.status(200).json({
      success: true, data: {
        flights: result.flights,
        totalFlights: result.totalFlights,
        totalPages: result.totalPages,
        currentPage: result.currentPage
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  getFlightsController
};

const updateFlightStatusController = async (req, res) => {
  try {
    const { flightNumber, status } = req.body;

    const updatedFlight = await updateFlightStatus(flightNumber, status);

    if (!updatedFlight) {
      return res.status(404).json({ success: true, message: 'Flight not found' });
    }

    res.status(200).json({ success: true, data: updatedFlight });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { getFlightsController, updateFlightStatusController };
