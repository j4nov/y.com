import React from "react";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import "../css/EditOrDeletePost.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import { useState } from "react";

function EditOrDeletePost({ postId, setOpen }) {
  const [currentTitle, setCurrentTitle] = useState("");
  const [currentContent, setCurrentContent] = useState("");
  let navigate = useNavigate();

  const editPost = () => {
    axios.put(
      "http://localhost:3001/posts/title",
      { newTitle: currentTitle, id: postId },
      {
        headers: { accessToken: localStorage.getItem("accessToken") },
      }
    );
    axios.put(
      "http://localhost:3001/posts/content",
      { newContent: currentContent, id: postId },
      {
        headers: { accessToken: localStorage.getItem("accessToken") },
      }
    );
  };

  const deletePost = (id) => {
    axios
      .delete(`http://localhost:3001/posts/${id}`, {
        headers: { accessToken: localStorage.getItem("accessToken") },
      })
      .then(() => {
        navigate("/");
      });
  };

  const handleClick = () => {
    setOpen(false);
    editPost();
    window.location.reload();
  };

  return (
    <div className="popover">
      <h2>Edit Or Delete Post</h2>
      <div className="form">
        <div className="input">
          <TextField
            fullWidth
            value={currentTitle}
            id="outlined-multiline-flexible"
            label="New Title"
            autoComplete="off"
            multiline
            maxRows={4}
            onChange={(event) => {
              setCurrentTitle(event.target.value);
            }}
          />
        </div>
        <div className="input">
          <TextField
            fullWidth
            value={currentContent}
            id="outlined-multiline-flexible"
            label="New Content"
            autoComplete="off"
            multiline
            maxRows={8}
            onChange={(event) => {
              setCurrentContent(event.target.value);
            }}
          />
        </div>
      </div>
      <div className="buttons">
        <Button
          variant="outlined"
          onClick={() => {
            handleClick();
          }}
        >
          Save Changes
        </Button>
        <Button
          variant="outlined"
          startIcon={<DeleteIcon />}
          onClick={() => deletePost(postId)}
        >
          Delete
        </Button>
      </div>
    </div>
  );
}

export default EditOrDeletePost;
