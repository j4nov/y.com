const express = require("express");
const router = express.Router();
const { Posts, Likes } = require("../models");

router.get("/", async (req, res) => {
  // Join both tables
  const listOfPosts = await Posts.findAll({ include: [Likes] });
  // GET posts
  res.json(listOfPosts);
});

router.get("/byId/:id", async (req, res) => {
  // Get id
  const id = req.params.id;
  // Get post by id primary key
  const post = await Posts.findByPk(id, { include: [Likes] });
  // Return post with certain id
  res.json(post);
});

// Create post request
router.post("/", async (req, res) => {
  // Access data
  const post = req.body;
  // Call sequelize function to create, inserts data to table
  await Posts.create(post);
  // Return post
  res.json(post);
});

module.exports = router;
