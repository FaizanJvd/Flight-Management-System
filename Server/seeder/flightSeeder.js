const mongoose = require('mongoose');
const Flight = require('../models/Flight'); // Adjust the path according to your model
const { faker } = require('@faker-js/faker'); // Updated import for @faker-js/faker
const config = require("../config");

// Connect to MongoDB
const mongoURI = `mongodb://${config.mongoDb.username}:${config.mongoDb.password}@${config.mongoDb.host}:${config.mongoDb.port}/${config.mongoDb.databaseName}?authSource=admin`;
mongoose.connect(mongoURI)
  .then(() => {
    console.log('MongoDB connected...');
    seedDatabase();
  })
  .catch(err => console.log('Error connecting to MongoDB:', err));

// Function to generate random flight data
function generateRandomFlightData() {
  return {
    flightNumber: faker.string.alphanumeric(6).toUpperCase(), // Corrected method to generate alphanumeric string
    origin: faker.location.city(), // Corrected method to get a city
    destination: faker.location.city(), // Corrected method to get a city
    scheduledDepartureTime: faker.date.future(), // Scheduled time in the future
    status: faker.helpers.arrayElement(['Delayed', 'Cancelled', 'In-flight', 'Scheduled/En Route']), // Corrected usage
    flightType: faker.helpers.arrayElement(['Commercial', 'Military', 'Private']),  // Corrected usage
    airline: faker.company.name()  // Corrected method for company name
  };
}

// Seeder function to insert bulk data
async function seedDatabase() {
  try {
    // Check if the collection already has more than 50 flights
    const flightCount = await Flight.countDocuments();
    if (flightCount >= 50) {
      console.log('The Flight collection already has 50 or more records. Skipping data insertion.');
      mongoose.connection.close();
      return;
    }

    // Generate 400 new flights if there are fewer than 50
    const flights = [];
    for (let i = 0; i < 400; i++) {
      flights.push(generateRandomFlightData());
    }

    // Bulk insert
    await Flight.insertMany(flights);
    console.log('Inserted 400 flight records successfully!');
    mongoose.connection.close();
  } catch (err) {
    console.error('Error inserting data:', err);
    mongoose.connection.close();
  }
}
