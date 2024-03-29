import React, { useContext, useEffect, useState } from "react";
import {
  fetchWatchLaterMovies,
  fetchWatchedMovies,
} from "../../http/moviesAPI";
import { observer } from "mobx-react-lite";
import { Context } from "../../context";
import WatchLaterItem from "../WatchLaterItem/WatchLaterItem";
import WatchedItem from "../WatchedItem/WatchedItem";
import cl from "./Profile.module.css";
import { Button } from "@mui/material";
import EmptyListItem from "../EmptyListItem/EmptyListItem";

const Profile = observer(() => {
  const [watchLater, setWatchLater] = useState([]);
  const [watched, setWatched] = useState([]);
  const { user } = useContext(Context);
  const { movie } = useContext(Context);

  let userName = localStorage.getItem("name");

  useEffect(() => {
    if (movie._selectedType === "watched") {
      movie.setWatchLater([]);
      fetchWatchedMovies(user._userId).then((data) => {
        movie.setWatched(data);
        movie.setSelectedType("watched");
      });
    } else {
      fetchWatchLaterMovies(user._userId).then((data) => {
        movie.setWatched([]);
        movie.setWatchLater(data);
        movie.setSelectedType("watchlater");
      });
    }
  }, []);
  const fetchWatched = () => {
    movie.setWatchLater([]);
    fetchWatchedMovies(user._userId).then((data) => {
      movie.setWatched(data);
      movie.setSelectedType("watched");
    });
  };
  const fetchWatchLater = () => {
    movie.setWatched([]);
    fetchWatchLaterMovies(user._userId).then((data) => {
      movie.setWatchLater(data);
      movie.setSelectedType("watchlater");
    });
  };

  return (
    <div className={cl.profile__wrapper}>
      <div className={cl.profile__list__type}>
        <button
          className={
            movie._selectedType === "watchlater"
              ? `${cl.profile__button__active}`
              : `${cl.profile__button}`
          }
          onClick={fetchWatchLater}
        >
          Watch later
        </button>
        <button
          className={
            movie._selectedType === "watched"
              ? `${cl.profile__button__active}`
              : `${cl.profile__button}`
          }
          onClick={fetchWatched}
        >
          Watched
        </button>
      </div>
      {movie._selectedType === "watchlater" &&
      movie._watchLaterMovies.length === 0 ? (
        <EmptyListItem />
      ) : null}
      {movie._selectedType === "watched" &&
      movie._watchedMovies.length === 0 ? (
        <EmptyListItem />
      ) : null}
      {movie._watchLaterMovies
        .slice()
        .sort((a, b) => b.id - a.id)
        .map((watchLaterMovie) => (
          <WatchLaterItem
            key={watchLaterMovie.id}
            name={watchLaterMovie.name}
            postersrc={watchLaterMovie.postersrc}
            imdbId={watchLaterMovie.imdbId}
            rating={watchLaterMovie.rating}
            id={watchLaterMovie.id}
            type={watchLaterMovie.type}
          />
        ))}
      {movie._watchedMovies
        .slice()
        .sort((a, b) => b.id - a.id)
        .map((watchedMovie) => (
          <WatchedItem
            key={watchedMovie.id}
            name={watchedMovie.name}
            postersrc={watchedMovie.postersrc}
            imdbId={watchedMovie.imdbId}
            rating={watchedMovie.rating}
            id={watchedMovie.id}
            type={watchedMovie.type}
          />
        ))}
    </div>
  );
});

export default Profile;
