import React from 'react';
import logo from './logo.png';
import './App.css';
import { Link } from 'react-router-dom';
const Home = () => {
    return (

        <div className="App">
        <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
          <p>
               We never really forgot them!!!
          </p>
         
    <div className="button-container">
    <Link to="/views">
    <button className="App-link" >
    View our Lost Bites
    </button>
    </Link>
    <Link to="/add">
    <button className="App-link" >
     Add your Lost Bite
     </button>
     </Link>
     <Link to="/winner">
    <button className="App-link" >
     Popular Lost Bite
     </button>
     </Link>
      </div>
      </header>
      </div>
    );
};
export default Home;