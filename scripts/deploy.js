const hre = require("hardhat");

async function main() {

  const factory = await hre.ethers.getContractFactory("IliaZharkovCollection");
  const contract = await factory.deploy('https://api.rovergulf.net/nft/contracts/zharkov');

  await contract.deployed();

  console.log("Contract deployed to:", contract.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exit(1);
});
