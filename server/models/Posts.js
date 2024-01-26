module.exports = (sequelize, Datatypes) => {
  const Posts = sequelize.define("Posts", {
    title: {
      type: Datatypes.STRING,
      allowNull: false,
    },
    postContent: {
      type: Datatypes.STRING,
      allowNull: false,
    },
    username: {
      type: Datatypes.STRING,
      allowNull: false,
    },
  });

  // Association between post and comments
  // Post has many likes and comments
  Posts.associate = (models) => {
    Posts.hasMany(models.Comments, {
      // If post is deleted then all comments related to this post is also deleted
      onDelete: "cascade",
    });
    Posts.hasMany(models.Likes, {
      // If post is deleted then all likes related to this post is also deleted
      onDelete: "cascade",
    });
  };

  // Return post object
  return Posts;
};
