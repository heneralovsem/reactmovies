import React, { useContext, useEffect, useState } from "react";
import { fetchWatchLaterMovies, fetchWatchedMovies } from "../http/moviesAPI";
import { observer } from "mobx-react-lite";
import { Context } from "../context";
import WatchLaterItem from "../components/WatchLaterItem/WatchLaterItem";
import { $host } from "../http";



const ProfilePage = observer(() => {
    const [data, setData] = useState([])
    const {user} = useContext(Context)
    
    let userName = localStorage.getItem('name')
    console.log(user._userId)
    // const fetchWatchLaterMovies =  async () => {
    //     const {data} = await $host.get(`api/user/watchlater?userId=${user._userId}`)
        
    //     return data
    // }
    
    useEffect(() => {
        fetchWatchLaterMovies(user._userId).then(data => {
            setData(data)
            
        })
        
    }, [])
    const fetchWatched = () => {
        fetchWatchedMovies(user._userId).then(data => {
        setData(data)
        console.log(data)
        })
      }
      const fetchWatchLater = () => {
        fetchWatchLaterMovies(user._userId).then(data => {
        setData(data)
        console.log(data)
        })
      }
      
    return (
        <div>
            <h1 style={{textAlign: 'center'}}>Welcome <span style={{color: '#1976d2'}}>{userName}</span>  </h1>
            <div> 
            <button onClick={fetchWatchLater}>Watch later</button>
            <button onClick={fetchWatched}>Watched</button>
            </div>
            {data.map(watchLaterMovie => (<WatchLaterItem key={watchLaterMovie.id} name={watchLaterMovie.name} postersrc={watchLaterMovie.postersrc} imdbId={watchLaterMovie.imdbId}  rating={watchLaterMovie.rating} id={watchLaterMovie.id}/>) )}
        </div>
    );
});

export default ProfilePage;