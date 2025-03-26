Web3 Authentication App 

A React & Express.js application that implements Web3 login authorization using smart contracts and NFTs to differentiate user roles (Member, Intern, Manager). Users sign in with their crypto wallets instead of traditional credentials.

  Tech Stack

  Frontend: React.js, React Router, Styled-Components

  Backend: Node.js, Express.js, CORS

  Web3: ethers.js, MetaMask Integration

  Version Control: GitHub

  Smart Contracts (Upcoming): Solidity, Hardhat

 Setup & Installation

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


 Running the App

  1️ Start the Backend
    cd backend
    node server.js
  Backend runs on http://localhost:5000/

  2️ Start the Frontend
    cd ../frontend
    npm start
  Frontend runs on http://localhost:3000/

  3️ Run Both Frontend & Backend Simultaneously
    From the root directory (web3_auth_app), run:

    npm install --save-dev concurrently

    npm start

  This will start both the backend (5000) and frontend (3000) at the same time.

 Web3 Authentication Flow

  User connects their MetaMask wallet.

  The app verifies the wallet address.

  Based on NFT ownership, the system assigns roles (Member, Intern, Manager).

  User gets access to features based on their role.

 Environment Variables (.env)

  Inside the backend directory, create a .env file:

    PORT=5000

    INFURA_API_KEY=your_infura_key

    PRIVATE_KEY=your_wallet_private_key

  Replace with your actual credentials.

** Future Features**

   Wallet Authentication (Coinbase, Celo)

   React & Express Setup

   Smart Contract Integration (Upcoming)

   NFT-Based Role Assignment

   Dashboard UI for Role Management

 Contributors

  Sonbom Lee - https://github.com/SilXe
