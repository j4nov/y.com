import React, { useState } from "react";
import axios from "axios";

function ChangePassword() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  // PUT request for changing password
  const changePassword = () => {
    axios
      .put(
        "http://localhost:3001/auth/change-password",
        { oldPassword: oldPassword, newPassword: newPassword },
        { headers: { accessToken: localStorage.getItem("accessToken") } }
      )
      .then((response) => {
        if (response.data.error) {
          alert(response.data.error);
        }
      });
  };

  return (
    <div>
      <h1>Change password</h1>
      <input
        type="text"
        placeholder="Old Password"
        onChange={(event) => {
          setOldPassword(event.target.value);
        }}
      />
      <input
        type="text"
        placeholder="New Password"
        onChange={(event) => {
          setNewPassword(event.target.value);
        }}
      />
      <button
        onClick={() => {
          changePassword();
        }}
      >
        Save Changes
      </button>
    </div>
  );
}

export default ChangePassword;
