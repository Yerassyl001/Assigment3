require("@nomicfoundation/hardhat-toolbox");
require("hardhat-deploy");
require("@nomicfoundation/hardhat-chai-matchers");
/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.20",
  networks:{
    bnbtestnet:{
      url:"https://virulent-cosmopolitan-frog.bsc-testnet.quiknode.pro/e29cdc605b4ddb853f8eb7c24f1257d053b3cb2c/",
      accounts:["b45ee8792b0e30d82299e3ead563e3fdc701b9ddcc8b5ffcb752e79adbacb452"],
      chainId: 97,
    },
  },
  etherscan:{
    apiKey:"E695DEI5G9489C3K3GNBZRCVZXKWI4CQ1",
  },
};
