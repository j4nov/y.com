import React from "react";
import "../../css/ProfilePage/ProfileDescription.css";

function ProfileDescription(data) {
  return (
    <div className="profile-description">
      <div className="profile-picture">
        <div className="picture"></div>
        <button>Edit Profile</button>
      </div>
      <div className="name">
        <h1>firstName lastName</h1>
        <p>@{data.username}</p>
      </div>
      <div className="additional-info">
        <p>bio</p>
        <p>260 Followers</p>
      </div>
    </div>
  );
}

export default ProfileDescription;
