import React from "react";
import "../../css/Buttons/LoginButton.css";
import { Link } from "react-router-dom";

const LoginButton = () => {
  return (
    <Link to="/login">
      <button className="login-button">Login</button>
    </Link>
  );
};

export default LoginButton;
