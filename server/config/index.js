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
        createFlightInterval: process.env.CREATE_FLIGHT_TASK_INTERVAL || 10000,
        updateFlightInterval: process.env.UPDATE_FLIGHT_TASK_INTERVAL || 20000
    },
    kafka: {
        clientId: process.env.KAFKA_CLIENT_ID || Date.now(),
        host: process.env.KAFKA_HOST || "localhost",
        port: process.env.KAFKA_PORT || 9092
    },
    redis: {
        host: process.env.REDIS_HOST || "localhost",
        port: process.env.REDIS_PORT || 6379,
        username: process.env.REDIS_USERNAME || "default",
        password: process.env.REDIS_PASSWORD || "secret",
        database: process.env.REDIS_DATABASE || "0",
        enableUserGet: process.env.REDIS_USER_GET_ENABLED === "true",
        enableUserSet: process.env.REDIS_USER_SET_ENABLED === "true",
        userPrefix: process.env.REDIS_USER_PREFIX || 1,
    },

};
