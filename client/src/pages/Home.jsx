import React, { useContext } from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import Post from "../components/Post";
import "../css/Home.css";
import { AuthContext } from "../helpers/AuthContext";
import { useNavigate } from "react-router-dom";

function Home() {
  const [listOfPosts, setListOfPosts] = useState([]);
  const { authState } = useContext(AuthContext);
  let navigate = useNavigate();
  // Fetch list of all posts when user enters on page or page is refreshed
  // Empty array in useEffect renders once when page is refreshed
  useEffect(() => {
    // If user is not logged in then redirect user to login page
    if (!localStorage.getItem("accessToken")) {
      console.log(authState.status);
      navigate("/login");
    } else {
      axios.get("http://localhost:3001/posts").then((response) => {
        // Add data to list
        setListOfPosts(response.data);
      });
    }
  }, [authState.status, navigate]);

  return (
    <>
      <div className="home-body">
        <div className="links"></div>
        {/* Loop through list and display posts, value represents post object */}
        <div className="posts">
          {listOfPosts.map((value, key) => {
            return (
              <Post
                key={key}
                username={value.username}
                content={value.postContent}
                title={value.title}
                id={value.id}
                date={value.createdAt}
                likes={value.Likes}
                isOpened={false}
                authorId={value.UserId}
              />
            );
          })}
        </div>
        <div className="friends"></div>
      </div>
    </>
  );
}

export default Home;
