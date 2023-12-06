
import React from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Register from './Register';
import Login from './Login';
import Auth from './Auth';
import Views from './Views';
import Home from './Home';
import Add from './Add';
import Winner from './Winner';
//import { UserInputProvider } from './UserInputContext';

function App() {

  return (

   <Router>
  
    
    <Routes>
 
    <Route path="/views" element={<Views/>} />
    <Route path="/home" element={<Home/>}/>
    <Route path="/add" element={<Add/>}/>
    <Route path="/" element={<Auth/>}/>
    <Route path="/register" element={<Register/>}/>
    <Route path="/login" element={<Login/>}/>
    <Route path="/winner" element={<Winner/>}/>
    </Routes>
    
    
    
    </Router>
   
    
  );
}

export default App;
