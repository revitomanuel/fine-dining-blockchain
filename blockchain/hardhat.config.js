import { config as dotenvConfig } from "dotenv";
import hardhatEthers from "@nomicfoundation/hardhat-ethers";

dotenvConfig();

/**
 * Hardhat Configuration
 * Fine Dining Blockchain Prototype
 */

export default {
  plugins: [hardhatEthers],

  solidity: {
    version: "0.8.30",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },

  networks: {
    sepolia: {
      type: "http",
      url: process.env.SEPOLIA_RPC_URL,
      accounts: process.env.PRIVATE_KEY
        ? [process.env.PRIVATE_KEY]
        : []
    }
  }
};