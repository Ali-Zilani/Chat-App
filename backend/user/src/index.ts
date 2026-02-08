import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import connectRedis from "./config/redis.js";
import { createClient } from "redis";
dotenv.config();

connectDB();
connectRedis();

const app = express();
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
