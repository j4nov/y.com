const express = require("express");
const router = express.Router();
const { Posts, Likes } = require("../models");
const { validateToken } = require("../middlewares/AuthMiddleware");

router.get("/", async (req, res) => {
  // Join both tables
  const listOfPosts = await Posts.findAll({ include: [Likes] });
  // GET posts
  res.json(listOfPosts);
});

// Get post by certain id
router.get("/byId/:id", async (req, res) => {
  // Get id
  const id = req.params.id;
  // Get post by id primary key
  const post = await Posts.findByPk(id, { include: [Likes] });
  // Return post with certain id
  res.json(post);
});

// Get post by certain user id
router.get("/byUserId/:id", async (req, res) => {
  // Get id
  const id = req.params.id;
  // Get all posts where user id is the same id from params and include Likes
  const listOfPosts = await Posts.findAll({
    where: { UserId: id },
    include: [Likes],
  });
  // Return posts with certain user id
  res.json(listOfPosts);
});

// Create post request
router.post("/", validateToken, async (req, res) => {
  // Access data
  const post = req.body;
  // Get username and add this to post object
  post.username = req.user.username;
  // Get user id
  post.UserId = req.user.id;
  // Call sequelize function to create, inserts data to table
  await Posts.create(post);
  // Return post
  res.json(post);
});

// Change post title
router.put("/title", validateToken, async (req, res) => {
  // Access data
  const { newTitle, id } = req.body;
  // Update the post title where id is equal to id
  await Posts.update({ title: newTitle }, { where: { id: id } });
  // Return post
  res.json(newTitle);
});

router.put("/content", validateToken, async (req, res) => {
  // Access data
  const { newContent, id } = req.body;
  // Update the post title where id is equal to id
  await Posts.update({ postContent: newContent }, { where: { id: id } });
  // Return post
  res.json(newContent);
});

// Delete post
router.delete("/:postId", validateToken, async (req, res) => {
  // Grab the id from URL
  const postId = req.params.postId;
  // Delete post with certain id
  await Posts.destroy({
    where: {
      id: postId,
    },
  });
  return res.json("Deleted");
});

module.exports = router;
