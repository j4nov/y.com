import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";

function Registration() {
  // Create initial values object for fields
  const initialValues = {
    username: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    // Username should be string and length should be at least 5 letters and maximum of 15 letters and is required
    username: Yup.string().min(5).max(15).required(),
    password: Yup.string().min(8).max(64).required(),
  });

  // API request function
  const onSubmit = (data) => {
    axios.post("http://localhost:3001/auth", data).then(() => {});
  };
  return (
    <div>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        <Form className="form">
          <label>Username: </label>
          <ErrorMessage name="username" component="span" />
          <Field
            autoComplete="off"
            id="inputCreatePost"
            name="username"
            placeholder="(Ex. John...)"
          />
          <label>Password: </label>
          <ErrorMessage name="password" component="span" />
          <Field
            autoComplete="off"
            id="inputCreatePost"
            name="password"
            placeholder="Password"
            type="password"
          />
          <button type="submit">Register</button>
        </Form>
      </Formik>
    </div>
  );
}

export default Registration;
