const { Kafka } = require("kafkajs");
const config = require("../config");


class KafkaClient {
  static #instance = null;

  constructor() {
      this.isConnected = false;

      this.kafka = new Kafka({
        clientId: `${config.kafka.clientId}`,
        brokers: [`${config.kafka.host}:${config.kafka.port}`],
      });

      this.producer = this.kafka.producer();
  }

  async connectProducer() {
    try {
      await this.producer.connect();
      this.isConnected = true;
      console.log("Kafka Producer connected");
    } catch (error) {
      this.isConnected = false;
      console.error("Error connecting Kafka Producer:", error.message);
    }
  }
  

  async disconnectProducer() {
      await this.producer.disconnect();
      this.isConnected = false;
      console.log("Kafka Producer disconnected");
  }

  static getInstance() {
    if (KafkaClient.#instance) return KafkaClient.#instance;

    KafkaClient.#instance = new KafkaClient();
    return KafkaClient.#instance;
  }

  async produceMessage(topic, message) {
      try {
        if (!this.isConnected) {
          console.error("Kafka producer is not connected");
        }

        const result = await this.producer.send({
          topic,
          messages: [{ value: message }],
        });
        console.log(`Message sent successfully: ${JSON.stringify(result)}`);
      } catch (error) {
        console.error(`Error sending message: ${error}`);
      }
    }
}

const instance = KafkaClient.getInstance();
exports.kafkaClient = instance;
