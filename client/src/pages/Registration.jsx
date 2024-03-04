import React, { useState, useEffect } from "react";
import axios from "axios";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import "../css/Registration.css";

function Registration() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [registrationStatus, setRegistrationStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate form fields
    const newErrors = {};
    if (formData.username.trim().length < 5) {
      newErrors.username = "Username must be at least 5 characters";
    }
    if (formData.password.trim().length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    if (Object.keys(newErrors).length === 0) {
      // No errors, submit form
      axios
        .post("http://localhost:3001/auth", formData)
        .then(() => {
          // Clear form after successful submission
          setFormData({ username: "", password: "" });
          // Set registration status
          setRegistrationStatus("success");
        })
        .catch(() => {
          // Set registration status to error
          setRegistrationStatus("error");
        });
    } else {
      // Update errors state
      setErrors(newErrors);
    }
  };

  useEffect(() => {
    if (registrationStatus === "success") {
      const timeoutId = setTimeout(() => {
        // Reset registration status after 3 seconds
        setRegistrationStatus(null);
      }, 3000);

      return () => {
        // Clear timeout on component unmount
        clearTimeout(timeoutId);
      };
    }
  }, [registrationStatus]);

  return (
    <div className="register-page">
      <div className="body">
        <form onSubmit={handleSubmit} className="form">
          {registrationStatus === "success" && (
            <p style={{ color: "green" }}>Registration successful!</p>
          )}
          {registrationStatus === "error" && (
            <p style={{ color: "red" }}>
              Registration failed. Please try again.
            </p>
          )}
          <label htmlFor="username">Username: </label>
          <TextField
            autoComplete="off"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Username"
            error={errors.username}
            helperText={errors.username}
          />
          <label htmlFor="password">Password: </label>
          <TextField
            autoComplete="off"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            type="password"
            error={errors.password}
            helperText={errors.password}
          />
          <Button type="submit" variant="contained">
            Register
          </Button>
        </form>
      </div>
    </div>
  );
}

export default Registration;
