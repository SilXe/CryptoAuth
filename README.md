Web3 Authentication App 

This is a decentralized login and authorization platform built with Web3 technologies. Instead of traditional username/password credentials, users authenticate using their crypto wallets. Smart contracts and NFTs are used to differentiate user roles such as **Member**, **Manager**, and **Admin**. The app automatically detects wallet connection and adapts the UI accordingly (e.g., login/logout button, page routing, and profile access).

## Features

- Wallet-based login (connect and disconnect)
- Automatic navigation to dashboard on wallet connection
- Access-controlled pages based on login state
- NFT-based user role authorization (WIP)
- Smart contract backend using Hardhat (migrated from Remix)
- Celo Alfajores testnet support

## Tech Stack

Frontend:
- React
- Vite
- Ethers.js
- RainbowKit + Wagmi
- TailwindCSS
- React Router

Backend:
- Hardhat (for smart contract development and testing)
- Solidity
- Celo Alfajores Testnet

## Prerequisites

- Node.js (v18+ recommended)
- Git
- Metamask or compatible crypto wallet
- Celo Alfajores testnet configured in wallet

## Setup & Installation

  1. Clone the Repository

           git clone https://github.com/your-username/your-repo.git

           cd web3_auth_app

  2️ Install Dependencies
  
  Frontend

    cd frontend
    npm install

  Backend

    cd ../backend

    npm install

  Smart Contract
  
    cd ../smart-contracts
    npm install

 Running the App

  1️ Start the Backend
  
      cd backend
      node server.js

    
  Backend runs on http://localhost:5000/

  2️ Start the Frontend
  
      cd ../frontend
      npm start

    
  Frontend runs on http://localhost:3000/

Compile Smart Contracts

      cd ../smart-contracts
      npx hardhat compile

 Contributors

  Sonbom Lee - https://github.com/SilXe
