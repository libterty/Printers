const { RedisServe } = require('../dist/index');
const redisServe = new RedisServe('0.0.0.0', '6379');

const TestRedis = async (message, error, mode) => {
    try {
        await redisServe.Initization();
        await redisServe.RedisWrite(message, error, mode);
    } catch (error) {
        throw error;
    }
};

TestRedis('Test Redis', new Error(), 'message');
