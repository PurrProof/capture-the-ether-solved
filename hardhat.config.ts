import "@nomicfoundation/hardhat-toolbox";
import "dotenv/config";
import "hardhat-contract-sizer";
import "hardhat-gas-reporter";
import { HardhatUserConfig } from "hardhat/config";

const config: HardhatUserConfig = {
  solidity: {
    compilers: [
      {
        version: "0.8.27",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
      {
        version: "0.4.21",
      }
    ],
  },
  defaultNetwork: "hardhat",
  networks: {
    localhost: {
      url: "http://127.0.0.1:8545",
      accounts: [process.env.OWNER_KEY ?? "", process.env.PLAYER_KEY ?? ""],
      chainId: 31337,
      gas: 5_000_000,
      gasPrice: 10_000_000_000, //10gwei
    },
  },
  gasReporter: {
    enabled: false,
  },
};

export default config;
