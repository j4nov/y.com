module.exports = (sequelize, Datatypes) => {
  const Users = sequelize.define("Users", {
    username: {
      type: Datatypes.STRING,
      allowNull: false,
    },
    password: {
      type: Datatypes.STRING,
      allowNull: false,
    },
  });

  //   // Association between user and posts
  //   Users.associate = (models) => {
  //     Users.hasMany(models.Posts, {
  //         onDelete: "cascade"
  //     })
  //   }

  // User has many likes
  Users.associate = (models) => {
    Users.hasMany(models.Likes, {
      // If post is deleted then all likes related to this post is also deleted
      onDelete: "cascade",
    });

    // User has many posts
    Users.hasMany(models.Posts, {
      // If post is deleted then all likes related to this post is also deleted
      onDelete: "cascade",
    });
  };

  // Return users object
  return Users;
};
