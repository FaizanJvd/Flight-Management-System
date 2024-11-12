const Flight = require('../models/Flight');

const getFlights = async (filters = {}, search = '', page = 1, limit = 10) => {
  try {
    const query = {};

    if (search) {
      query.$or = [
        { flightNumber: { $regex: search, $options: 'i' } },
        { origin: { $regex: search, $options: 'i' } },
        { destination: { $regex: search, $options: 'i' } }
      ];
    }

    if (filters.airline) {
      query.airline = { $regex: filters.airline, $options: 'i' };
    }
    if (filters.flightType) {
      query.flightType = { $regex: filters.flightType, $options: 'i' };
    }
    if (filters.status) {
      query.status = { $regex: filters.status, $options: 'i' };
    }

    const skip = (page - 1) * limit;

    const flights = await Flight.find(query)
      .skip(skip)
      .limit(limit)
      .sort({ updatedAt: -1 });

    const totalFlights = await Flight.countDocuments(query);

    return {
      flights,
      totalFlights,
      totalPages: Math.ceil(totalFlights / limit),
      currentPage: page
    };
  } catch (error) {
    throw new Error(`Error fetching flights: ${error.message}`);
  }
};


const updateFlightStatus = async (flightNumber, status) => {
    try {
      const updatedFlight = await Flight.findOneAndUpdate(
        { flightNumber }, 
        { status },
        { new: true } 
      );
  
      return updatedFlight;
    } catch (error) {
      throw new Error(`Error updating flight status: ${error.message}`);
    }
  };

module.exports = {
  getFlights,
  updateFlightStatus
};
