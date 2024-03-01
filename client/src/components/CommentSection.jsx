import { useState, useEffect, useRef, useContext } from "react";
import React from "react";
import "../css/CommentSection.css";
import axios from "axios";
import TextField from "@mui/material/TextField";
import SendIcon from "@mui/icons-material/Send";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import { IconButton } from "@mui/material";
import { AuthContext } from "../helpers/AuthContext";
import DeleteIcon from "@mui/icons-material/Delete";

function CommentSection(data) {
  const [newComment, setNewComment] = useState("");
  const isInputValid = newComment.length >= 1 && newComment.length <= 5;
  const containerRef = useRef();
  const { authState } = useContext(AuthContext);
  const [comments, setComments] = useState([data]);

  // Scroll down to the bottom of the container when the comments list changes
  const goToBottom = () => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    goToBottom();
  }, [comments]);

  // Send comment when key is pressed
  const handleKeyPress = (e) => {
    if (e.key === "Enter" && isInputValid) {
      addComment();
    }
  };

  // GET data for post and comments
  // Wait for all data to fetch before display it
  const fetchData = async () => {
    try {
      const [commentsResponse] = await Promise.all([
        axios.get(`http://localhost:3001/comments/${data.id}`),
      ]);
      setComments(commentsResponse.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Add comment function
  const addComment = () => {
    axios
      .post(
        "http://localhost:3001/comments",
        {
          commentContent: newComment,
          PostId: data.id,
        },
        {
          headers: {
            accessToken: localStorage.getItem("accessToken"),
          },
        }
      )
      .then((response) => {
        // Check if response is error, otherwise add comment to UI
        if (response.data.error) {
        } else {
          const commentToAdd = {
            commentContent: newComment,
            username: response.data.username,
          };
          // Add comment to comments list
          setComments([...comments, commentToAdd]);
          setNewComment("");
          fetchData();
          // Scroll to the bottom of the comments container
          containerRef.current.scrollTop = containerRef.current.scrollHeight;
        }
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Delete comment
  const deleteComment = (id) => {
    if (id) {
      // Make axios delete request, pass id and token as an arguments
      axios
        .delete(`http://localhost:3001/comments/${id}`, {
          headers: { accessToken: localStorage.getItem("accessToken") },
        })
        .then(() => {
          // Filter comment out from comment list by id
          setComments(
            comments.filter((val) => {
              return val.id !== id;
            })
          );
        });
    }
  };

  return (
    <div className="comment-section">
      <div className="comments" ref={containerRef}>
        {comments.map((comment, key) => {
          return (
            <div className="comment" key={key}>
              <div className="profile-picture">
                <Avatar alt="Remy Sharp" src="" />
              </div>

              <div className="name-and-comment">
                <div className="header">
                  <h3>@{comment.username}</h3>
                </div>
                <div className="body">
                  <p>{comment.commentContent}</p>
                </div>
              </div>
              <div className="footer">
                {/* Delete button is displayed only if username matches with the comment author's username */}
                {authState.username === comment.username && (
                  <IconButton
                    aria-label="delete"
                    size="large"
                    onClick={() => {
                      deleteComment(comment.id);
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                )}
              </div>
            </div>
          );
        })}
      </div>
      <div className="add-comment">
        {/* Take value from input and set it to state */}
        <TextField
          fullWidth
          value={newComment}
          id="outlined-multiline-flexible"
          label="Comment"
          autoComplete="off"
          multiline
          maxRows={4}
          onChange={(event) => {
            setNewComment(event.target.value);
          }}
          onKeyDown={handleKeyPress}
          error={isInputValid}
          helperText={
            !isInputValid ? "" : "Comment must be at least 5 characters"
          }
        />
        <Button
          variant="contained"
          endIcon={<SendIcon />}
          onClick={addComment}
          disabled={newComment.length < 5}
        >
          Send
        </Button>
      </div>
    </div>
  );
}

export default CommentSection;
