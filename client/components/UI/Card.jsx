import classes from "./Card.module.css";
import {useRouter} from "next/router";
import { useEffect, useState } from "react";

const Card = (props) => {
        const [image, setImage] = useState({
            big:'',
            small:''
        })
    const router = useRouter();

    useEffect(() => {

    if(props.name === 'valorant'){
        const obj = {
            big:"valo.jpg",
            small:"valorant.webp"
        }
        setImage(obj)

    }else if(props.name === 'pubg'){
        const obj = {
            big:"pubgBig.jpg",
            small:"pubgSmall.jpg"
        }
        setImage(obj);
    }

    }, []);
    const redirectHandler = async () => {
        router.push(`Discover/${props.name}`)
    }

    return (
        <div className={classes.card} onClick={redirectHandler}>
            <div className={classes.main}>
                <img src ={image.big} alt =""/>
            </div>
            <div className={classes.side}>
                <img src={image.small} alt ="" />
                <h3>{props.name}</h3>
            </div>
        </div>
    )
};

export default Card;