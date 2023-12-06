import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './logreg.css';
function LoginForm() {
  // State for form fields
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate=useNavigate();
  // Handle form submission
  const handleLogin = async (e) => {
    e.preventDefault();
    // Send a POST request to the registration endpoint on the backend
    // Include email and password in the request body
    // Handle success and error responses
    try {
      const response = await axios.post('http://localhost:5000/login', {
        email: email,
        password: password,
      });
      const { token, userId } = response.data;

// Store the token and userId in local storage or a state management system
        localStorage.setItem('jwtToken', token);
         localStorage.setItem('userId', userId);

      if (response.status === 200) {
        // Login was successful
        console.log('Login successful');
        setEmail('');
        setPassword('');
        navigate('/home');
        // Optionally, you can store the JWT token in localStorage or a cookie
        // Redirect the user to a protected route or display a success message
      }
    } catch (error) {
      // Handle login error
      console.error('Login error:', error.response.data.message);
    }
  };
  const handleBack=(e)=>{
    e.preventDefault();
    navigate('/');
  }
  

  return (
   
   <div>
   <h1>Login to the world of Lost Bites!!</h1>
   <form onSubmit={handleLogin} className="form">
     <div className="form-group">
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
     <button type="submit" >Login</button>
     <button onClick={handleBack}>Back</button>
    
   </form>
 </div>
  );
}

export default LoginForm;