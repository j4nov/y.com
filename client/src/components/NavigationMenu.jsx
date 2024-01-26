import React from "react";
import "../css/NavigationMenu.css";
import { Link } from "react-router-dom";
import { AuthContext } from "../helpers/AuthContext";
import { useContext } from "react";

function NavigationMenu() {
  const authState = useContext(AuthContext);

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
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/create-post">Create a post</Link>
        </li>
        {!authState.authState.status ? (
          <>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/registration">Registration</Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link onClick={logout}>Logout</Link>
            </li>
            <li>
              <Link>{authState.authState.username}</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default NavigationMenu;
