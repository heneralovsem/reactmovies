import React, { useState } from "react";
import axios from "axios";
import MoviesListItem from "./MoviesListItem/MoviesListItem";
import { getPagesArr, getTotalPages } from "./pagination/pages";
import Loader from "./Loader/Loader";
import { useFetching } from "../hooks/useFetching";
const MoviesList = () => {
    const [data, setData] = useState([])
    const [title, setTitle] = useState('')
    const [totalPages, setTotalPages] = useState(0)
    const [page, setPage] = useState(1)
    const [checkSearch, setCheckSearch] = useState('search');
    const perPage = 10;
    let pagesArr = getPagesArr(totalPages)
    
    const [fetchMovies, isLoading, error] = useFetching(async (page) => {
        if (title.length < 3) {
            const response = await axios.get(`http://www.omdbapi.com/?apikey=e06d9c6d&t=${title}`)
            setData(response.data)
            console.log(response.data)
            setCheckSearch('title')
            setTotalPages(0)
        }
        else {
        const response = await axios.get(`http://www.omdbapi.com/?apikey=e06d9c6d&s=${title}&page=${page}`)
        setData(response.data.Search);
        console.log(data)
        const totalResults = response.data.totalResults
        setTotalPages(getTotalPages(totalResults, perPage))
      //  {pagesArr.map((p => <button onClick={() => changePage(p)} className={page === p ? 'pagebtn pagebtn__active' : 'pagebtn'} key={p}>{p}</button> ))}
        console.log(response.data)
        setCheckSearch('search')
        }
    })
    
    const changePage = (page) => {  
        
        setPage(page)
        fetchMovies(page)
    }
    
    
    
    return (
        <div>
            <div className="search">
            <input type="text" value={title} onChange={(event) => setTitle(event.target.value)}/>
            <button onClick={fetchMovies}>movies</button>
            </div>
            {isLoading ? <Loader/> : null}
           {!error ?   <div>
          { checkSearch === 'search' ? <div> {data.map((item) => (<MoviesListItem key={item.imdbID} postersrc={item.Poster} title={item.Title} type={item.Type} year={item.Year} id={item.imdbID} />))} </div>
            : checkSearch === 'title' ? <MoviesListItem postersrc={data.Poster} title={data.Title} type={data.Type} year={data.Year} id={data.imdbID}/> : null}
            </div> : null}
            
            
        </div>
        
    );
};

export default MoviesList;