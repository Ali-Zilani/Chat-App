import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import connectRedis from "./config/redis.js";
import userRoutes from "./routes/user.js";
import { connectRabbitMQ } from "./config/rabbitmq.js";
dotenv.config();

connectDB();
connectRedis();
connectRabbitMQ();
const app = express();
const port = process.env.PORT || 3000;

app.use("api/v1", userRoutes);
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
