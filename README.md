# CryptoAuth

## Project Overview

CryptoAuth is a decentralized identity and authorization system built on Web3 principles.
It uses NFTs as proof of user registration and role management, integrating secure salted hashing to bind user identity while preserving privacy.

Through CryptoAgility, CryptoAuth is designed to future-proof cryptographic security, enabling easy upgrades of hashing algorithms as new standards emerge.

No centralized databases are used — all critical user information is cryptographically hashed, pinned to IPFS, and verified securely at runtime.

## Motivation

Today’s applications heavily rely on centralized servers to store user identity and access control data.
This leads to risks like:
- Single point of failure
- Data breaches
- Vendor lock-in
    
CryptoAuth offers a Web3-native alternative:
 - User identities are tied to NFTs
 - Role metadata is securely hashed and decentralized
 - Authentication is verified cryptographically without relying on backend storage

## Core Features

- #### NFT-Based Identity:
Each user mints a personalized NFT containing hashed metadata (name, email, role).
 - #### CryptoAgility:
The backend hashing logic supports multiple cryptographic algorithms (SHA-256, SHA3-256, etc.) and can be upgraded without systemic redesign.
 - #### Private Salted Hashing:
Name and email are salted and hashed using backend-only secrets, ensuring privacy while enabling secure verification.
 - #### Fully Decentralized Storage:
All user metadata is pinned to IPFS via Pinata, eliminating centralized database dependency.
 - #### Role-Based Access:
User roles (Member, Manager, Intern) are assigned at NFT mint time and validated during profile access.
 - #### Secure Profile Verification:
During login, user inputs are verified against NFT metadata using private backend hashing without exposing raw data.

## How CryptoAuth Works (Flow)

#### Sign Up
 - User enters name and email.
 - Frontend sends the raw data to the backend.
 - Backend hashes the input with a private salt.
 - Hashed metadata is pinned to IPFS.
 - NFT is minted pointing to the IPFS metadata.

#### Profile Access
 - Connected wallet retrieves owned NFT metadata.
 - User inputs name/email again for verification.
 - Backend re-hashes and compares with stored hashes.
 - If verified, user's real profile information is revealed.

#### No Database Storage
 - No sensitive user information is ever stored off-chain.
 - Verification is fully cryptographic and decentralized.

## Architecture Overview

      Layer                   |              Technology
      Frontend                |              React.js
      Backend                 |              Node.js, Express.js
      Smart Contract          |              Solidity (ERC721 with URI Storage)
      Storage                 |              IPFS (via Pinata)
      Blockchain              |              Sui Blockchain (adaptable)
      Wallet Integration      |              Ethers.js

## How to Run Locally
### Prerequisites
 - Node.js (v18+)
 - Yarn or npm
 - Metamask / Sui Wallet extension installed

### Installation Steps
      # Clone the repository
      git clone https://github.com/your-username/cryptoauth.git

      # Install backend dependencies
      cd backend
      npm install

      # Start backend server
      node server.js

      # Open new terminal, install frontend dependencies
      cd ../frontend
      npm install

      # Start frontend dev server
      npm run start

## Future Improvements
 - Integration with Sui zkLogin for seamless OAuth identity bridging
 - On-chain randomness for randomized role assignments
 - Multisignature access control for NFT minting and role upgrades
 - UI polish for dashboard views based on user role
 - Deployment to testnet and mainnet after hackathon
 - Integration with zk-SNARK for more privacy

## Tech Stack
 - React.js
 - Node.js / Express.js
 - Solidity Smart Contracts
 - Sui Blockchain
 - Pinata/IPFS Decentralized Storage
 - Ethers.js
 - Crypto module for backend hashing

## Acknowledgements
 - Sui Overflow 2025 Hackathon
 - Pinata, Infura, and OpenZeppelin for critical infrastructure
 - Sui Foundation
 - Celo for NFT minting flow

## Notification / Alert
    This project is in active development.

    Role-based NFT logic and backend integration are WIP.

    Make sure your wallet is connected to the Celo Alfajores testnet.

 ### Contributors
  Sonbom Lee - https://github.com/SilXe
