const express = require("express");
const router = express.Router();
const { Comments } = require("../models");
const { validateToken } = require("../middlewares/AuthMiddleware");

// GET comments
router.get("/:postId", async (req, res) => {
  // Get post id
  const postId = req.params.postId;
  // Get all comments that match by post id
  const comments = await Comments.findAll({ where: { PostId: postId } });
  // Return post with certain id
  res.json(comments);
});

// POST comments
// Receive request, go through middleware to do all checks and if all is correct then continue
router.post("/", validateToken, async (req, res) => {
  // Access comment object with request
  const comment = req.body;
  // Access username with the request
  const username = req.user.username;
  // Add username to comment object
  comment.username = username;
  await Comments.create(comment);
  res.json(comment);
});

// DELETE comments
// Take comment id as an argument and also check if user token is valid, which means if the user is the person who post this comment
router.delete("/:commentId", validateToken, async (req, res) => {
  // Save commentId to variable
  const commentId = req.params.commentId;
  // Delete row from Comments table which id is equal to commentId
  await Comments.destroy({
    where: {
      id: commentId,
    },
  });
  return res.json("Deleted");
});

module.exports = router;
