require("dotenv").config();
require("@nomicfoundation/hardhat-toolbox");

const { MANTLE_PRIVATE_KEY, MANTLE_RPC_URL } = process.env;

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.28",
  networks: {
    hardhat: {},
    mantleSepolia: {
      url: MANTLE_RPC_URL || "https://rpc.sepolia.mantle.xyz",
      chainId: 5003,
      accounts: MANTLE_PRIVATE_KEY ? [MANTLE_PRIVATE_KEY] : [],
    },
  },
};
