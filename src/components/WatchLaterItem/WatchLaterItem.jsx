import React from "react";
import { useNavigate } from "react-router-dom";
import cl from './WatchLaterItem.module.css'
const WatchLaterItem = (props) => {
    const navigate = useNavigate()
    const getId = () => {
        navigate(`/movies/${props.imdbId}`)
    }
    return (
        <div className={cl.item__wrapper}>
            <div className={cl.item__image__wrapper}>
                <img className={cl.item__image} src={props.postersrc} alt="N/A" />
            </div>
            <div className={cl.item__details}>
            <div className={cl.item__info}>
            <p>{props.name}</p>
            </div>
            <div className={cl.item__button__wrapper}>
            <button onClick={getId}  className={cl.item__button}>Details</button>
            </div>
            </div>
        </div>
    );
};

export default WatchLaterItem;