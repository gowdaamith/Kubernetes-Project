import express from "express";
import { Kafka } from "kafkajs";

const app = express();
app.use(express.json());

// Kafka Client
const kafka = new Kafka({
  clientId: "producer",
  brokers: ["kafka-0.kafka-service:9092"]
});

const producer = kafka.producer();
await producer.connect();

app.post("/publish", async (req, res) => {
  const { message } = req.body;

  await producer.send({
    topic: "events",
    messages: [{ value: message }]
  });

  res.send({ status: "Message Sent", message });
});

app.listen(5000, () => console.log("Producer running on port 5000"));
