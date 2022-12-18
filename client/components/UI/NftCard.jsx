import Image from "next/image";
import {useRouter} from "next/router";
import classes from "./NftCard.module.css";

const NftCard = () => {
    const router = useRouter();
    
    const imageStyle = {
        borderRadius: "20px 20px 0 0",

    }

    return (
        <div className={classes.card}>
            <div className={classes.image} onClick={() => {router.push("/Discover/hell/whatever")}}>
                <Image src="/valorant.webp" style={imageStyle} width="210px" height="230px" alt="definitely an nft"/>
            </div>
            <div>
                <h3>Itachi</h3>
                <h4>0.04 ETH</h4>
                <button className="btn btn-wide btn-warning">Buy</button>
            </div>
        </div>
    )
};

export default NftCard;