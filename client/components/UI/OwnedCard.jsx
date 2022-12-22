import Image from "next/image";
import classes from "./NftCard.module.css";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { useSelector } from "react-redux";

const OwnedCard = (props) => {
    const [data, setData] = useState({});
    const {isConnected} = useAccount();
    const contract = useSelector((state) => state.auth.contract);
    const router=useRouter();
    const nftId = props.nftId;
    const tokenId = props.tokenId;
    

    const imageStyle = {
        borderRadius: "20px 20px 0 0",

    }

    useEffect(() => {

        if(isConnected){
            (async function(){
                const response = await contract.currentNft(nftId);
                setData(response);
            })();
        }

    }, [isConnected]);

    return (
        <div className={classes.card} onClick={() => {router.push(`/YourNft/${nftId}?tokenId=${tokenId}`)}}>
            <div className={classes.image}>
                <Image src={"/valorant.webp"} style={imageStyle} width="220px" height="230px" alt="definitely an nft"/>
            </div> 
            <div>
                <h3>{data?.name}</h3>
                <h4>Level {data?.currentLevel?.toString()}</h4>
                <button className="btn btn-wide btn-warning">See more</button>
            </div>
        </div>
    )
};

export default OwnedCard;