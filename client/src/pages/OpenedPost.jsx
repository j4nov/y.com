import React, { useContext, useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Post from "../components/Post";
import "../css/OpenedPost.css";
import "../css/CommentSection.css";
import { AuthContext } from "../helpers/AuthContext";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import TextField from "@mui/material/TextField";
import SendIcon from "@mui/icons-material/Send";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";

function OpenedPost() {
  // Get id from URL
  let { id } = useParams();
  const [postObject, setPostObject] = useState({});
  // comments is list of all comments which are related to certain post
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const { authState } = useContext(AuthContext);
  const [likes, setLikes] = useState([]);
  const createdAtDate = new Date(postObject.createdAt);
  const containerRef = useRef();

  // Scroll down to the bottom of the container when the comments list changes
  useEffect(() => {
    containerRef.current.scrollTop = containerRef.current.scrollHeight;
  }, [comments]);

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

  const addComment = () => {
    axios
      .post(
        "http://localhost:3001/comments",
        {
          commentContent: newComment,
          PostId: id,
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
          console.log(response.data.error);
        } else {
          console.log(response.data);
          const commentToAdd = {
            commentContent: newComment,
            username: response.data.username,
          };
          console.log(commentToAdd);
          // Add comment to comments list
          setComments([...comments, commentToAdd]);
          setNewComment("");
        }
      });
  };

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

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // GET data for post and comments
    // Wait for all data to fetch before display it
    const fetchData = async () => {
      try {
        const [postResponse, commentsResponse] = await Promise.all([
          axios.get(`http://localhost:3001/posts/byId/${id}`),
          axios.get(`http://localhost:3001/comments/${id}`),
        ]);

        setPostObject(postResponse.data);
        setLikes(postResponse.data.Likes);
        setComments(commentsResponse.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [newComment]);

  return (
    <div className="post-page">
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <Post
          title={postObject.title}
          content={postObject.postContent}
          username={postObject.username}
          date={formattedCreatedAt}
          id={id}
          likes={likes}
        />
      )}
      <div className="comment-section">
        <div className="comments" ref={containerRef}>
          {comments.map((comment, key) => {
            console.log(comment);
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
            label="Comment"
            id="fullWidth"
            placeholder="Add comment..."
            autoComplete="off"
            onChange={(event) => {
              setNewComment(event.target.value);
            }}
          />
          <Button
            variant="contained"
            endIcon={<SendIcon />}
            onClick={addComment}
          >
            Send
          </Button>
        </div>
      </div>
    </div>
  );
}

export default OpenedPost;
