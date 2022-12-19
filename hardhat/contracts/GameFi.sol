//SPDX-License-Identifier:MIT

pragma solidity >=0.7.0 <0.9.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract GameFi is ERC721URIStorage{

    event tokenMint(uint indexed _id, address indexed owner);

    //address of the owner
    address public immutable owner;

    ///@dev total nfts in existence
    uint public nftCount;

    /// @dev struct defining the structure of the upgradeable nft
    struct nftProfile{
        uint id;
        // name of the nft
        string name;
        //game it belongs to
        string _gameName;
        //total levels of the nft->always 3 for now
        uint levels;
        //current level of the nft
        uint currentLevel;
        //metadatas for each levels
        string[3] stageMetadatas;
        //current flow status
        bool isFlow;
        //asking price
        uint price;
        //is nft sold
        bool isSold;
        //time since the upgardation started 0 initially
        int _upgradationTime;
        //if flow exceeded the expected time or if it is stopped before the time limit
        int leftOrExtraTime;
    }

    ///@dev how much time should pass for each nft to grow
    uint[2] public stageAmounts;

    ///@dev mapping of currentNftCount with the nftProfile
    mapping(uint => nftProfile) public currentNft;

    ///@dev mapping of gameName with the nfts of that game
    mapping(string => nftProfile[]) public gamingNfts;

    ///@dev array of all the games that exist
    string[] public games;

    ///@dev array of all the nfts that ever existed
    nftProfile[] public nftProfiles;

    ///@dev tokenId for the nft
    uint public tokenId;

    ///@dev mapping of tokenId with the nft id
    mapping(uint => uint) public nftTokens;

    ///@dev mapping of user address with the nft it holds
    mapping(address => uint[]) public holdingNft; 

    constructor() ERC721("GameFi","GFI"){
        owner = msg.sender;
    }

    modifier onlyOwner{
        require(msg.sender == owner, "You're not the owner!");
        _;
    }

    ///@dev sets the time requred to upgrade each nft, will be same for each nft as of now
    function setUpgradeTime() external onlyOwner{
        stageAmounts[0] = 40 seconds;
        stageAmounts[1] = 60 seconds;
    }

    function createNft(string calldata _name, string calldata _gameName, uint _price, string[3] memory metaDatas) external onlyOwner{
        nftCount+=1;

        nftProfile memory newNftProfile;
        
        newNftProfile.id = nftCount;
        newNftProfile.name=_name;
        newNftProfile._gameName=_gameName;
        newNftProfile.levels=3;
        newNftProfile.currentLevel=1;
        newNftProfile.stageMetadatas=metaDatas;
        newNftProfile.isFlow=false;
        newNftProfile.price=_price;

        nftProfiles.push(newNftProfile);
        gamingNfts[_gameName].push(newNftProfile);
        currentNft[nftCount] = newNftProfile;
    }

    function mint(uint _nftId) external payable{
        require(_nftId<=nftCount, "NFT doesn't exist");
        require(msg.value>=currentNft[_nftId].price, "Ether sent is not correct");
        require(currentNft[_nftId].isSold == false, "NFT already sold");

        tokenId+=1;

        _mint(msg.sender, tokenId);
        _setTokenURI(tokenId, currentNft[_nftId].stageMetadatas[0]);

        currentNft[_nftId].isSold = true;
        holdingNft[msg.sender].push(tokenId);
        nftTokens[tokenId] = _nftId;

        emit tokenMint(tokenId, msg.sender);
    }

    function addGame(string calldata _gameName) external onlyOwner{
        games.push(_gameName);
    }

    function getGameData(string calldata _gameName) external view returns(nftProfile[] memory){
        return gamingNfts[_gameName];
    }

    function getOwnedNft() external view returns(string[] memory){
            string[] memory tokenArray = new string[](holdingNft[msg.sender].length);

            for(uint i; i<tokenArray.length; i++){
                tokenArray[i]=tokenURI(holdingNft[msg.sender][i]);
            }

            return tokenArray;
    }

    function getGames() external view returns(string[] memory){
        return games;
    }

    function getOwnedId() external view returns(uint[] memory){
        return holdingNft[msg.sender];
    }

    function getOwnerNft(uint _tokenId) external view returns(string memory){
        return tokenURI(_tokenId);
    }

    function upgrade(uint _tokenId) external {
        uint nftId = nftTokens[_tokenId];
        require(currentNft[nftId].isFlow == false, "Flow already started");
        currentNft[nftId].isFlow = true;
        currentNft[nftId]._upgradationTime = int(block.timestamp) + currentNft[nftId].leftOrExtraTime;
    }

    function stopFlow(uint _tokenId) external {
        uint nftId = nftTokens[_tokenId];
        require(currentNft[nftId].isFlow == true, "Flow isn't ongoing");

        currentNft[nftId].isFlow = false;

        nftProfile storage _currentNftProfile = currentNft[nftId];
        int time = _currentNftProfile._upgradationTime;

        if(_currentNftProfile.currentLevel == 1){
            if(int(block.timestamp)-time >= 40 seconds){
                _setTokenURI(_tokenId, _currentNftProfile.stageMetadatas[1]);
                _currentNftProfile.leftOrExtraTime = int(block.timestamp)-(time + 40 seconds);
                _currentNftProfile._upgradationTime=0;
                _currentNftProfile.currentLevel = 2;
            }else{
                 _currentNftProfile.leftOrExtraTime = int(block.timestamp)-(time + 40 seconds);
            }
        }else if(_currentNftProfile.currentLevel == 2){
                if(int(block.timestamp)-time >= 60 seconds){
                _setTokenURI(_tokenId, _currentNftProfile.stageMetadatas[2]);
                _currentNftProfile.leftOrExtraTime = int(block.timestamp)-(time + 60 seconds);
                _currentNftProfile._upgradationTime=0;
                _currentNftProfile.currentLevel = 3;
            }else{
                 _currentNftProfile.leftOrExtraTime = int(block.timestamp)-(time + 60 seconds);
            }
        }
        ///@dev todo do the same step for level2 and test it again
        nftProfiles[_currentNftProfile.id-1] = _currentNftProfile;
        
    }

    receive() external payable{}
    fallback() external payable{}

}