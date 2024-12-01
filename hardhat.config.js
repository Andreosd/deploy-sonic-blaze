require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

// This private key is just a placeholder and should be replaced with your actual key in .env file
const SONIC_PRIVATE_KEY = process.env.SONIC_PRIVATE_KEY || "0000000000000000000000000000000000000000000000000000000000000000";

module.exports = {
  solidity: "0.8.19",
  networks: {
    sonic: {
      url: "https://rpc.blaze.soniclabs.com",
      accounts: [SONIC_PRIVATE_KEY]
    }
  }
};
