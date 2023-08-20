import React from "react";
import { useNavigate } from "react-router-dom";
import cl from "./MoviesListItem.module.css";
import { Button } from "@mui/material";
const MoviesListItem = (props) => {
  const navigate = useNavigate();
  const getId = () => {
    navigate(`/movies/${props.id}`);
  };
  return (
    <div className={cl.item__wrapper}>
      <div className={cl.item__image__wrapper}>
        {props.postersrc === "N/A" ? (
          <img
            className={cl.item__image}
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png"
            alt="poster"
          />
        ) : (
          <img className={cl.item__image} src={props.postersrc} alt="poster" />
        )}
      </div>
      <div className={cl.item__details}>
        <div className={cl.item__info}>
          <h3 className={cl.item__name}>{props.title}</h3>
          <p>{props.type}</p>
          <p>{props.year}</p>
        </div>
        <div className={cl.item__button__wrapper}>
          <Button
            variant="outlined"
            onClick={getId}
            className={cl.item__button}
          >
            Details
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MoviesListItem;
