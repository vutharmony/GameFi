import { ethers } from "ethers";
import Image from "next/image";
import classes from "./NftCard.module.css";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";

const NftCard = (props) => {
    const {isConnected} = useAccount();
    const router=useRouter();
    const id = props.id.toString();
    
    const imageStyle = {
        borderRadius: "20px 20px 0 0",

    }

    useEffect(() => {

        if(isConnected){
            
            (async function(){
                const data = await fetch('http://localhost:8000/pinataData', {
                    method:"POST",
                    headers:{
                        "Content-Type":"application/json"
                    },
                    body:JSON.stringify({
                        cid:props.metadatas[props.level-1]
                    })
                })
                // const data = await fetch(`https://gateway.pinata.cloud/ipfs/QmQdXfHWrzXgVxwizXtxufh5tyDVePL4mHyfjfTqySJpCj}`)
                const res = await data.json();
            })();
        }
        
    }, [isConnected]);

    return (
        <div className={classes.card}>
            <div className={classes.image} onClick={() => {router.push(`/Discover/${props.gameName}/${id}`)}}>
                <Image src={"/valorant.webp"} style={imageStyle} width="220px" height="230px" alt="definitely an nft"/>
            </div>
            <div>
                <h3>{props.name}</h3>
                <h4>{ethers.utils.formatEther(props.price.toString())}</h4>
                <button className="btn btn-wide btn-warning">Buy</button>
            </div>
        </div>
    )
};

export default NftCard;