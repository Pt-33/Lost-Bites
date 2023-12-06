import React, { useState } from 'react';
import axios from 'axios';

function LikeButton({ itemid,cnt}) {
    const [likeCount, setLikeCount] = useState(cnt);
  const [isLiked, setIsLiked] = useState(true);
 


  const handleLike = async () => {
    let response={};
    try {
    if(isLiked===true){
       response = await axios.post(`http://localhost:5000/api/${itemid}/like`);
       setIsLiked(!isLiked);
    }else{

         response = await axios.post(`http://localhost:5000/api/${itemid}/dislike`); 
         setIsLiked(!isLiked);  
    }
        
     
      setLikeCount(response.data.totallikes);
      console.log(response.data.message);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
    <i
          style={{ fontSize:"29px"}}
          className={`fa ${isLiked ? 'fa-thumbs-o-up' : 'fa-thumbs-up'}`}
          onClick={handleLike}
          
        ></i>{likeCount} 
    
    </div>
  );
}

export default LikeButton;
