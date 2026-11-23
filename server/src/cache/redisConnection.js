import 'dotenv/config';
import {createClient} from 'redis';

let _client = undefined;

const redisConnection = async () => {
  if (!_client) {
    _client = createClient({url: process.env.REDIS_URL || 'redis://localhost:6379'});
    _client.on('error', (e) => console.error('Redis error:', e.message));
    await _client.connect();
  }

  return _client;
};

const closeRedis = async () => {
  if (_client) {
    await _client.quit();
    _client = undefined;
  }
};

export {redisConnection, closeRedis};
