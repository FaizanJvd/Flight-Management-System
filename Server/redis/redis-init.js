// @ts-check
const redis = require("redis");
const config = require("../config");

const isRedisGetOrSetEnabled = () => {
  const getEnabled =
    config.redis.enableUserGet;

  const setEnabled =
    config.redis.enableUserSet;

  return getEnabled || setEnabled;
};


class RedisGlobal {
  static #instance;

  constructor() {
    if (!RedisGlobal.#instance) {
      console.log("*** Connecting Valkey ***");
      const r = config.redis;

      if (isRedisGetOrSetEnabled()) {
        this.db = redis.createClient({
          url: `redis://${r.username}:${r.password}@${r.host}:${r.port}/${r.database}`,
        });

        this.db
          .connect()
          .then(() => {
            console.log("Connected to Valkey");
          })
          .catch((err) => {
            console.error(`Error connecting to Redis: ${err}`);
          });

        this.db.on("error", (err) => {
          console.error(`Error in Redis: ${err}`);
        });

        this.db.on("end", () => {
          console.error("Redis connection has ended!");
        });

        this.db.on("reconnecting", () => {
          console.error("Reconnecting Redis...");
        });
      } else {
        console.log("Redis is not enabled. Skipping Redis connection..");
      }

      RedisGlobal.#instance = this;
    }

    return RedisGlobal.#instance;
  }

  static getInstance() {
    if (!RedisGlobal.#instance) {
      RedisGlobal.#instance = new RedisGlobal();
    }
    return RedisGlobal.#instance;
  }
}

const instance = RedisGlobal.getInstance();

exports.redis = Object.freeze(instance);
