import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import cl from './WatchLaterItem.module.css'
import { updateRating } from "../../http/moviesAPI";
const WatchLaterItem = (props) => {
    const navigate = useNavigate()
    const getId = () => {
        navigate(`/movies/${props.imdbId}`)
    }
    
    const [rating, setRating] = useState(0)
    const rateMovie = () => {
        updateRating({rating: rating, id: props.id }).then(data => {
            
        })
    }
    return (
        <div className={cl.item__wrapper}>
            <input type="text" value={rating} onChange={(event) => setRating(event.target.value)}/>
            <button onClick={rateMovie}>Rate</button>
            <div className={cl.item__image__wrapper}>
                <img className={cl.item__image} src={props.postersrc} alt="N/A" />
            </div>
            <div className={cl.item__details}>
            <div className={cl.item__info}>
            <p>{props.name}</p>
            </div>
            <div className={cl.item__button__wrapper}>
                <p>{props.rating}</p>
            <button onClick={getId}  className={cl.item__button}>Details</button>
            </div>
            </div>
        </div>
    );
};

export default WatchLaterItem;