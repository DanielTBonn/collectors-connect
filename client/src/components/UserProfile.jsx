import React from "react";
import "./UserProfile.css";
import "./Cards";

const UserProfile = ({ user }) => {
 
console.log(user);
const collectionArray = user.collections || []
  return (
    <div className="user-profile">
      <div>Hello {user.username}!</div>
      {user.collectionCount <= 0 ? <div> no collections </div> : collectionArray.map((collection, index)=>{
        return <div key={index}>{collection.name}</div>
      })}
      </div>
  );
};

export default UserProfile;