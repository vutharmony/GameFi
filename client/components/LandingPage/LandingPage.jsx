import classes from "./LandingPage.module.css";
import {useRouter} from "next/router";

const LandingPage = () => {
    const router = useRouter();

    return (
        <div className={classes.landingPage}>
            <div className={classes.line}>
                <div>
                <h1 className={classes.heading}>Discover, Collect and <span className={classes.highlight}>Grow</span> your NFTs</h1>
                <p>Improve your gaming experience and grow your gaming NFTs with Superfluid streams</p>
            </div>
            <div className={classes.button}>
                <button className="btn btn-primary" onClick={() => router.push("/Discover")}>Start Collecting</button>
            </div>
            </div>
            <div className={classes.nft}>
                <img src="img2.avif" alt="nft"/>
            </div>
        </div>
    )
};

export default LandingPage;