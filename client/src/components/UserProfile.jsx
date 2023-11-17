import React from "react";
import "./UserProfile.css";

const UserProfile = ({ userProfile }) => {
  // Placeholder image URL for now until we enable user uploads...
  const placeholderImage = "https://loremflickr.com/320/240";

  return (
    <div className="user-profile">
      <img
        src={userProfile.profilePicture || placeholderImage}
        alt="Profile"
        className="profile-image"
      />
      <div className="user-info">
        <textarea
          placeholder="Description of your collections/interests..."
          defaultValue={userProfile.collectionNote}
        ></textarea>
      </div>
    </div>
  );
};

export default UserProfile;