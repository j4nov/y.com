import React from "react";
import Post from "../Post";
import "../../css/ProfilePage/PostsWindow.css";

function PostsWindow({ listOfPosts }) {
  console.log(listOfPosts);
  return (
    <div className="posts-window">
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
  );
}

export default PostsWindow;
