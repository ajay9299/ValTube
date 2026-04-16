<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
  </p>

  [circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
  [circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">
    A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.
  </p>
  <p align="center">
    <a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
    <a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
    <a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
    <a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
    <a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
    <a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
    <a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
    <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
    <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
  </p>

  ## Description

  [Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

  ## Project setup

  ```bash
  npm install
  ```

  ## Compile and run the project

  ```bash
  # development
  npm run start

  # watch mode
  npm run start:dev

  # production mode
  npm run start:prod
  ```

  ## Run tests

  ```bash
  # unit tests
  npm run test

  # e2e tests
  npm run test:e2e

  # test coverage
  npm run test:cov
  ```

  ## Vault Setup

  - Vault UI: [http://localhost:8200/](http://localhost:8200/)

  ### Generate secret keys for RS256

  ```bash
  # Generate private key
  openssl genrsa -out private.key 2048

  # Generate public key from private key
  openssl rsa -in private.key -pubout -out public.key
  ```

  ### Store keys in Vault

  ```bash
  export VAULT_ADDR=http://127.0.0.1:8200
  vault login root
  vault kv put secret/jwt privateKey="PRIVATE_KEY" publicKey="PUBLIC_KEY"
  ```

  ### Check stored keys

  ```bash
  vault kv get secret/jwt
  ```


  # 🚀 Local Development Setup (MongoDB + Vault + LocalStack S3)

---

## ▶️ Start Services

```bash
docker-compose up -d
```

---

## 🛑 Stop Services (Keep Data)

```bash
docker-compose down
```

---

## 🧹 Stop & Remove Everything (Containers + Volumes)

```bash
docker-compose down -v
```

---

## 🔍 Check Running Containers

```bash
docker ps
```

---

# 🔐 Vault Setup (First Time Only)

## Enter Vault Container

```bash
docker exec -it vault sh
```

## Set Vault Address

```bash
export VAULT_ADDR=http://127.0.0.1:8200
```

## Initialize Vault

```bash
vault operator init
```

## Unseal Vault (Run 3 times with different keys)

```bash
vault operator unseal
```

## Login

```bash
vault login <ROOT_TOKEN>
```

## Enable KV v2 Engine

```bash
vault secrets enable -path=secret kv-v2
```

## Copy files to vault volume
docker cp private.key vault:/tmp/public.key 

## Store JWT Keys

```bash
vault kv put secret/jwt \ privateKey=@/tmp/private.key \ publicKey=@/tmp/public.key
```

---

# 🗄️ MongoDB Connection

```bash
mongodb://admin:password@localhost:27017
```

---

# ☁️ LocalStack (S3) Setup

## Configure AWS CLI

```bash
aws configure
```

Use:

```
Access Key: test
Secret Key: test
Region: us-east-1
```

## Create S3 Bucket

```bash
aws --endpoint-url=http://localhost:4566 s3 mb s3://my-bucket
```

## List Buckets

```bash
aws --endpoint-url=http://localhost:4566 s3 ls
```

---

# 🧹 Clean Specific Data

## Remove Only Mongo Data

```bash
docker volume rm valtube_mongo-data
```

## Remove Only Vault Data

```bash
docker volume rm valtube_vault-data
```

## Remove Only LocalStack Data

```bash
docker volume rm valtube_localstack-data
```

---

# 💡 Recommended (Use Project Name)

```bash
docker-compose -p valtube up -d
```

---
