const { verify } = require("jsonwebtoken");

// Grab JWT token, check if this valid, if it is valid then continue with request
const validateToken = (req, res, next) => {
  const accessToken = req.header("accessToken");
  // Check if there is token
  if (!accessToken) return res.json({ error: "User not logged in!" });
  try {
    // Verify accessToken and compare it with the secret with which it was made
    const validToken = verify(accessToken, "thatmustbesecret");
    // To access username whenever we make request
    req.user = validToken;
    // Check if validToken is true and if is then move forward with the request
    if (validToken) {
      return next();
    }
  } catch (err) {
    return res.json({ error: err });
  }
};

module.exports = { validateToken };
