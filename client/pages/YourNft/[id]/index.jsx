import classes from "../../Discover/[gameName]/[id]/Traits.module.css";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import {useAccount} from "wagmi";
import { useSelector } from "react-redux";
import { ethers } from "ethers";
import Image from "next/image";
import { createStream, deleteStream } from "../../../superfluid/Superfluid";

const Details = () => {
  const [nftInformation, setNftInformation] = useState('');
  const [metaInfo, setMetaInfo] = useState('');
  const [upgrading, setUpgrading] = useState(false);
  const [upgradeValue, setUpgradeValue] = useState(0);
  const {isConnected, address} = useAccount();
  const contract = useSelector((state) => state.auth.contract);
  const signer = useSelector((state) => state.auth.signer);
  const router = useRouter();

  const nftId = router.query.id;
  const tokenId = router.query.tokenId;

  useEffect(() => {
    
        if(isConnected){
            (async function(){
                const data = await contract.currentNft(nftId)
                const cid = await contract.getCurrentMetadata(nftId);
                const cidData = await fetch("http://localhost:8000/pinataData", {
                    method:"POST",
                    headers:{
                        "Content-Type":"application/json"
                    },
                    body:JSON.stringify({
                        cid:cid
                    })
                });
                
                const response = await cidData.json();

                setNftInformation(data);
                setMetaInfo(response.data);
            })();
        }

    }, [isConnected]);

    const upgradeHandler = async () => {
        /**Start the money stream for 'n' seconds acc to level number */
        //call createStream here

        // const tx = await contract.upgrade(tokenId);
        // setUpgrading(true);
        
        //let it run for n no of seconds
        // var v = 0;
        // if(setInterval === 100){
        //     clearInterval(intervalId)
        //     return;
        // }

        // const intervalId = setInterval(() => {
        //     v +=1;
        //     if(v > 20){
        //         clearInterval(intervalId);
        //         return;
        //     }
        //     setUpgradeValue((upgradeValue) => upgradeValue+1)
            
        // }, 1000);

        /**stop streaming after n no of seconds here */
        /**call stop function in smart contract to stop the upgradation */
    }

  return (
    <div>
    { nftInformation !== '' &&
      <div className={classes.trait}>
        <div>
          <img
            src="https://gateway.pinata.cloud/ipfs/QmaFMPmV4J8KkjZLZDeTX3TV9jLurwvhvhA3zXdvYSD2Jb"
            width="450px"
            height="550px"
            alt="the image with description"
          />
        </div>
        <div className={classes.description}>
          <h1
            className={classes.title}
          >{`${metaInfo.name} #${router.query.id}`}</h1>
          <div className={classes.price}>
            <h2>Initial Price</h2>
            <h3>
              {ethers.utils.formatEther(nftInformation?.price.toString())} ETH
            </h3>
          </div>
          {metaInfo !== "" && (
            <div className={classes.qualities}>
              <h4>Image Url: {metaInfo.image}</h4>
              <h4>
                {metaInfo.attributes[0].trait_type}:{" "}
                {metaInfo.attributes[0].value}
              </h4>
              <h4>
                {metaInfo.attributes[1].trait_type}:{" "}
                {metaInfo.attributes[1].value}
              </h4>
              <h4>Level: {nftInformation.currentLevel.toString()}</h4>
              {nftInformation.currentLevel.toString() < 3 && <h4>Upgradation Time: {nftInformation.currentLevel.toString() == 1 ? "40 seconds" : nftInformation.currentLevel.toString == 2 && "60 seconds"}</h4>}
              {!upgrading && <div>
                <span>Upgrading: &nbsp;</span> 
                <progress className="progress progress-info w-56" value={upgradeValue} max="100"></progress>
                &nbsp; {upgradeValue}
                </div>
              }
              </div>
          )}
          <div className={classes.upgrade}>
            <h1>
              {3 - nftInformation.currentLevel.toString()} upgrades available
            </h1>
          </div>
          <button
            className="btn btn-wide btn-warning"
            onClick={upgradeHandler}
          >
            {upgrading ? "Upgrading": "Upgrade"}
          </button>
        </div>
      </div>
          }
    </div>
  );

};

export default Details;
