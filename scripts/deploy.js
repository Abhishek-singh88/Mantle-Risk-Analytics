const hre = require("hardhat");

async function main() {
  const RiskRegistry = await hre.ethers.getContractFactory("RiskRegistry");

  const registry = await RiskRegistry.deploy();

  // ethers v6 style
  await registry.waitForDeployment();

  console.log("RiskRegistry deployed to:", await registry.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
