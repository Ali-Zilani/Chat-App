import amqp from "amqplib";
import dotenv from "dotenv";
dotenv.config();

let channel: amqp.Channel;
export const connectRabbitMQ = async () => {
  try {
    const connection = await amqp.connect({
      protocol: "amqp",
      hostname: process.env.Rabbitmq_Host,
      port: 5672,
      username: process.env.Rabbitmq_Username,
      password: process.env.Rabbitmq_Password,
    });
    channel = await connection.createChannel();
    console.log("✅ Connected to RabbitMQ");
  } catch (error) {
    console.error("Failed to connect to RabbitMQ", error);
  }
};

export const publishToQueue = async (queue: string, message: any) => {
  if (!channel) {
    console.error("RabbitMQ channel is not initialized");
    return;
  }
  try {
    await channel.assertQueue(queue, { durable: true });
    channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)), {
      persistent: true,
    });
    console.log(`Message published to queue ${queue}`);
  } catch (error) {
    console.error("Failed to publish message to RabbitMQ", error);
  }
};
