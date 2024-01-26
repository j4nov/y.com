const express = require("express");
const app = express();
const cors = require("cors");

// Parse data
app.use(express.json());

app.use(cors());

const db = require("./models");

// Routers
const postRouter = require("./routes/Posts");
app.use("/posts", postRouter);
const commentsRouter = require("./routes/Comments");
app.use("/comments", commentsRouter);
const usersRouter = require("./routes/Users");
app.use("/auth", usersRouter);
const likesRouter = require("./routes/Likes");
app.use("/likes", likesRouter);

// Go through every table in database and if there is not certain table, then create it
db.sequelize.sync().then(() => {
  // Listens port 3001
  app.listen(3001, () => {
    console.log("Server is running on port 3001.");
  });
});
