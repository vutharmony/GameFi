import Image from "next/image";
import classes from "./Traits.module.css";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useAccount } from "wagmi";
import { ethers } from "ethers";

const Traits = () => {
  const [information, setInformation] = useState(null);  
  const router = useRouter();
  const contract = useSelector((state) => state.auth.contract);
  const { isConnected } = useAccount();

  const id = router.query.id;
  useEffect(() => {
    if (isConnected) {
      console.log("in here");

      (async function () {
        const data = await contract.currentNft(id);
        console.log("data is ", data);
        setInformation(data);
      })();
    }
  }, [isConnected]);

  return (
    <div>
      { information &&
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
            <h1 className={classes.title}>{`${information.name} #${router.query.id}`}</h1>
            <div className={classes.price}>
              <h2>Price</h2>
              <h3>{ethers.utils.formatEther(information.price.toString())} ETH</h3>
            </div>
            <div className={classes.qualities}>
              <h4>Eyes: Rare</h4>
              <h4>Hairs: White</h4>
              <h4>Power: 70%</h4>
            </div>
            <div className={classes.upgrade}>
              <h1>{3-information.currentLevel.toString()} upgrades available</h1>
            </div>
            <button className="btn btn-wide btn-warning">Buy Now</button>
          </div>
        </div>
      }
    </div>
  );
};

export default Traits;
