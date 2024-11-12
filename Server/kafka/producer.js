const { kafkaClient } = require("./kafka-init");

exports.init = async () => {
  try {
    await kafkaClient.connectProducer();
  } catch (error) {
    console.error(`Error connecting Kafka Producer: ${error.message}`);
  }
};

exports.publishKafkaMessage = async (topic, message) => {
  try {
    await kafkaClient.produceMessage(topic, message);
  } catch (error) {
    console.error(error);
  }
};
