require("dotenv").config();
const {ethers} = require("hardhat");


const ABI = [
    "function createNft(string calldata _name, string calldata _gameName, uint _price, string[3] memory metaDatas) external",
    "function addGame(string calldata _gameName) external"
]

const contractAddress = "0xA35ad5cdB862690F5082c99a690f3C8231286a42";

const provider = new ethers.providers.JsonRpcProvider(process.env.ALCHEMY_MUMBAI);
const contract = new ethers.Contract(contractAddress, ABI, provider);

const wallet = new contract.Wallet(process.env.PRIVATE_KEY)

async function addGamesNft(){


    const name = "Ghost";
    const gameName = "valorant"
    const price = ethers.utils.formatEther("0.0000001");
    const metadatas = ["QmRygrnqomJRLCNwqwjjGdkQuQh6ZQ9JbGeH4NK3ehDukg", "QmVwwfcgy6e7FZ3CopRDZXEs9E1oafp7mJTUh7iF8Rxg13", "Qmcq38i2Vkpp8N2ZG5KaEJDkhqZurBYMtWdLRSZGu9N6rS"];
    const addNft = await contract.connect(wallet).createNft(name, gameName, price, metadatas);

    await addNft.wait();


}

async function addGame(){
    const gameName = "valorant"

    const add = await contract.connect(wallet).addGame(gameName);

    await add.wait();

    console.log(add);

}
addGame();
// addGamesNft();