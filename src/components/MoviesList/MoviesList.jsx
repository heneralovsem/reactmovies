import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import MoviesListItem from "../MoviesListItem/MoviesListItem";
import { getPagesArr, getTotalPages } from "../pagination/pages";
import Loader from "../Loader/Loader";
import { useFetching } from "../../hooks/useFetching";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import cl from "./MoviesList.module.css";
import EmptyItem from "../EmptyItem/EmptyItem";
import Icon from "@mdi/react";
import { mdiMagnify } from "@mdi/js";
import SearchIcon from "@mui/icons-material/Search";

const MoviesList = () => {
  let titleValue;
  let newSearch;
  let pageValue;
  const [data, setData] = useState([]);
  const [isSearching, setIsSearching] = useState(true);
  const [title, setTitle] = useState("");
  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage] = useState(1);
  const [checkSearch, setCheckSearch] = useState("search");
  const perPage = 10;

  let pagesArr = getPagesArr(totalPages);
  const lastElement = useRef();
  const observer = useRef();

  const [fetchMovies, isLoading, error] = useFetching(
    async (pageValue, newSearch) => {
      setIsSearching(true);
      if (titleValue.length < 3) {
        const response = await axios.get(
          `http://www.omdbapi.com/?apikey=e06d9c6d&t=${titleValue}`
        );
        setData(response.data);
        setCheckSearch("title");
        setTotalPages(0);
      } else {
        const response = await axios.get(
          `http://www.omdbapi.com/?apikey=e06d9c6d&s=${titleValue}&page=${pageValue}`
        );
        if (response.data.Error) {
          setData(response.data);
        } else {
          if (newSearch) {
            setData(response.data.Search);
          } else {
            if (pageValue === 1 && newSearch === false) {
              setData(response.data.Search);
            } else {
              setData([...data, ...response.data.Search]);
            }
          }
        }
        const totalResults = response.data.totalResults;
        setTotalPages(getTotalPages(totalResults, perPage));

        setCheckSearch("search");
      }
    }
  );
  useEffect(() => {
    if (localStorage.getItem("inputValue")) {
      titleValue = localStorage.getItem("inputValue");
      setTitle(titleValue);
      fetchMovies(pageValue);
    } else {
      titleValue = "";
      setIsSearching(false);
    }
  }, []);
  useEffect(() => {
    if (isLoading) return;
    if (observer.current) observer.current.disconnect();
    var callback = function (entries, observer) {
      if (entries[0].isIntersecting && page <= totalPages && totalPages != 1) {
        titleValue = localStorage.getItem("inputValue");
        setPage(page + 1);
        pageValue = page;
        newSearch = false;
        fetchMovies(pageValue, newSearch);
      }
    };
    observer.current = new IntersectionObserver(callback);
    observer.current.observe(lastElement.current);
  }, [isLoading]);
  const newFetch = () => {
    localStorage.setItem("inputValue", `${title}`);
    titleValue = title;
    newSearch = true;
    setPage(1);
    pageValue = 1;
    fetchMovies(pageValue, newSearch);
  };
  const fetchOnEnter = (e) => {
    if (e.key === "Enter") {
      newFetch();
    }
  };

  return (
    <div>
      <div className={cl.search_wrapper}>
        <TextField
          sx={{ width: "100%" }}
          size="small"
          id="filled-search"
          type="text"
          placeholder="Search..."
          value={title}
          onKeyUp={fetchOnEnter}
          onChange={(event) => setTitle(event.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={newFetch}>
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        ></TextField>
      </div>
      {!isSearching && !isLoading ? <EmptyItem /> : null}
      {data.Error ? <p className={cl.error}>{data.Error}</p> : null}
      {!data.Error ? (
        <div>
          {checkSearch === "search" ? (
            <div>
              {" "}
              {data.map((item) => (
                <MoviesListItem
                  key={item.imdbID}
                  postersrc={item.Poster}
                  title={item.Title}
                  type={item.Type}
                  year={item.Year}
                  id={item.imdbID}
                />
              ))}{" "}
            </div>
          ) : checkSearch === "title" ? (
            <MoviesListItem
              postersrc={data.Poster}
              title={data.Title}
              type={data.Type}
              year={data.Year}
              id={data.imdbID}
            />
          ) : null}
        </div>
      ) : null}
      <div ref={lastElement}></div>
      {isLoading ? <Loader /> : null}
    </div>
  );
};

export default MoviesList;
