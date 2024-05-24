import redis from 'express-redis-cache';

const redisCache = redis({
  port: 5432,
  host: 'localhost',
  prefix: 'master_backend',
  expire: 60 * 60,
});

export default redisCache;
