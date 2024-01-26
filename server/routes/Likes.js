const express = require("express");
const router = express.Router();
const { Likes } = require("../models");
const { validateToken } = require("../middlewares/AuthMiddleware");

// POST like
router.post("/", validateToken, async (req, res) => {
  // Grab PostId from body
  const { PostId } = req.body;
  // Grab UserId from middleware from token
  const UserId = req.user.id;

  // Check if user is already liked the post by searching in the table if there is row with exact same PostId and UserId
  const found = await Likes.findOne({
    where: { PostId: PostId, UserId: UserId },
  });
  // Create instance into table or delete instance from table
  if (!found) {
    await Likes.create({ PostId: PostId, UserId: UserId });
    return res.json({ liked: true });
  } else {
    await Likes.destroy({
      where: {
        PostId: PostId,
        UserId: UserId,
      },
    });
    return res.json({ liked: false });
  }
});

module.exports = router;
