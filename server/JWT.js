const { sign, verify } = require("jsonwebtoken");

const createTokens = (seller) => {
  const acessToken = sign(
    { username: seller.username, id: seller.id },
    "jwtsecreatplschange"
  );
  return acessToken;
};

const validateToken = (req, res, next) => {
  const accessToken = req.cookies["acess-token"];

  if (!accessToken) {
    return res.status(401).json({ error: "User not authenticated." });
  }

  try {
    const validToken = verify(accessToken, "jwtsecreatplschange");
    req.user = validToken; // Attach decoded token data (e.g., seller ID) to the request
    next();
  } catch (error) {
    res.status(401).json({ error: "Invalid token." });
  }
};


module.exports = {createTokens,validateToken};