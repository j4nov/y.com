module.exports = (sequelize, Datatypes) => {
  const Comments = sequelize.define("Comments", {
    commentContent: {
      type: Datatypes.STRING,
      allowNull: false,
    },
    username: {
      type: Datatypes.STRING,
      allowNull: false,
    },
  });

  // Return comment object
  return Comments;
};
