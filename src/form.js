//import React, { useState } from 'react';
//import axios from 'axios';
/*function FormWithImageUpload() {
    const [name, setName] = useState('');
    const [selectedImage, setSelectedImage] = useState(null);
    const [textInput, setTextInput] = useState('');
  
    const handleNameChange = (event) => {
      setName(event.target.value);
    };
  
    const handleImageChange = (event) => {
      const imageFile = event.target.files[0];
      setSelectedImage(imageFile);
    };
  
    const handleTextInputChange = (event) => {
      setTextInput(event.target.value);
    };
  
    const handleSubmit = async (event) => {
      event.preventDefault();
  
      // Create FormData for image upload
      const formData = new FormData();
      formData.append('image', selectedImage);
  
      // You can perform additional processing here before sending the form data
      try {
        // Send the image to the server
        const response = await axios.post('http://localhost:5000/api/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
    
        console.log('Upload success:', response.data);
        // Perform any navigation or state updates after successful upload
      } catch (error) {
        console.error('Upload error:', error);
      }
    
  
      // Log the form data for demonstration
      console.log('Name:', name);
      console.log('Image:', selectedImage);
      console.log('Text Input:', textInput);
  
      // Clear form fields
      setName('');
      setSelectedImage(null);
      setTextInput('');
    };
  
    return (
      <div>
        <h1>Form with Image Upload</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Name:</label>
            <input type="text" value={name} onChange={handleNameChange} />
          </div>
          <div>
            <label>Image:</label>
            <input type="file" accept="image/*" onChange={handleImageChange} />
          </div>
          <div>
            <label>Text Input:</label>
            <textarea value={textInput} onChange={handleTextInputChange}></textarea>
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
  
  export default FormWithImageUpload;
  */
 

  // MyForm.js
/*import React, { useState } from 'react';
import { useUserInput } from './UserInputContext';

function MyForm() {
  // Use the custom hook to access the context
  const { userInput, setUserInput } = useUserInput();
  
  // Local state to manage form input
  const [formData, setFormData] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Update the user input in the context
    setUserInput(formData);
    // Clear the form input
    setFormData('');
  };

  return (
    <div>
      <h1>My Form</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter user input"
          value={formData}
          onChange={(e) => setFormData(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
      {/* Display the user input from the context 
      <p>User Input from Form: {userInput}</p>
    </div>
  );
}

export default MyForm;
*/
// MyForm.js
/*import React, { useState } from 'react';
import { useUserInput } from './UserInputContext';
import { useNavigate } from 'react-router-dom';

function MyForm() {

  const { userInput, setUserInput } = useUserInput();
  const [formData, setFormData] = useState('');
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    setUserInput(formData);
    setFormData('');
  };
  const handleClick = (e) => {
    navigate('/views');
   };
  console.log('User Input in MyForm:', userInput); // Debugging statement

  return (
    <div>
      <h1>My Form</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter user input"
          value={formData}
          onChange={(e) => setFormData(e.target.value)}
        />
        <button type="submit">Submit</button>
        <button onClick={handleClick}>View</button>
      </form>
    </div>
  );
}

export default MyForm;
*/
import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom';
import './form.css';
import axios from 'axios';

function MyForm() {
  // State to store the user's name input
  const navigate=useNavigate();
  const [name, setName] = useState('');
  const [desc, setDesc] =useState('');
  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send the user's name input to the server
      await axios.post('http://localhost:5000/api/userData', { name,desc });

      // Clear the form input after successful submission
      setName('');
      setDesc('');
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };
  const handleView=(e)=>{
    e.preventDefault();
    navigate('/views');
  }
  const handleHome=(e)=>{
    e.preventDefault();
    navigate('/');
  }

  return (
    <div>
      <h1>Add your Lost Bite!!</h1>
      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <label htmlFor="nameInput">Name of your Lost-bite : </label>
          <input
            type="text"
            id="nameInput"
            placeholder="Name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <br/><br/>
          <label htmlFor="desc">Description :</label>
           <textarea
            rows={8} cols={50}
            id="desc"
            placeholder="Provide details about your lost-bite!!"
            name="desc"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            required
          />
        </div>
        <br/>
        <button type="submit" >Add</button>
        <button onClick={handleView}>Go to View</button>
        <button onClick={handleHome}>Logout</button>
      </form>
    </div>
  );
}

export default MyForm;
