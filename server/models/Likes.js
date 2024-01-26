module.exports = (sequelize, Datatypes) => {
  const Likes = sequelize.define("Likes");

  // Return comment object
  return Likes;
};
