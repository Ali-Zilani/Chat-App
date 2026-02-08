import { createClient } from "redis";
import dotenv from "dotenv";

dotenv.config();

export const redisClient = createClient({
  url: process.env.REDIS_URL!,
});

const connectRedis = async () => {
  try {
    if (!process.env.REDIS_URL) {
      throw new Error("REDIS_URL is not defined");
    }

    redisClient.on("error", (err) => {
      console.error("Redis Client Error:", err);
    });

    await redisClient.connect();
    console.log("✅ Connected to Redis");
  } catch (error) {
    console.error("❌ Failed to connect to Redis:", error);
    process.exit(1);
  }
};

export default connectRedis;
