import React from "react";
import "../css/NavigationMenu.css";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../helpers/AuthContext";
import { useContext } from "react";

function NavigationMenu() {
  const authState = useContext(AuthContext);
  console.log(authState);

  // Log out function
  const logout = () => {
    localStorage.removeItem("accessToken");
    authState.setAuthState(
      // ...authState means that we destructure object and now we can change certain value seperately
      { username: "", id: 0, status: false }
    );
  };

  return (
    <nav>
      <Link to="/" className="logo">
        <h1 className="logo">y.com</h1>
      </Link>
      <ul>
        {!authState.authState.status ? (
          <>
            <li>
              <Link to="/login">
                <button className="login-button">Login</button>
              </Link>
            </li>
            <li>
              <Link to="/registration" className="registration-button">
                Registration
              </Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/" className="home-button">
                Home
              </Link>
            </li>
            <li>
              <Link to="/create-post">
                <button className="create-post-button">Create Post</button>
              </Link>
            </li>
            <li>
              <Link onClick={logout} to={"/"} className="logout-button">
                Logout
              </Link>
            </li>
            <li>
              <Link
                to={`/profile/${authState.authState.id}`}
                className="profile-button"
              >
                {authState.authState.username}
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default NavigationMenu;
