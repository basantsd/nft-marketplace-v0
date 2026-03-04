require("dotenv").config();
require("@nomicfoundation/hardhat-toolbox");
require("@nomicfoundation/hardhat-verify");

module.exports = {

    solidity: {
        version: "0.8.26",
        settings: {
            evmVersion: "cancun",
            optimizer: {
                enabled: true,
                runs: 200
            }
        }
    },

    networks: {
        sepolia: {
            url: process.env.SEPOLIA_RPC_URL,
            accounts: [process.env.PRIVATE_KEY],
            chainId: 11155111
        }
    },

    etherscan: {
        apiKey: process.env.ETHERSCAN_API_KEY
    }

};