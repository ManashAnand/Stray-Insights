// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function getBalances(address){
  const balanceBigInt = await hre.ethers.provider.getBalance(address);
  return hre.ethers.formatEther(balanceBigInt);
  // return balanceBigInt;
 }

 async function consoleBalance(addresses){
  let counter = 0;
  for( const address of addresses){
    console.log(`Address ${counter} balance: `, await getBalances(address));
    counter++;
  }
 }

 async function consoleStray(strays){
  for(const stray of strays){
    const timestamp = stray.timeStamps;
    const name = stray.name;
    const from = stray.from;
    const message = stray.message;
    console.log(`At ${timestamp}, name ${name} , address ${from}, message ${message}`)
  }
 }

async function main() {

  const [owner,from1,from2,from3] = await hre.ethers.getSigners();
  const chai = await hre.ethers.getContractFactory("stray")
  // chai use hua mera stary.sol lane ke liye

  const contract = await chai.deploy();
  // contract mera stray.sol ka instance bana ke deploy kar rha hai hardhat network me

  // await contract.deployed(); -> ye kaam nhi kiya
  // await contract.deploymentTransaction() -> ye kargya per pata nhi kya kiya

  // deploy krne ka step hai
  console.log("Address of contract ",await contract.getAddress());
  // mere initial contract ka address

  const addresses = [owner.address,from1.address,from2.address,from3.address];
  console.log("before donation")
  await consoleBalance(addresses);

  const amount = {value:hre.ethers.parseEther("1")};
  await contract.connect(from1).pay("From1","First transactino from vs code",amount);
  await contract.connect(from2).pay("From2","second transactino from vs code",amount);
  await contract.connect(from3).pay("From3","third transactino from vs code",amount);
  // hum kar kya rhe hai actually hum from1,from2 and from3 ke address se call kar rhe hai apne function pay ko

  console.log("after donation")
  await consoleBalance(addresses);


  const allStray =  await contract.getStrays()
  consoleStray(allStray)
}



// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
