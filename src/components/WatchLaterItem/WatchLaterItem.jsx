import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import cl from "./WatchLaterItem.module.css";
import { deleteWatchLaterMovie } from "../../http/moviesAPI";
import { observer } from "mobx-react-lite";
import { Context } from "../../context";
import { Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const WatchLaterItem = observer((props) => {
  const { movie } = useContext(Context);
  const navigate = useNavigate();
  const getId = () => {
    navigate(`/movies/${props.imdbId}`);
  };
  const deleteMovie = () => {
    deleteWatchLaterMovie(props.id).then((data) => {
      movie.removeWatchLater(props.id);
    });
  };

  return (
    <div className={cl.item__wrapper}>
      <div className={cl.item__details__wrapper}>
        <div className={cl.item__image__wrapper}>
          {props.postersrc === "N/A" ? (
            <img
              className={cl.item__image}
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png"
              alt="poster"
            />
          ) : (
            <img
              className={cl.item__image}
              src={props.postersrc}
              alt="poster"
            />
          )}
        </div>

        <div className={cl.item__info}>
          <p>{props.name}</p>
          <p>{props.type}</p>
          <div className={cl.item__buttons__wrapper}>
            <Button
              variant="outlined"
              onClick={getId}
              className={cl.item__button}
            >
              Details
            </Button>
            <Button
              variant="outlined"
              color="error"
              endIcon={<DeleteIcon />}
              onClick={deleteMovie}
              className={cl.item__button}
            >
              Delete
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
});

export default WatchLaterItem;
