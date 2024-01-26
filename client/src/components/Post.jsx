import React, { useState } from "react";
import "../css/Post.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../helpers/AuthContext";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Fab from "@mui/material/Fab";

function Post({ title, content, username, id, date, likes }) {
  const [likesCount, setLikesCount] = useState(likes.length);
  const { authState } = useContext(AuthContext);
  const createdAtDate = new Date(date);
  // Check if user id is in likes list objects and if it is, then initial value is true, otherwise false
  const [isLikedByCurrentUser, setIsLikedByCurrentUser] = useState(
    likes.map((like) => like.UserId).includes(authState.id)
  );
  let navigate = useNavigate();

  const formattedCreatedAt = createdAtDate.toLocaleString("en-US", {
    hour12: false,
    timeZone: "UTC",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  });

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
          <p className="user">@{username}</p>
          <p>{formattedCreatedAt}</p>
        </div>
        <div
          className="body"
          onClick={() => {
            navigate(`/post/${id}`);
          }}
        >
          <h2>{title}</h2>
          <p>{content}</p>
        </div>
        <div className="post-buttons">
          <p>{likesCount}</p>
          {isLikedByCurrentUser ? (
            <>
              <Fab aria-label="like" onClick={() => likeAPOST(id)}>
                <FavoriteIcon />
              </Fab>
            </>
          ) : (
            <>
              <Fab
                aria-label="like"
                color="primary"
                onClick={() => likeAPOST(id)}
              >
                <FavoriteIcon />
              </Fab>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default Post;
