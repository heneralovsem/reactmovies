import React from "react";
import cl from './MovieDetails.module.css'
const MovieDetails = (props) => {
    return (
        <div className={cl.details__wrapper}>
        <div className={cl.details__info}>
            <div className={cl.details__image__wrapper}>
                <img className={cl.details__image} src={props.postersrc} alt="N/A" />
            </div>
            <div className={cl.details__description}>
            <h1>{props.title}</h1>
            <p>{props.imdbRating}</p>
            <p>Actors: {props.actors}</p>
            <p>{props.genres}</p>
            <p>{props.type}</p>
            <p>{props.year}</p>
            <p>Seasons: {props.totalSeasons}</p>
            <p>Ep length: {props.runtime}</p>
            </div>
        </div>
        <div className={cl.details__plot__wrapper}>
        <p className={cl.details__plot}>{props.plot}</p>
        </div>
        </div>
    );
};

export default MovieDetails;