import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import "../css/CreatePost.css";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function CreatePost() {
  let navigate = useNavigate();
  // Create initial values object for fields
  const initialValues = {
    title: "",
    postContent: "",
    username: "",
  };

  const validationSchema = Yup.object().shape({
    // Title should be string and it should be required
    title: Yup.string().required("You must input a title!"),
    // Post content should be string and is required
    postContent: Yup.string().required("You must input a content"),
    // Username should be string and length should be at least 5 letters and maximum of 15 letters and is required
    username: Yup.string().min(5).max(15).required(),
  });

  // On submit POST data
  const onSubmit = (data) => {
    axios.post("http://localhost:3001/posts", data).then((response) => {
      navigate("/");
    });
  };

  return (
    <div className="create-post">
      <h2 className="header">Create a post</h2>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        <Form className="form">
          <label>Title: </label>
          <ErrorMessage name="title" component="span" />
          <Field
            autoComplete="off"
            id="inputCreatePost"
            name="title"
            placeholder="(Ex. Hello world!)"
          />
          <label>Post: </label>
          <ErrorMessage name="postContent" component="span" />
          <Field
            autoComplete="off"
            id="inputCreatePost"
            name="postContent"
            placeholder="Type here..."
          />
          <label>Username: </label>
          <ErrorMessage name="username" component="span" />
          <Field
            autoComplete="off"
            id="inputCreatePost"
            name="username"
            placeholder="(Ex. John...)"
          />
          <button type="submit">Create post</button>
        </Form>
      </Formik>
    </div>
  );
}

export default CreatePost;
