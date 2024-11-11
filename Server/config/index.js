require("dotenv").config();

module.exports = {
    mongoDb: {
        host: process.env.MONGODB_HOST || "localhost",
        port: process.env.MONGODB_PORT || "27017",
        username: process.env.MONGODB_USERNAME || "root",
        password: process.env.MONGODB_PASSWORD || "secret",
        databaseName: process.env.MONGODB_DATABASE_NAME || "flightManagement",
    },
    jwt: {
        secret: process.env.JWT_SECRET || "flightwillnotdelay",
    },
    tasks: {
        createFlightInterval:process.env.CREATE_FLIGHT_TASK_INTERVAL || 10000,
        updateFlightInterval:process.env.UPDATE_FLIGHT_TASK_INTERVAL || 20000
    }
    
};
