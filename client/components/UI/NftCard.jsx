import { ethers } from "ethers";
import Image from "next/image";
import classes from "./NftCard.module.css";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";

const NftCard = (props) => {
    const [data, setData] = useState({});
    const {isConnected} = useAccount();
    const router=useRouter();
    const id = props.id.toString();
    
    const imageStyle = {
        borderRadius: "20px 20px 0 0",

    }

    return (
        <div className={classes.card} onClick={() => {router.push(`/Discover/${props.gameName}/${id}`)}}>
            <div className={classes.image}>
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