import Image from "next/image";
import classes from "./Traits.module.css";

const Traits = () => {
    return (
        <div className={classes.trait}>
            <div>
                <Image src="/valorant.webp" width="450px" height="550px" alt="the image with description"/>
            </div>
            <div className={classes.description}>
                <h1 className={classes.title}>Itachi Character #4339</h1>
                <div className={classes.price}>
                    <h2>Price</h2>
                    <h3>0.0045 ETH</h3>
                </div>
                <div className={classes.qualities}>
                    <h4>Eyes: Rare</h4>
                    <h4>Hairs: White</h4>
                    <h4>Power: 70%</h4>
                </div>
                <div className={classes.upgrade}>
                    <h1>2 upgrades available</h1>
                </div>
                <button className="btn btn-wide btn-warning">Buy Now</button>
            </div>
        </div>
    )
};

export default Traits;