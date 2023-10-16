const { deploy } = require("hardhat-deploy");

module.exports = async ({ getNamedAccounts, deployments }) => {
  const { deployer } = await getNamedAccounts();

  await deploy("Bowie", {
    from: deployer,
    args: [deployer], // Pass the initial owner's address here
    log: true,
  });
};
