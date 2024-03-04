import React from "react";
import { Link } from "react-router-dom";
import "../../css/Buttons/RegisterButton.css";

const RegisterButton = () => {
  return (
    <Link to="/registration" className="registration-button">
      Registration
    </Link>
  );
};

export default RegisterButton;
