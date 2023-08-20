import React, { useContext, useState, useEffect } from "react";
import Icon from "@mdi/react";
import { mdiStar } from "@mdi/js";
import cl from "./MovieDetails.module.css";
import { Context } from "../../context";
import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  fetchWatchedMovies,
  createWatchedMovie,
  fetchWatchLaterMovies,
  createWatchLaterMovie,
  deleteWatchedMovie,
  deleteWatchLaterMovie,
} from "../../http/moviesAPI";
import { observer } from "mobx-react-lite";
const MovieDetails = observer((props) => {
  const [watchedId, setWatchedId] = useState(0);
  const [isWatched, setIsWatched] = useState(false);
  const [watchLaterId, setWatchLaterId] = useState(0);
  const [isWatchLater, setIsWatchLater] = useState(false);
  const [myRating, setMyRating] = useState(0);
  const { user } = useContext(Context);
  const addWatched = () => {
    createWatchedMovie({
      name: props.title,
      postersrc: props.postersrc,
      imdbId: props.imdbId,
      userId: user._userId,
      type: props.type,
    }).then((data) => {
      setWatchedId(data.id);
      setIsWatched(true);
    });
  };
  const addWatchLater = () => {
    createWatchLaterMovie({
      name: props.title,
      postersrc: props.postersrc,
      imdbId: props.imdbId,
      userId: user._userId,
      type: props.type,
    }).then((data) => {
      setWatchLaterId(data.id);
      setIsWatchLater(true);
    });
  };
  const deleteWatched = () => {
    deleteWatchedMovie(watchedId).then((data) => {
      setIsWatched(false);
    });
  };
  const deleteWatchLater = () => {
    deleteWatchLaterMovie(watchLaterId).then((data) => {
      setIsWatchLater(false);
    });
  };
  useEffect(() => {
    fetchWatchLaterMovies(user._userId).then((data) => {
      data.forEach((element) => {
        if (props.imdbId === element.imdbId) {
          setIsWatchLater(true);
          setWatchLaterId(element.id);
        }
      });
    });
    fetchWatchedMovies(user._userId).then((data) => {
      data.forEach((element) => {
        if (props.imdbId === element.imdbId) {
          setIsWatched(true);
          setMyRating(element.rating);
          setWatchedId(element.id);
        }
      });
    });
  }, []);
  return (
    <div className={cl.details__wrapper}>
      <div className={cl.details__info}>
        <div className={cl.details__image__wrapper}>
          <div>
            {" "}
            {props.postersrc === "N/A" ? (
              <img
                className={cl.details__image}
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png"
                alt="poster"
              />
            ) : (
              <img
                className={cl.details__image}
                src={props.postersrc}
                alt="poster"
              />
            )}
          </div>
          <div className={cl.details__buttons}>
            {!isWatchLater ? (
              <Button
                variant="outlined"
                color="success"
                disabled={!user._isAuth}
                endIcon={<AddIcon />}
                onClick={addWatchLater}
              >
                {" "}
                Add to watch later
              </Button>
            ) : (
              <Button
                variant="outlined"
                color="error"
                endIcon={<DeleteIcon />}
                onClick={deleteWatchLater}
              >
                {" "}
                Delete from watch later{" "}
              </Button>
            )}
            {!isWatched ? (
              <Button
                variant="outlined"
                color="success"
                disabled={!user._isAuth}
                endIcon={<AddIcon />}
                onClick={addWatched}
              >
                {" "}
                Add to watched
              </Button>
            ) : (
              <Button
                variant="outlined"
                color="error"
                endIcon={<DeleteIcon />}
                onClick={deleteWatched}
              >
                {" "}
                Delete from watched{" "}
              </Button>
            )}
          </div>
        </div>
        <div className={cl.details__title__wrapper}></div>
        <div className={cl.details__description}>
          <h1 className={cl.details__title}>{props.title}</h1>
          <div className={cl.details__rating__wrapper}>
            <div className={cl.details__rating}>
              <Icon className={cl.details__icon} path={mdiStar}></Icon>
              <span>{props.imdbRating}</span>
            </div>
            <p>You rated</p>{" "}
            {myRating > 0 ? (
              <div className={cl.details__my__rating}>
                <Icon className={cl.details__icon} path={mdiStar}></Icon>
                <span>{myRating}</span>{" "}
              </div>
            ) : (
              <span>N/A</span>
            )}
          </div>
          <div className={cl.description__flex__wrapper}>
            <div className={cl.description__flex}>
              <p>Genre:</p>
              <p>Type:</p>
              <p>Year:</p>
              {props.type === "series" ? <p>Seasons:</p> : null}
              <p>Runtime: </p>
              <p>Actors: </p>
            </div>
            <div className={cl.description__flex}>
              <p>{props.genres}</p>
              <p>{props.type}</p>
              <p>{props.year}</p>
              {props.type === "series" ? <p>{props.totalSeasons}</p> : null}
              <p>{props.runtime}</p>
              <p>{props.actors}</p>
            </div>
          </div>
        </div>
      </div>
      <div className={cl.details__plot__wrapper}>
        <p className={cl.details__plot}>{props.plot}</p>
      </div>
    </div>
  );
});

export default MovieDetails;
