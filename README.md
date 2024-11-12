# Project Setup and Run Guide

This project uses Docker to set up required services and runs a Node.js server for application logic. Please follow the steps below to get everything up and running.

## Prerequisites

Ensure you have the following installed:

- **Docker**: [Install Docker](https://docs.docker.com/get-docker/)
- **Node.js**: [Install Node.js](https://nodejs.org/)

## Getting Started

### 1. Clone the Repository

```bash
git clone git@github.com:FaizanJvd/Flight-Management-System.git
```

## 2. Add Envs

 #### 1. In Devops, make file .env, and get enviroments variables from sample.env
 #### 2. In Server, make file .env, and get enviroments variables from sample.env
 ####  3. In Client, make file .env, and get enviroments variables from sample.env

## 3. Start Devops First

```bash
 cd devops 
```
```bash
 docker compose up -d 
```


## 4. Setup & Run Server
```bash
 cd server 
```
```bash
 npm install
```
```bash
 npm run serve 
```

## 5. Setup & Run Socket
```bash
 cd socket 
```
```bash
 npm install
```
```bash
 node server.js 
```

## 6. Setup & Run Client
```bash
 cd client 
```
```bash
 npm install
```
```bash
 npm run dev 
```