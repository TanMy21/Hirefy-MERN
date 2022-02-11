const jwt = require("jsonwebtoken");

module.exports = async function auth(req, res, next) {
  // check header
  const authHeader = req.headers.authorization;
  console.log(authHeader)
  if (!authHeader || !authHeader.startsWith("Bearer")) {
    throw new UnauthenticatedError("Authentication invalid");
  }
  const token = authHeader.split(" ")[1];

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    // console.log(payload)
    // attach the user request object
    // req.user = payload
    req.user = { userId: payload.userId };
    next();
  } catch (error) {
    res.json({message:'Authentication Invalid'})
  }
};
