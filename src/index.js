import React from 'react';
import { Context } from './context';
import UserStore from './store/UserStore';
import ReactDOM from 'react-dom/client';
import App from './App';
import MoviesStore from './store/MoviesStore';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Context.Provider
    value={{
      user: new UserStore(),
      movie: new MoviesStore(),
    }}>
      
    <App />
    </Context.Provider>
);
