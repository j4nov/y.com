import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import Post from "../components/Post";
import "../css/Home.css";

function Home() {
  const [listOfPosts, setListOfPosts] = useState([]);
  // Fetch list of all posts when user enters on page or page is refreshed
  // Empty array in useEffect renders once when page is refreshed
  useEffect(() => {
    axios.get("http://localhost:3001/posts").then((response) => {
      // Add data to list
      setListOfPosts(response.data);
      console.log(response.data);
    });
  }, []);

  return (
    // Loop through list and display posts, value represents post object
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
          />
        );
      })}
    </div>
  );
}

export default Home;
