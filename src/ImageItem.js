import React from 'react';
import LikeButton from './LikeButton';

function ImageItem({ user }) {
  
 
  
  return (
    <div className="out">
      <div className="key" key={user.id} style={{ display: "flex", alignItems: "center" }}>
        <div style={{ flex: 1 ,fontWeight:"bold"}}>
          {user.name}
        </div>
        <div style={{marginRight:"10px"}}>
          <LikeButton itemid={user.iduser} cnt={user.likecount} />
        </div>
      </div>
      <div className="ans">{user.desc}</div>
    </div>
  );
}

export default ImageItem;
