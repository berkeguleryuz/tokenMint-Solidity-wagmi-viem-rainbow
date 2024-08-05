import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const config: HardhatUserConfig = {
  solidity: "0.8.24",
  networks: {
    hardhat: {
      forking: {
        url: "https://mainnet.infura.io/v3/39c030cd1f2345c1904cec94f708360a",
        blockNumber: 20477072,
      },
    },
  },
};

export default config;
