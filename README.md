# Flight-Management-System
Flight management system dashboard for handling 400 daily commercial, military, and private aircraft. The dashboard should display real-time flight information.

# Create mount folders for MongoDB
mkdir -p ./mongo-data ./mongo-config

# Set permissions for MongoDB folders
# Ensure the `999` user, which is the default MongoDB user in the official image, has access
sudo chown -R 999:999 ./mongo-data ./mongo-config
sudo chmod -R 755 ./mongo-data ./mongo-config

# Create mount folder for Zookeeper
mkdir -p ./zookeeper-data

# Set permissions for Zookeeper folders
# Zookeeper runs as root user by default, so no additional user permissions are needed
sudo chmod -R 755 ./zookeeper-data

# Create mount folder for Kafka
mkdir -p ./kafka-data

# Set permissions for Kafka folders
# Kafka usually runs as `root` or `appuser`, so 755 permissions are typically sufficient
sudo chmod -R 755 ./kafka-data
