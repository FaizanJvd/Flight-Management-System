const redisClient = require("../redis/redis-client");
const config = require("../config");

exports.create_user = async ({
    id,
    username,
    password,
    role
}) => {
    try {
        let redisKey = `${config.redis.userPrefix}:${id}`;
        const result = await redisClient.setJSON(
            redisKey,
            {
                id,
                username,
                password,
                role
            },
            redisClient.isRedisUserSetEnabled(),
        );

        if (result != "OK") {
            throw new Error(`Failed to write data into Redis for key: ${redisKey}`);
        }
    } catch (error) {
        console.error(`Error in user.redis create_user service: ${error}`);
        throw error;
    }
};


exports.get_user_by_id = async (id) => {
    try {
        const user = await redisClient.getJSON(
            `${config.redis.userPrefix}:${id}`,
            redisClient.isRedisUserGetEnabled(),
        );
        if (!user) {
            throw new Error("User not exists");
        }
        return user;
    } catch (error) {
        console.error(`Error in user.redis get_user_by_id service: ${error}`);
        throw error;
    }
};

exports.is_exists = async (id) => {
    try {
        return redisClient.exists(
            `${config.redis.userPrefix}:${id}`,
            redisClient.isRedisUserGetEnabled(),
        );
    } catch (error) {
        console.error(`Error in user.redis is_exists service: ${error}`);
        throw error;
    }
};
