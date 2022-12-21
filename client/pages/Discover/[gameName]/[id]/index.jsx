import Image from "next/image";
import classes from "./Traits.module.css";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useAccount } from "wagmi";
import { ethers } from "ethers";

const Traits = () => {
  const [information, setInformation] = useState(null);
  const [metaInfo, setMetaInfo] = useState('');
  const router = useRouter();
  const contract = useSelector((state) => state.auth.contract);
  const { isConnected } = useAccount();

  const id = router.query.id;


  useEffect(() => {

    if (isConnected) {
      (async function () {
        const data = await contract.currentNft(id);
        const metadata = await contract.getCurrentMetadata(id);
        
        const info = await fetch("http://localhost:8000/pinataData", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            cid: metadata,
          }),
        });
        const res = await info.json();
        
        setMetaInfo(res.data);
        setInformation(data);
      })();
    }
  }, [isConnected]);
  console.log('m', metaInfo.attributes[0].trait_type);
  return (
    <div>
      {information && (
        <div className={classes.trait}>
          <div>
            <Image
              src="/valorant.webp"
              width="450px"
              height="550px"
              alt="the image with description"
            />
          </div>
          <div className={classes.description}>
            <h1
              className={classes.title}
            >{`${information.name} #${router.query.id}`}</h1>
            <div className={classes.price}>
              <h2>Price</h2>
              <h3>
                {ethers.utils.formatEther(information.price.toString())} ETH
              </h3>
            </div>
            <div className={classes.qualities}>
              <h4>Image Url: {metaInfo.image}</h4>
              <h4>{metaInfo.attributes[0].trait_type}: {metaInfo.attributes[0].value}</h4>
              <h4>{metaInfo.attributes[1].trait_type}: {metaInfo.attributes[1].value}</h4>
              <h4>Level: {information.currentLevel.toString()}</h4>
            </div>
            <div className={classes.upgrade}>
              <h1>
                {3 - information.currentLevel.toString()} upgrades available
              </h1>
            </div>
            <button className="btn btn-wide btn-warning">Buy Now</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Traits;
