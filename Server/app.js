const express = require('express');
const dotenv = require('dotenv');
const { connectToMongo } = require("./mongo");
const flightRoutes = require('./routes/flightRoutes');
const userRoutes = require('./routes/userRoutes');

dotenv.config();

const app = express();

app.use(express.json());

connectToMongo();

app.use('/api/flights', flightRoutes);
app.use('/api/users', userRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
