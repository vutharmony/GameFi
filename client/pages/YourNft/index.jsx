import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useAccount } from "wagmi";
import OwnedCard from "../../components/UI/OwnedCard";
import classes from "./YourNft.module.css";

const Collection = () => {
  const { isConnected, address } = useAccount();
  const contract = useSelector((state) => state.auth.contract);
  const [ownedToken, setOwnedToken] = useState([]);
  const [ownedId, setOwnedId] = useState([]);

  useEffect(() => {
    if (isConnected) {
      (async function () {
        const ownedData = await contract.getOwnedId();
        const tokens = ownedData.map((data) => {
          return data.toString();
        });

        const ownedNftId = [];
        for (let i = 0; i < tokens.length; i++) {
          const id = await contract.nftTokens(tokens[i]);
          ownedNftId.push(id.toString());
        }
        setOwnedToken(tokens);
        setOwnedId(ownedNftId);
      })();
    }
  }, [isConnected]);

  return (
    <div>
      {ownedToken.length != 0 ?
        <div className={`grid grid-cols-3 ${classes.cards}`}>
        {ownedToken.map((token, index) => {
          return <OwnedCard key={index} tokenId={token} nftId={ownedId[index]}/>
        })}
      </div>
        :
      <div style={{textAlign:"center",margin:"15% auto"}}>
        <progress className="progress w-56"></progress>
      </div>
      }
    </div>
  );
};

export default Collection;
