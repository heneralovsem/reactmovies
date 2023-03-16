import React from "react";
import { useNavigate } from "react-router-dom";
import cl from './MoviesListItem.module.css'
const MoviesListItem = (props) => {
    const navigate = useNavigate()
    const getId = () => {
        navigate(`/movies/${props.id}`)
    }
    return (
        <div className={cl.item__wrapper}>
            <div className={cl.item__image__wrapper}>
                <img className={cl.item__image} src={props.postersrc} alt="N/A" />
            </div>
            <div className={cl.item__details}>
            <div className={cl.item__info}>
            <p>{props.title}</p>
            <p>{props.type}</p>
            <p>{props.year}</p>
            </div>
            <div className={cl.item__button__wrapper}>
            <button onClick={getId} className={cl.item__button}>Details</button>
            </div>
            </div>
        </div>
    );
};

export default MoviesListItem;