import { React } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import Banner from "../components/ProfilePageComponents/Banner";
import ProfileDescription from "../components/ProfilePageComponents/ProfileDescription";
import PostsWindow from "../components/ProfilePageComponents/PostsWindow";
import "../css/ProfilePage/ProfilePage.css";

function ProfilePage() {
  let { id } = useParams();
  const [username, setUsername] = useState("");
  const [listOfPosts, setListOfPosts] = useState([]);

  // Render page once when loaded
  // Make GET request
  useEffect(() => {
    axios.get(`http://localhost:3001/auth/info/${id}`).then((response) => {
      setUsername(response.data.username);
    });

    axios.get(`http://localhost:3001/posts/byUserId/${id}`).then((response) => {
      setListOfPosts(response.data);
      console.log(response.data);
    });
  }, [id]);

  return (
    <div className="profile-page">
      <Banner />
      <div className="user-body">
        <ProfileDescription username={username} />
        <div className="profile-description"></div>
      </div>
      <PostsWindow listOfPosts={listOfPosts} />
    </div>
  );
}

export default ProfilePage;
