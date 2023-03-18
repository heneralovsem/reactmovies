import React, { useEffect, useRef, useState } from "react";
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
    let newSearch;
    let pageValue;
    let pagesArr = getPagesArr(totalPages)
    const lastElement = useRef()
    const observer = useRef();
    const [fetchMovies, isLoading, error] = useFetching(async (pageValue, newSearch) => {
        
       
        console.log(pageValue)
        if (title.length < 3) {
            const response = await axios.get(`http://www.omdbapi.com/?apikey=e06d9c6d&t=${title}`)
            setData(response.data)
            console.log(response.data)
            setCheckSearch('title')
            setTotalPages(0)
            
        }
        else {
        const response = await axios.get(`http://www.omdbapi.com/?apikey=e06d9c6d&s=${title}&page=${pageValue}`)
        if (newSearch) {
            setData(response.data.Search)
                console.log('yep')
            
        }
        else {
            if (pageValue === 1 && newSearch === false) {
            setData(response.data.Search)
            console.log('YEP')
            
            }
            else {
            setData([...data, ...response.data.Search]);
            console.log(data)
            }
        }
        const totalResults = response.data.totalResults 
        setTotalPages(getTotalPages(totalResults, perPage))
      //  {pagesArr.map((p => <button onClick={() => changePage(p)} className={page === p ? 'pagebtn pagebtn__active' : 'pagebtn'} key={p}>{p}</button> ))}
        console.log(response.data)
        setCheckSearch('search')
        
        }
    })
    useEffect(() => {
        if(isLoading) return;
        if(observer.current) observer.current.disconnect()
        var callback = function(entries, observer) {
            if(entries[0].isIntersecting && page < totalPages){
                
                console.log(page)
                setPage(page + 1)
            pageValue = page;
            newSearch = false;
            fetchMovies(pageValue, newSearch)
            }
        };
        observer.current = new IntersectionObserver(callback);
        observer.current.observe(lastElement.current)
    }, [isLoading])
    // const changePage = (page) => {  
        
    //     setPage(page)
    //     fetchMovies(page)
    // }
    const newFetch = () => {
        newSearch = true;
        
        setPage(1)
        pageValue = 1;
        fetchMovies(pageValue, newSearch)
        
    }
    
    
    return (
        <div>
            <div className="search">
            <input type="text" value={title} onChange={(event) => setTitle(event.target.value)}/>
            <button onClick={newFetch}>movies</button>
            </div>
            
           {!error ?   <div>
          { checkSearch === 'search' ? <div> {data.map((item) => (<MoviesListItem key={item.imdbID} postersrc={item.Poster} title={item.Title} type={item.Type} year={item.Year} id={item.imdbID} />))} </div>
            : checkSearch === 'title' ? <MoviesListItem postersrc={data.Poster} title={data.Title} type={data.Type} year={data.Year} id={data.imdbID}/> : null}
            </div> : null}
            <div ref={lastElement}></div>
            {isLoading ? <Loader/> : null}
        </div>
        
    );
};

export default MoviesList;