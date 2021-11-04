/**
* @type import('hardhat/config').HardhatUserConfig
*/
require('dotenv').config();
require("@nomiclabs/hardhat-ethers");
const { ROPSTEN_API_URL, ROPTSEN_PRIVATE_KEY } = process.env;

module.exports = {
   solidity: "0.8.0",
   defaultNetwork: "ropsten",
   networks: {
      hardhat: {},
      ropsten: {
         url: ROPSTEN_API_URL,
         accounts: [`0x${ROPTSEN_PRIVATE_KEY}`]
      }
   },
}