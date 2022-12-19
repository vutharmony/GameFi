import { ethers } from "ethers";
import Image from "next/image";
import classes from "./NftCard.module.css";
import { useRouter } from "next/router";

const NftCard = (props) => {
    const router=useRouter();
    const imageStyle = {
        borderRadius: "20px 20px 0 0",

    }
    const id = props.id.toString();
    return (
        <div className={classes.card}>
            <div className={classes.image} onClick={() => {router.push(`/Discover/${props.gameName}/${id}`)}}>
                <Image src="/valorant.webp" style={imageStyle} width="220px" height="230px" alt="definitely an nft"/>
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