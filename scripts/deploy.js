const hre = require("hardhat");

async function main() {
  const RiskRegistry = await hre.ethers.getContractFactory("RiskRegistry");
  const registry = await RiskRegistry.deploy();
  await registry.deployed();

  console.log("RiskRegistry deployed to:", registry.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
