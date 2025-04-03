# Consent Management On Chain API Documentation

## Introduction
This API allows users to manage and verify consent artifacts on the blockchain using an Ethereum-based smart contract. The system includes functionality to upload, validate, download, revoke, and retrieve consent logs.

## Prerequisites
Before running this project, ensure you have the following:

- **Node.js** installed (>= v16 recommended)
- **NPM or Yarn** for package management
- **Infura API Key** (or any other Ethereum node provider)
- **Private key** for signing transactions
- **Contract deployed** on the Ethereum testnet (Amoy in this case)

---

## Steps to Set Up and Run the Project

### 1. Deploy the Smart Contract
1. Write the Solidity contract that handles consent management.
2. Compile the contract using `solc` or any Solidity compiler.
3. Deploy it on the **Amoy testnet** using Hardhat or Remix.
4. Copy the **contract address** and **ABI** after deployment.

### 2. Set Up the API Server

#### a) Clone the Repository
```sh
git clone <repository-url>
cd <project-folder>
```

#### b) Install Dependencies
```sh
npm install
```

#### c) Set Up Environment Variables
Create a `.env` file in the root directory and add the following:
```sh
AMOY_RPC_URL=<your-infura-or-other-provider-rpc-url>
PRIVATE_KEY=<your-wallet-private-key>
PORT=3000
```

#### d) Add Contract ABI
Copy the ABI from the deployed contract and save it as `ConsentManagerABI.json` in the project folder.

#### e) Start the Server
```sh
node index.js
```
Your API should now be running on `http://localhost:3000`.

---

## API Endpoints

### 1. **Upload Consent Artifact**
- **Endpoint:** `POST /upload-consent`
- **Description:** Uploads a new consent artifact to the blockchain.
- **Request Body (JSON):**
  ```json
  {
    "consentArtifactId": "string",
    "consentCollector": "string",
    "dataPrincipalIDType": "string",
    "dataPrincipalIDNumber": "string",
    "aip": "string",
    "purpose": "string",
    "datasetInfo": "string",
    "frequency": "string",
    "expiry": "timestamp",
    "consentCollectorSignature": "string"
  }
  ```
- **Response:**
  ```json
  {
    "success": true,
    "message": "Consent uploaded successfully",
    "txHash": "0x..."
  }
  ```

### 2. **Validate Consent**
- **Endpoint:** `GET /validate-consent/:id`
- **Description:** Validates if a consent artifact is active.
- **Response:**
  ```json
  {
    "success": true,
    "valid": true
  }
  ```

### 3. **Download Consent**
- **Endpoint:** `GET /download-consent/:id`
- **Description:** Retrieves details of a consent artifact.
- **Response:**
  ```json
  {
    "success": true,
    "consent": {
      "consentArtifactId": "string",
      "consentCollector": "string",
      "dataPrincipalIDType": "string",
      "dataPrincipalIDNumber": "string",
      "aip": "string",
      "purpose": "string",
      "datasetInfo": "string",
      "frequency": "string",
      "expiry": "timestamp",
      "createdAt": "timestamp",
      "consentCollectorSignature": "string",
      "active": true
    }
  }
  ```

### 4. **Revoke Consent**
- **Endpoint:** `POST /revoke-consent`
- **Description:** Revokes an existing consent artifact.
- **Request Body (JSON):**
  ```json
  {
    "id": "string"
  }
  ```
- **Response:**
  ```json
  {
    "success": true,
    "message": "Consent revoked successfully",
    "txHash": "0x..."
  }
  ```

### 5. **Fetch Consent Logs**
- **Endpoint:** `GET /consent-logs`
- **Description:** Retrieves all consent-related logs from the contract.
- **Response:**
  ```json
  {
    "success": true,
    "logs": [
      {
        "id": "string",
        "action": "string",
        "actor": "string",
        "timestamp": "timestamp"
      }
    ]
  }
  ```

---

## Notes
- The private key used in `.env` should never be shared.
- Transactions require gas fees, so ensure the wallet has sufficient test ETH.
- Always verify transaction status on [Etherscan](https://amoy.etherscan.io/).

## Conclusion
This API enables secure and efficient consent management using blockchain technology. Further improvements can include authentication, UI integration, and enhanced logging mechanisms.

