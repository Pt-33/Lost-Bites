//import React, { useEffect, useState } from 'react';
//import axios from 'axios';
// DisplayImagePage.js
/*import React from 'react';
import { useUserInput } from './UserInputContext';

function DisplayImagePage() {
  const { userInput } = useUserInput();
 

  
  console.log('User Input in DisplayImagePage:', userInput); // Debugging statement

  return (
    <div>
      <h1>Another Page</h1>
      <p>User Input from Form: {userInput}</p>
      
    </div>
  );
}

export default DisplayImagePage;*/

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ImageItem from './ImageItem';
import {useNavigate} from 'react-router-dom';

function DisplayImagePage() {
  const navigate=useNavigate();
  
  const [userData, setUserData] = useState([]);
  const handleAdd=(e)=>{
    e.preventDefault();
    navigate('/add');
  }
  const handleHome=(e)=>{
    e.preventDefault();
    navigate('/');
  }
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get('http://localhost:5000/api/userData');
        setUserData(response.data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchData();
  }, []);

  return (
    <div>
      <h1>View our Lost-bites!!</h1>
      <div>
      {userData.map((user) => (
          <ImageItem key={user.iduser} user={user} />
        ))}
      </div>
      <button onClick={handleAdd}>Go to Add</button>
      <button onClick={handleHome}>Logout</button>
    </div>
  );
}
export default DisplayImagePage;





