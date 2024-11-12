const { faker } = require('@faker-js/faker');
const Flight = require('../models/Flight');
const config = require("../config");
const {publishKafkaMessage} = require("../kafka/producer");
const generateRandomFlight = async () => {
  const flightData = {
    flightNumber: faker.string.alphanumeric(6).toUpperCase(),
    origin: faker.location.city(),
    destination: faker.location.city(),
    scheduledDepartureTime: faker.date.future(), 
    status: faker.helpers.arrayElement(['Delayed', 'Cancelled', 'In-flight', 'Scheduled/En Route']), 
    flightType: faker.helpers.arrayElement(['Commercial', 'Military', 'Private']),  
    airline: faker.company.name() 
  };

  try {
    const flight = new Flight(flightData);
    await flight.save();
    publishKafkaMessage("flight_created","created");
    console.log('New flight created:', flightData.flightNumber);
  } catch (error) {
    console.error('Error generating random flight:', error);
  }
};

setInterval(generateRandomFlight, config.tasks.createFlightInterval);

const updateFlightStatus = async () => {
  try {
    const flights = await Flight.find();

    if (flights.length === 0) {
      console.log('No flights to update status.');
      return;
    }

    const flightToUpdate = faker.helpers.arrayElement(flights); 
    const newStatus = faker.helpers.arrayElement(['Cancelled', 'Delayed']); 

    flightToUpdate.status = newStatus; 

    await flightToUpdate.save();
    publishKafkaMessage("flight_update","updated");
    console.log(`Flight ${flightToUpdate.flightNumber} status updated to ${newStatus}`);
  } catch (error) {
    console.error('Error updating flight status:', error);
  }
};

setInterval(updateFlightStatus, config.tasks.updateFlightInterval);
