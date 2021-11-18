/**
* @type import('hardhat/config').HardhatUserConfig
*/
require("hardhat-contract-sizer");
require('dotenv').config();
require("@nomiclabs/hardhat-ethers");
require("@nomiclabs/hardhat-etherscan");
const { ROPSTEN_API_URL, ROPTSEN_PRIVATE_KEY, ETHERSCAN_API_KEY } = process.env;

module.exports = {
   solidity: {
      version: "0.8.0",
      settings: {
         optimizer: {
            enabled: true,
            runs: 200
         }
      }
   },
   defaultNetwork: "ropsten",
   networks: {
      hardhat: {},
      ropsten: {
         url: ROPSTEN_API_URL,
         accounts: [`0x${ROPTSEN_PRIVATE_KEY}`]
      }
   },
   etherscan: {
      apiKey: ETHERSCAN_API_KEY
   }
}