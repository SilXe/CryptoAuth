const hre = require("hardhat");

async function main() {
  const MyNFT = await hre.ethers.getContractFactory("MyNFT");
  const myNFT = await MyNFT.deploy();
  await myNFT.waitForDeployment();

  console.log(`✅ MyNFT deployed at: ${myNFT.target}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
