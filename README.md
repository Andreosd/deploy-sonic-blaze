# Sonic Network Smart Contract Project

This project demonstrates a basic smart contract deployment on the Sonic Network using Hardhat.

## Installation

```bash
npm install
```

## Configuration

1. Create a `.env` file in the root directory
2. Add your private key to the `.env` file:
```
SONIC_PRIVATE_KEY=your_private_key_here
```

## Available Scripts

```bash
# Compile contracts
npx hardhat compile

# Deploy contracts
npx hardhat run scripts/deploy.js --network sonic

# Run tests
npx hardhat test
```

## Security

- Never commit your `.env` file
- Never share your private keys
- Always use environment variables for sensitive data

## Contract Features

- Simple contract with withdrawal functionality
- Owner-only withdrawal protection
- Balance checking capability

## Network Configuration

The project is configured to work with the Sonic Network:
- Network Name: Sonic
- RPC URL: https://rpc.blaze.soniclabs.com
