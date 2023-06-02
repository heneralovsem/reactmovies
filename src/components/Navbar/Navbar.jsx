import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Context } from "../../context";
import Button from '@mui/material/Button'
import cl from './Navbar.module.css'
import { observer } from "mobx-react-lite";

const Navbar = observer (() => {
    const {user} = useContext(Context)
    const [openBurger, setOpenBurger] = useState(false)
    
    const logout = () => {
        localStorage.removeItem('token')
        user.setUser({})
        user.setIsAuth(false)
        window.location.reload(false)
      }
    const openNav = () => {
        setOpenBurger(!openBurger)
    }
    return (
        <div className={cl.menu__bg}>
        <div className={cl.menu}>
        <div className={cl.menu__links}>
        <Link className={cl.menu__link} to="/about">About</Link>
        <Link className={cl.menu__link} to="/movies">Search movies</Link>
        <Link className={cl.menu__link} to="/profile">Profile</Link>
        </div>
        <div onClick={openNav} className={cl.burger__wrapper}>
        <span className={cl.bar}></span>
        <span className={cl.bar}></span>
        <span className={cl.bar}></span>
        {openBurger ? <div className={cl.burger__links}>
        <Link className={cl.menu__link} to="/about">About</Link>
        <Link className={cl.menu__link} to="/weather">Weather</Link>
        <Link className={cl.menu__link} to="/profile">Profile</Link>
            </div> : null }
        </div>
        
        <div className={cl.auth__links}>
        
        {!user.isAuth ? <Button variant="outlined"><Link className={cl.button__link} to="/login">Log in</Link></Button> : <Button variant="outlined" onClick={logout}>Log out</Button> }
      
        </div>
        
     
    </div>
        </div>
    );
});

export default Navbar;