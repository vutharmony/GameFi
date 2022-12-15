import classes from "./Card.module.css";

const Card = () => {
    return (
        <div className={classes.card}>
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