import { Web3Button } from "@web3modal/react";
import Link from "next/link";
import classes from "./Navbar.module.css";
import {useAccount} from "wagmi";
import { useEffect } from "react";
import {contractAddress, ABI} from "../../constants/Index";
import {ethers} from "ethers";
import {useDispatch, useSelector} from "react-redux";
import { authActions } from "../../store";

const Navbar = () => {
  const {isConnected} = useAccount();
  const dispatch = useDispatch();

  useEffect(() => {

    if(isConnected){
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(contractAddress, ABI, signer);
      const accountDetails = {
        signer,
        contract
      };
      dispatch(authActions.connect(accountDetails));
    }

  }, [isConnected]);


  return (
    <div className={classes.navbar}>
      <div className={classes.heading}>
        <div className={classes.logo}>
          <h1><Link href="/">GameFi</Link></h1>
        </div>
        <div>
          <ul>
            <li><Link href="/Discover">Discover</Link></li>
            <li><Link href="/YourNft">Your NFTs</Link></li>
          </ul>
        </div>
      </div>
      <div className={classes.button}>
        <Web3Button />
      </div>
    </div>
  );
};

export default Navbar;
