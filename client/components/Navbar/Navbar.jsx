import { Web3Button } from "@web3modal/react";
import Link from "next/link";
import classes from "./Navbar.module.css";

const Navbar = () => {
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
