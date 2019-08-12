import redis from "redis";

let redisClient;

export default (REDIS_PORT, REDIS_HOST) => {
  redisClient = redis.createClient(REDIS_PORT, REDIS_HOST);
};

export { redisClient };
