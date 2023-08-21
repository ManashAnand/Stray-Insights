
const hre = require("hardhat");

async function main() {

    const chai = await hre.ethers.getContractFactory("stray")
    // chai use hua mera stary.sol lane ke liye
  
    const contract = await chai.deploy();
    // contract mera stray.sol ka instance bana ke deploy kar rha hai hardhat network me
  
    // await contract.deployed(); -> ye kaam nhi kiya
    // await contract.deploymentTransaction() -> ye kargya per pata nhi kya kiya
  
    // deploy krne ka step hai
    console.log("Address of contract ",await contract.getAddress());
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
  