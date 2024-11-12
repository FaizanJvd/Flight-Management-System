// server.js
const { Kafka } = require('kafkajs');
const WebSocket = require('ws');

// Set up WebSocket server
const wss = new WebSocket.Server({ port: 8080 });
console.log("WebSocket server is running on ws://localhost:8080");

// Keep track of WebSocket clients
const clients = [];

// When a new client connects, add it to the list
wss.on('connection', (ws) => {
  console.log('New WebSocket client connected');
  clients.push(ws);

  // Remove client from list on disconnect
  ws.on('close', () => {
    clients.splice(clients.indexOf(ws), 1);
  });
});

// Set up Kafka
const kafka = new Kafka({
  clientId: 'my-app',
  brokers: ['localhost:9092'],
});

const consumer = kafka.consumer({ groupId: 'websocket-group' });

const run = async () => {
  await consumer.connect();
  await consumer.subscribe({ topic: 'flight_created', fromBeginning: true });
  await consumer.subscribe({ topic: 'flight_update', fromBeginning: true });

  // Consume messages and forward them to WebSocket clients
  await consumer.run({
    eachMessage: async ({ topic, message }) => {
      const payload = message.value.toString();
      console.log(`Received message from Kafka topic ${topic}: ${payload}`);

      // Send the payload to all connected WebSocket clients
      clients.forEach((ws) => {
        if (ws.readyState === WebSocket.OPEN) {
          ws.send(JSON.stringify({ topic, payload }));
        }
      });
    },
  });
};

run().catch(console.error);
