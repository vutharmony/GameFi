import classes from "./Card.module.css";
import {useRouter} from "next/router";

const Card = () => {
    const router = useRouter();

    const redirectHandler = async () => {
        router.push('Discover/hell')
    }

    return (
        <div className={classes.card} onClick={redirectHandler}>
            <div className={classes.main}>
                <img src ="valo.jpg" alt =""/>
            </div>
            <div className={classes.side}>
                <img src="valorant.webp" alt ="" />
                <h3>Valorant</h3>
            </div>
        </div>
    )
};

export default Card;