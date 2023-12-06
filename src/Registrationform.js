import React, { useState } from 'react';
import axios  from 'axios';
import { useNavigate } from 'react-router-dom';
import './logreg.css';
function RegistrationForm() {
  // State for form fields
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate=useNavigate();
  // Handle form submission
  const handleRegistration = async (e) => {
    e.preventDefault();
    // Send a POST request to the registration endpoint on the backend
    // Include email and password in the request body
    // Handle success and error responses
    try {
      const response = await axios.post('http://localhost:5000/register', {
        username:username,
        email: email,
        password: password,
      });

      if (response.status === 200) {
        // Registration was successful
        console.log('Registration successful');
        setUsername('');
        setEmail('');
        setPassword('');
        navigate('/login');
        // Optionally, you can redirect the user to the login page or display a success message
      }
    } catch (error) {
      // Handle registration error
      console.error('Registration error:', error.response.data.message);
      // You can display an error message to the user
    }
  };
  const handleBack=(e)=>{
    e.preventDefault();
    navigate('/');
  }


  return (
   
   <div>
   <h1>Register to the world of Lost Bites!!</h1>
   <form onSubmit={handleRegistration} className="form">
     <div className="form-group">
     <label htmlFor="username">Username : </label>
       <input
         type="text"
         id="username"
         placeholder="Name"
         name="username"
         value={username}
         onChange={(e) => setUsername(e.target.value)}
         required
       />
       <br/><br/>
       <label htmlFor="email">Email : </label>
       <input
         type="email"
         id="email"
         placeholder="Email"
         name="email"
         value={email}
         onChange={(e) => setEmail(e.target.value)}
         required
       />
       <br/><br/>
       <label htmlFor="password">Password :</label>
        <input
        type="password"
         id="password"
         placeholder="Password"
         name="password"
         value={password}
         onChange={(e) => setPassword(e.target.value)}
         required
       />
     </div>
     <br/>
     <button type="submit" >Register</button>
     <button onClick={handleBack}>Back</button>
    
   </form>
 </div>
  );
}

export default RegistrationForm;