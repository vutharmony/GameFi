const {ethers} = require("hardhat");

async function main(){

  const GameFiFactory = await ethers.getContractFactory("GameFi");

  const GameFi = await GameFiFactory.deploy();

  await GameFi.deployed();

  console.log('Contract address is ', GameFi.address);
}

main();