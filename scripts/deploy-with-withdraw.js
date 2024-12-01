const hre = require("hardhat");

async function main() {
  const SimpleContract = await hre.ethers.getContractFactory("SimpleContract");
  const deployedContracts = [];
  
  console.log("Deploying 15 contracts with withdrawal function...");
  
  // Deploy 15 contracts
  for (let i = 0; i < 15; i++) {
    const contract = await SimpleContract.deploy();
    await contract.waitForDeployment();
    const address = await contract.getAddress();
    deployedContracts.push({ contract, address });
    console.log(`Contract ${i + 1} deployed to:`, address);
  }
  
  // Transfer 0.01 S to each contract
  const [signer] = await hre.ethers.getSigners();
  console.log("\nTransferring 0.01 S to each contract...");
  
  for (const { address } of deployedContracts) {
    const tx = await signer.sendTransaction({
      to: address,
      value: hre.ethers.parseEther("0.01")
    });
    await tx.wait();
    console.log(`Transferred 0.01 S to:`, address);
  }

  // Wait for a few seconds
  console.log("\nWaiting for transactions to be confirmed...");
  await new Promise(resolve => setTimeout(resolve, 5000));

  // Withdraw from all contracts
  console.log("\nWithdrawing from all contracts...");
  for (const { contract, address } of deployedContracts) {
    const balance = await contract.getBalance();
    if (balance > 0) {
      console.log(`Withdrawing ${hre.ethers.formatEther(balance)} S from ${address}`);
      const tx = await contract.withdraw();
      await tx.wait();
      console.log(`Successfully withdrawn from ${address}`);
    }
  }
  
  console.log("\nAll operations completed successfully!");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
