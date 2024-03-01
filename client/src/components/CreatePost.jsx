import React from "react";
import "../css/CreatePost.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import TextField from "@mui/material/TextField";

function CreatePost() {
  let navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("accessToken")) {
      navigate("/login");
    }
  }, [navigate]);

  // On submit POST data
  const onSubmit = (event) => {
    event.preventDefault(); // Prevent the default form submission behavior
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());

    axios
      .post("http://localhost:3001/posts", data, {
        headers: { accessToken: localStorage.getItem("accessToken") },
      })
      .then((response) => {
        navigate("/");
      })
      .catch((error) => {
        console.error("Error creating post:", error);
      });
  };

  return (
    <div className="create-post-body">
      <div className="create-post">
        <form className="form" onSubmit={onSubmit}>
          <p>Post Title</p>
          <TextField fullWidth label="Title" name="title" id="title" />
          <p>Post Content</p>
          <TextField
            fullWidth
            name="postContent"
            id="postContent"
            label="Post"
            multiline
            rows={6}
          />
          <button type="submit">Create post</button>
        </form>
      </div>
    </div>
  );
}

export default CreatePost;
