const config = require("../config");
exports.connectToMongo = () => {
  const mongoose = require("mongoose");

  const mongoURI = `mongodb://${config.mongoDb.username}:${config.mongoDb.password}@${config.mongoDb.host}:${config.mongoDb.port}/${config.mongoDb.databaseName}?authSource=admin`;
  
  mongoose.connect(mongoURI)
    .then(async () => {
      console.log("Connected to MongoDB");
    })
    .catch((err) => {
      console.error("Error connecting to MongoDB:", err);
    });
};
