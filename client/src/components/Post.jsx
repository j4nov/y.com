import { useState } from "react";
import "../css/Post.css";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../helpers/AuthContext";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Fab from "@mui/material/Fab";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import EditIcon from "@mui/icons-material/Edit";
import EditOrDeletePost from "./EditOrDeletePost";
import OutsideClickHandler from "../helpers/OutsideClickHandler";

function Post({
  title,
  content,
  username,
  id,
  date,
  likes,
  isOpened,
  authorId,
}) {
  const [likesCount, setLikesCount] = useState(likes.length);
  const { authState } = useContext(AuthContext);
  const createdAtDate = new Date(date);
  // Check if user id is in likes list objects and if it is, then initial value is true, otherwise false
  const [isLikedByCurrentUser, setIsLikedByCurrentUser] = useState(
    likes.map((like) => like.UserId).includes(authState.id)
  );
  // Handle modal
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  let navigate = useNavigate();

  const handleOutsideClick = () => {
    // Logic to handle click outside the component
    handleClose();
  };

  const theme = createTheme({
    palette: {
      blue: {
        main: "#6CD3FF",
        light: "#ffffff",
        dark: "#47C8FF",
        contrastText: "#ffffff",
      },
    },
  });

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
          <div className="profile-pic"></div>
          <div className="name-and-date">
            <Link to={`/profile/${authorId}`} className="user">
              @{username}
            </Link>
            <p className="date">{formattedCreatedAt}</p>
          </div>
        </div>
        <div
          className="post-body"
          onClick={() => {
            navigate(`/post/${id}`);
          }}
        >
          <h2>{title}</h2>
          <p>{content}</p>
        </div>
        <div className="footer">
          <div className="likes">
            <p>Likes: {likesCount}</p>
          </div>
          {isLikedByCurrentUser ? (
            <>
              <ThemeProvider theme={theme}>
                <Fab aria-label="like" onClick={() => likeAPOST(id)}>
                  <FavoriteIcon />
                </Fab>
              </ThemeProvider>
            </>
          ) : (
            <>
              <ThemeProvider theme={theme}>
                <Fab
                  aria-label="like"
                  color="blue"
                  onClick={() => likeAPOST(id)}
                >
                  <FavoriteIcon />
                </Fab>
              </ThemeProvider>
            </>
          )}
          {authState.username === username && isOpened && (
            <>
              <Fab onClick={handleOpen}>
                <EditIcon></EditIcon>
              </Fab>
            </>
          )}
        </div>
        <OutsideClickHandler onOutsideClick={handleOutsideClick}>
          {open && (
            <EditOrDeletePost postId={id} setOpen={setOpen} open={open} />
          )}
        </OutsideClickHandler>
        {/* Background Overlay */}
        {open && <div className="background" onClick={setOpen}></div>}
      </div>
    </>
  );
}

export default Post;
