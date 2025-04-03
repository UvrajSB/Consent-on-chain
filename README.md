# Consent Management On Chain API Documentation

## Introduction
This API allows users to manage and verify consent artifacts on the blockchain using an Ethereum-based smart contract. The system includes functionality to upload, validate, download, revoke, and retrieve consent logs.

<img width="986" alt="image" src="https://github.com/user-attachments/assets/7244b7d3-6b04-4608-84de-fc2e239f52d9" />



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
1. Copy the solidity code from the file `contract.sol` to the [Remix IDE](https://remix.ethereum.org/)
2. Compile the contract.
   
   <img width="1512" alt="image" src="https://github.com/user-attachments/assets/f4acd83c-e5fb-4fd8-ad61-26d9111f6449" />
   
4. Deploy it on the **Amoy testnet**.
   
   <img width="1512" alt="image" src="https://github.com/user-attachments/assets/bcc698a0-9632-4e32-8f6b-75dde576a6f6" />
   <img width="367" alt="image" src="https://github.com/user-attachments/assets/5df504df-f6c3-406b-aa00-584cc4cea747" />
6. Copy the **contract address** and **ABI** after deployment. <br>

   <img width="475" alt="image" src="https://github.com/user-attachments/assets/a434b7ca-acda-4e6d-a7d7-d5981de0dcc1" /> <br>
   <img width="351" alt="image" src="https://github.com/user-attachments/assets/44a8eb7f-63d7-4f1f-9df6-62bd6cc17d2c" />



### 2. Set Up the API Server

#### a) Clone the Repository
```sh
git clone [<repository-url>](https://github.com/UvrajSB/Consent-on-chain.git)
cd Consent-on-chain
```

#### b) Install Dependencies
```sh
npm install
```
#### c) Create an account on infura and get the amoy rpc url
[Infura Documentation](https://www.infura.io/blog/post/getting-started-with-infura-28e41844cc89)

#### d) Set Up Environment Variables
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

