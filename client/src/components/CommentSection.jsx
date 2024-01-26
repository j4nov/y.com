import { useState } from "react";
import React from "react";
import "../css/CommentSection.css";
import axios from "axios";

function CommentSection(comments, id) {
  const [newComment, setNewComment] = useState("");
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
            accessToken: sessionStorage.getItem("accessToken"),
          },
        }
      )
      .then((response) => {
        console.log("Comment addedf");
      });
  };
  return (
    <div className="comment-section">
      <div className="comments">
        {comments.comments.map((comment, key) => {
          return (
            <div className="comment" key={key}>
              {comment.commentContent}
            </div>
          );
        })}
      </div>
      <div className="add-comment">
        {/* Take value from input and set it to state */}
        <input
          type="text"
          placeholder="Add comment..."
          autoComplete="off"
          onChange={(event) => {
            setNewComment(event.target.value);
          }}
        />
        <button onClick={addComment}>Add comment</button>
      </div>
    </div>
  );
}

export default CommentSection;
