/**
* @type import('hardhat/config').HardhatUserConfig
*/
require("hardhat-contract-sizer");
require('dotenv').config();
require("@nomiclabs/hardhat-ethers");
const { ROPSTEN_API_URL, ROPTSEN_PRIVATE_KEY } = process.env;

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
}