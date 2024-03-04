import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Post from "../components/Post";
import "../css/OpenedPost.css";
import "../css/CommentSection.css";
import CommentSection from "../components/CommentSection";

function OpenedPost() {
  // Get id from URL
  let { id } = useParams();
  const [postObject, setPostObject] = useState({});
  const [likes, setLikes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // GET data for post and comments
    // Wait for all data to fetch before display it
    const fetchData = async () => {
      try {
        const [postResponse] = await Promise.all([
          axios.get(`http://localhost:3001/posts/byId/${id}`),
        ]);

        setPostObject(postResponse.data);
        setLikes(postResponse.data.Likes);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [id]);

  return (
    <div className="post-page">
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <Post
          title={postObject.title}
          content={postObject.postContent}
          username={postObject.username}
          date={postObject.createdAt}
          id={id}
          likes={likes}
          isOpened={true}
        />
      )}
      <CommentSection id={id} />
    </div>
  );
}

export default OpenedPost;
