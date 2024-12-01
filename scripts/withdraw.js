const hre = require("hardhat");

// List of contract addresses from previous deployment
const contractAddresses = [
    "0xc99F8C725CaFaB54eDEc0d92fe7F50a3C1414Efd",
    "0xa3D2388fD4a5C8553B38a28684B6Ec146983e375",
    "0xbaB3Ed6983703F2f30825402D8115cEadAE99660",
    "0x5A9DC3b659066131e38c2728c20E7283f2d6628b",
    "0x568296422d03D91eeDfFFDDD1F3B1083e36E352b",
    "0x208CCf1Fe6ff0C622858486eb5250a17f6FB2dF6",
    "0xC802BC5967CcEeaA7f5861a537906025E8a32d19",
    "0xdE5Ca4C87d740b90e76D2e1C48E25034B87707DF",
    "0x15b0bF3dC83C1Bd41608E546189eF25Be87A03f3",
    "0x83db9Ee3DaacAf5983ccd6Be16D454E10c03D64d",
    "0x4598aB61352773db14cbD6F4ca408b828c26673b",
    "0xCe00a7d00D1A45eC7915531626e93f9bB7e6dD11",
    "0xf6482eB310AAE13E3194780ae308e107d7E8848F",
    "0x447a7F2840aaDC276BeCe8bc5dAD73E1A7b5d0f7",
    "0xBfB61F7dd60Bf9ACc6f898fbc937b51246b3C0d8"
];

async function main() {
    const SimpleContract = await hre.ethers.getContractFactory("SimpleContract");
    
    console.log("Starting withdrawal from all contracts...");
    
    for (const address of contractAddresses) {
        try {
            const contract = await hre.ethers.getContractAt("SimpleContract", address);
            const balance = await contract.getBalance();
            
            if (balance > 0) {
                console.log(`Withdrawing ${hre.ethers.formatEther(balance)} S from ${address}`);
                const tx = await contract.withdraw();
                await tx.wait();
                console.log(`Successfully withdrawn from ${address}`);
            } else {
                console.log(`No balance to withdraw from ${address}`);
            }
        } catch (error) {
            console.error(`Error withdrawing from ${address}:`, error.message);
        }
    }
    
    console.log("\nWithdrawal process completed!");
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
