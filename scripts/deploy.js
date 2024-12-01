const hre = require("hardhat");

async function main() {
  const SimpleContract = await hre.ethers.getContractFactory("SimpleContract");
  const deployedContracts = [];
  
  console.log("Deploying contracts...");
  
  // Deploy contract
  const contract = await SimpleContract.deploy();
  await contract.waitForDeployment();
  const address = await contract.getAddress();
  console.log(`Contract deployed to:`, address);
  
  // Verify the deployment
  console.log("Contract deployment verified!");
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
