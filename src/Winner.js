import React ,{useState} from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './View.css';




const Winner = () => {
    const [maxLikeCountItem, setMaxLikeCountItem] = useState(null);
    useEffect(() => {
        async function fetchMaxLikeCountItem() {
          try {
            const response = await axios.get('http://localhost:5000/api/winner');
            setMaxLikeCountItem(response.data);
          } catch (error) {
            console.error(error);
          }
        }
    
        fetchMaxLikeCountItem();
      }, []);
    return (
        <div className="Add">
        <header className="Add-header">
        
          <div>
          <h1>Most Popular Lost Bite!!</h1>
      {maxLikeCountItem ? (
        <div>
          <h2>{maxLikeCountItem.name}</h2>
          <p>Likes: {maxLikeCountItem.likecount}</p>
          <p>Description: {maxLikeCountItem.desc}</p>
           </div>
            ) : (
                <p>Loading...</p>
              )}
            </div>
            <Link to="/home">
    <button className="App-link" >
     Home
     </button>
     </Link>
     <Link to="/">
    <button className="App-link" >
     Logout
     </button>
     </Link>
    <div className="button-container">
   </div>
      </header>
      </div>
    );
}

export default Winner;
