import React from 'react';



import logo from './logo.png';
import './App.css';
import { Link } from 'react-router-dom';
const Auth = () => {
    return (

        <div className="App">
        <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
          <p>
               We never really forgot them!!!
          </p>
         
    <div className="button-container">
    <Link to="/register">
    <button className="App-link" >
    Register
    </button>
    </Link>
    <Link to="/login">
    <button className="App-link" >
     Login
     </button>
     </Link>
    
      </div>
      </header>
      </div>
    );
};
export default Auth;
