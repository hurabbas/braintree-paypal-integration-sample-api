
# Braintree Paypal Sample Integration - API

This project demonstrates the integration of Braintree and PayPal payment gateways using NestJS. It serves as a robust example of handling payment processing within a NestJS application, showcasing how to manage transactions, handle encryption, and interact with databases.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Environment Variables](#environment-variables)
- [Contributing](#contributing)
- [License](#license)

## Features

- **Braintree Integration**: Secure and reliable payment processing using Braintree.
- **PayPal Integration**: Handle transactions with PayPal's payment gateway.
- **NestJS Framework**: Built with the modular and scalable NestJS framework.
- **Prisma ORM**: Database management with Prisma ORM.
- **Docker Support**: Easily deployable using Docker.

## Installation

1. **Clone the repository:**
    ```sh
    git clone https://github.com/your-username/your-repo-name.git
    cd your-repo-name
    ```

2. **Install dependencies:**
    ```sh
    npm install
    ```

3. **Set up Prisma:**
    ```sh
    npx prisma migrate dev
    npx prisma generate
    ```

4. **Run the application:**
    ```sh
    npm run start
    ```

## Configuration

1. **Environment Variables:**
   Ensure you have the correct environment variables set up. You can find the environment configuration files in the project root (e.g., `.env.dev`, `.env.prod`, `.env.stage`, `.env.uat`).

2. **Docker:**
   Use the provided `docker-compose.yml` for running the application in a Docker container. Run the following command:
    ```sh
    docker-compose up --build
    ```

## Usage

After setting up and running the application, you can access the API endpoints to handle payment transactions. Use an API client like Postman to interact with the available endpoints.

## API Endpoints

### Braintree

- **Initiate Transaction**
    ```http
    POST /braintree/transaction
    ```

- **Check Transaction Status**
    ```http
    GET /braintree/transaction/:id/status
    ```

### PayPal

- **Initiate Transaction**
    ```http
    POST /paypal/transaction
    ```

- **Check Transaction Status**
    ```http
    GET /paypal/transaction/:id/status
    ```

### Encryption

- **Encrypt Data**
    ```http
    POST /encryption/encrypt
    ```

- **Decrypt Data**
    ```http
    POST /encryption/decrypt
    ```

## Environment Variables

- `BRAINTREE_MERCHANT_ID`: Your Braintree Merchant ID.
- `BRAINTREE_PUBLIC_KEY`: Your Braintree Public Key.
- `BRAINTREE_PRIVATE_KEY`: Your Braintree Private Key.
- `PAYPAL_CLIENT_ID`: Your PayPal Client ID.
- `PAYPAL_CLIENT_SECRET`: Your PayPal Client Secret.
- `DATABASE_URL`: URL for your database connection.

## Contributing

Contributions are welcome! Please fork the repository and use a feature branch. Pull requests are warmly welcome.

## License

This project is licensed under the MIT License. See the LICENSE.md file for details.
