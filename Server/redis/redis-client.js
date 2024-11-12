
const { redis } = require("./redis-init");
const config = require("../config");


const isRedisUserGetEnabled = () => {
  const val = config.redis.enableUserGet;
  if (!val)
    console.log("Redis Write is not enabled. Skipping Redis operations.");
  return val;
};

const isRedisUserSetEnabled = () => {
  const val = config.redis.enableUserSet;
  if (!val)
    console.log("Redis Write is not enabled. Skipping Redis operations.");
  return val;
};

const setJSON = async (key, value, isCaching = false) => {
  if (!isCaching) return;
  return await redis.db.set(key, JSON.stringify(value));
};

const getJSON = async (key, isCaching = false) => {
  if (!isCaching) return;
  const result = await redis.db.get(key);
  return JSON.parse(result);
};

const del = async (key, isCaching = false) => {
  if (!isCaching) return;
  return await redis.db.del(key);
};

const exists = async (key, isCaching = false) => {
  if (!isCaching) return;
  return await redis.db.exists(key);
};


module.exports = {
  isRedisUserGetEnabled,
  isRedisUserSetEnabled,
  setJSON,
  getJSON,
  del,
  exists,
};
