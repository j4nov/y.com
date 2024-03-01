import React from "react";
import "../css/LandingPage.css";
import RegisterButton from "../components/Buttons/RegisterButton";
import LoginButton from "../components/Buttons/LoginButton";

const LandingPage = () => {
  return (
    <div className="landing-page-body">
      <div className="body">
        <div className="landing-page-logo">
          <h1 className="logo">y.com</h1>
          <p className="slogan">Post, like and comment.</p>
        </div>
        <div className="buttons">
          <RegisterButton />
          <LoginButton />
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
