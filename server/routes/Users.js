const express = require("express");
const router = express.Router();
const { Users } = require("../models");
const bcrypt = require("bcrypt");
const { sign } = require("jsonwebtoken");
const { validateToken } = require("../middlewares/AuthMiddleware");

// Registration logic
router.post("/", async (req, res) => {
  // Take username and password individually to make changes to password
  const { username, password } = req.body;
  // Hash the password and post data to db
  bcrypt.hash(password, 10).then((hash) => {
    Users.create({
      username: username,
      password: hash,
    });
    res.json("Success");
  });
});

// Login logic
router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  // Check if username is in database by going to Users table and searching username in username column
  // Save username object in user const
  // If there will not be user then user will be empty
  const user = await Users.findOne({ where: { username: username } });
  // Check if user is empty
  if (!user) res.json({ error: "User does not exist!" });

  bcrypt.compare(password, user.password).then((match) => {
    // If match is false, then return error, otherwise not
    if (!match) return res.json({ error: "Wrong password for this username!" });
    // Generate JWT with username and id
    const accessToken = sign(
      { username: user.username, id: user.id },
      "thatmustbesecret"
    );
    // Return token, username and user id
    return res.json({ token: accessToken, username: username, id: user.id });
  });
});

// Check if token is valid
router.get("/auth", validateToken, (req, res) => {
  res.json(req.user);
});

// Get data about user
router.get("/info/:id", async (req, res) => {
  const id = req.params.id;
  // Get all data except password
  const info = await Users.findByPk(id, {
    attributes: { exclude: ["password"] },
  });
  res.json(info);
});

// Change password
router.put("/change-password", validateToken, async (req, res) => {
  // Get old and new password
  const { oldPassword, newPassword } = req.body;
  // Get user object from table by searching with username from validateToken
  const user = await Users.findOne({ where: { username: req.user.username } });
  // Compare password in table with the old password
  bcrypt.compare(oldPassword, user.password).then((match) => {
    // If match is false, then return error, otherwise not
    if (!match) return res.json({ error: "Wrong password entered!" });

    bcrypt.hash(newPassword, 10).then((hash) => {
      // Pass hash value as a new password to the table
      Users.update(
        { password: hash },
        { where: { username: req.user.username } }
      );
      res.json("Success");
    });
  });
});

module.exports = router;
