import { Web3Button } from "@web3modal/react";
import Link from "next/link";
import classes from "./Navbar.module.css";

const Navbar = () => {
  return (
    <div className={classes.navbar}>
      <div className={classes.heading}>
        <div>
          <h1>GameFi</h1>
        </div>
        <div>
          <ul>
            <li><Link href="/">Link1</Link></li>
            <li><Link href="/home">Link2</Link></li>
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
