const express = require('express');
const dotenv = require('dotenv');
const { connectToMongo } = require("./mongo");
const flightRoutes = require('./routes/flightRoutes');
const userRoutes = require('./routes/userRoutes');
const { kafkaClient } = require("./kafka/kafka-init");
const {init} = require("./kafka/producer");

dotenv.config();

const app = express();

app.use(express.json());
connectToMongo();

init();
require('./tasks/flightTasks');




app.use('/api/flights', flightRoutes);
app.use('/api/users', userRoutes);
process.on("SIGTERM", async () => {
  try {
    logger.warn("SIGTERM: Initiating graceful shutdown...");

    await kafkaClient.disconnectProducer();

    logger.warn("SIGTERM: Graceful shutdown completed. Exiting...");
    process.exit(0); 
  } catch (error) {
    logger.error("SIGTERM: Error during graceful shutdown:", error);
    process.exit(1); 
  }
});

process.on("SIGINT", async () => {
  try {
    logger.warn("SIGINT: Initiating graceful shutdown...");

    await kafkaClient.disconnectProducer();


    logger.warn("SIGINT: Graceful shutdown completed. Exiting...");
    process.exit(0);
  } catch (error) {
    logger.error("SIGINT: Error during graceful shutdown:", error);
    process.exit(1); 
  }
});

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
