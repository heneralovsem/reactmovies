import React, { useContext } from "react";


const ProfilePage = () => {
    let userName = localStorage.getItem('name')
    
    return (
        <div>
            <h1 style={{textAlign: 'center'}}>Welcome <span style={{color: '#1976d2'}}>{userName}</span>  </h1>
        </div>
    );
};

export default ProfilePage;