import React, { useState } from "react";
import "../css/Post.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../helpers/AuthContext";
import Button from "@mui/material-next/Button";
import { CssVarsProvider } from "@mui/material-next/styles";

function Post({ title, content, username, id, date, likes }) {
  const [likesCount, setLikesCount] = useState(likes.length);
  const { authState } = useContext(AuthContext);
  // Check if user id is in likes list objects and if it is, then initial value is true, otherwise false
  const [isLikedByCurrentUser, setIsLikedByCurrentUser] = useState(
    likes.map((like) => like.UserId).includes(authState.id)
  );
  let navigate = useNavigate();

  const likeAPOST = (postId) => {
    axios
      .post(
        "http://localhost:3001/likes",
        { PostId: postId },
        { headers: { accessToken: localStorage.getItem("accessToken") } }
      )
      .then((response) => {
        if (response.data.error) {
          alert("You must log in to like!");
        } else if (response.data.liked) {
          setLikesCount(likesCount + 1);
        } else {
          setLikesCount(likesCount - 1);
        }
        setIsLikedByCurrentUser(response.data.liked);
      });
  };

  return (
    <>
      <div className="post">
        <div className="header">
          <p className="user">{username}</p>
          <p>{date}</p>
        </div>
        <div
          className="body"
          onClick={() => {
            navigate(`/post/${id}`);
          }}
        >
          <h2 className="title">{title}</h2>
          <p className="content">{content}</p>
        </div>
        <div className="post-buttons">
          {isLikedByCurrentUser ? (
            <>
              <button onClick={() => likeAPOST(id)}>&lt;/3</button>
            </>
          ) : (
            <>
              <button onClick={() => likeAPOST(id)}>&lt;3</button>
            </>
          )}
          <p>{likesCount}</p>
        </div>
      </div>
    </>
  );
}

export default Post;
