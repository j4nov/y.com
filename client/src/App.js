import "./App.css";
import CreatePost from "./components/CreatePost";
import Home from "./pages/Home";
import Layout from "./Layout";
import OpenedPost from "./pages/OpenedPost";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import { AuthContext } from "./helpers/AuthContext";
import { useState, useEffect } from "react";
import axios from "axios";
import NoPage from "./pages/NoPage";
import ProfilePage from "./pages/ProfilePage";
import ChangePassword from "./pages/ChangePassword";
import LandingPage from "./pages/LandingPage";

function App() {
  const [authState, setAuthState] = useState({
    username: "",
    id: 0,
    status: false,
  });

  useEffect(() => {
    axios
      .get("http://localhost:3001/auth/auth", {
        headers: { accessToken: localStorage.getItem("accessToken") },
      })
      .then((response) => {
        // Check if there is error with authentication, if there is then set authState to false, otherwise true
        if (response.data.error) {
          // ...authState means that we destructure object and now we can change certain value seperately
          setAuthState({ ...authState, status: false });
        } else {
          setAuthState({
            username: response.data.username,
            id: response.data.id,
            status: true,
          });
        }
      });
  }, []);

  return (
    <div className="App">
      <AuthContext.Provider value={{ authState, setAuthState }}>
        <Router>
          <Routes>
            <Route path="/" element={<Layout />}>
              {authState.status ? (
                <Route index element={<Home />} />
              ) : (
                <Route index element={<LandingPage />} />
              )}
              <Route path="/create-post" element={<CreatePost />} />
              <Route path="/post/:id" element={<OpenedPost />} />
              <Route path="/login" element={<Login />} />
              <Route path="/registration" element={<Registration />} />
              <Route path="/profile/:id" element={<ProfilePage />} />
              <Route path="/change-password" element={<ChangePassword />} />
              <Route path="*" element={<NoPage />} />
            </Route>
          </Routes>
        </Router>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
