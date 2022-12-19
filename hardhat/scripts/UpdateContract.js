require("doetnv").config();
const {ABI, contractAddress} = require("../../client/constants/Index")
const {ethers} = require("hardhat");

async function addGame(){

    const provider = new ethers.providers.JsonRpcProvider(process.env.ALCHEMY_MUMBAI);
    const contract = new ethers.Contract(contractAddress, ABI, provider);

    // const wallet = new contract.wallet

}

addGame();