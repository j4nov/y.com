import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../helpers/AuthContext";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import "../css/Login.css";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginStatus, setLoginStatus] = useState(null);
  const { setAuthState } = useContext(AuthContext);
  const navigate = useNavigate();

  const login = () => {
    // Check if username and password are not empty
    if (!username.trim() || !password.trim()) {
      setLoginStatus("error");
      return;
    }

    const data = { username: username, password: password };
    axios
      .post("http://localhost:3001/auth/login", data)
      .then((response) => {
        if (response.data.error) {
          setLoginStatus("error");
        } else {
          localStorage.setItem("accessToken", response.data.token);
          setAuthState({
            username: response.data.username,
            id: response.data.id,
            status: true,
          });
          setLoginStatus("success");
          navigate("/");
        }
      })
      .catch((error) => {
        console.error("Login error:", error);
        setLoginStatus("error");
      });
  };

  useEffect(() => {
    if (loginStatus !== null) {
      const timeoutId = setTimeout(() => {
        setLoginStatus(null);
      }, 3000);

      return () => {
        clearTimeout(timeoutId);
      };
    }
  }, [loginStatus]);

  return (
    <div className="login-page">
      <div className="body">
        <form action="">
          <h2>Login</h2>
          <TextField
            fullWidth
            label="Username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
          <p></p>
          <TextField
            fullWidth
            label="Password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          <Button variant="contained" color="primary" onClick={login}>
            Login
          </Button>
          {loginStatus === "error" && (
            <Typography variant="body1" style={{ color: "red" }}>
              Invalid username or password. Please try again.
            </Typography>
          )}
          {loginStatus === "success" && (
            <Typography variant="body1" style={{ color: "green" }}>
              Login successful!
            </Typography>
          )}
        </form>
      </div>
    </div>
  );
}

export default Login;
