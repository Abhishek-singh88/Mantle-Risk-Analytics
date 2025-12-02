const hre = require("hardhat");

async function main() {
  const RiskRegistry = await hre.ethers.getContractFactory("RiskRegistry");

  const registry = await RiskRegistry.deploy();


  await registry.waitForDeployment();

  console.log("RiskRegistry deployed to:", await registry.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});


/// contract = 0x1Bc3A28750723dCDE4F9ec49777174Ee7aEc46Ff