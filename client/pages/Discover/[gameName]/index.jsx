import NftCard from "../../../components/UI/NftCard";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { useRouter } from "next/router";

const Collection = () => {
    const router = useRouter();
    const [nftCollection, setNftCollection] = useState([]);
    const {isConnected} = useAccount();
    const contract = useSelector((state)=>state.auth.contract);

    useEffect(() => {
        if(isConnected){
            
            (async function(){
                const collection = await contract.getGameData(router.query.gameName);
                console.log('cc ', collection[0]);
                setNftCollection(collection);
            })();
        }
    }, [isConnected]);

    return (
        <div className ="grid grid-cols-3" style={{marginLeft: "50px", marginTop: "50px"}}>
            {nftCollection.length>0 ? nftCollection.map((nft, index) => {
                return !nft.isSold && <NftCard key={index} gameName={router.query.gameName} name={nft.name} price={nft.price} id={nft.id} metadatas={nft.stageMetadatas} level={nft.currentLevel.toString()}/>
            })
            :
            <h1 style={{textAlign: "center", "fontSize":"2rem", margin:"15% auto"}}>
                Loading...
            </h1>
            }
        </div>
    )
};

export default Collection;