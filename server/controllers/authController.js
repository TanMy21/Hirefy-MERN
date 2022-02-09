const User = require("../models/User");
const errorHandlerMiddleware = require("../middleware/error-handler.js");


module.exports.register = async function (req, res, next) {
  try {
    const user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });

    const token = user.createJWT();

    res.status(201).json({
      user: {
        name: user.name,
        email: user.email,
        location: user.location,
      },
      token,
    });
  } catch (error) {
    next(error);
  }
};

module.exports.login = async function (req, res) {
  const { email, password } = req.body;
  if (!email || !password) {
    console.log("Please provide all values");
  }
  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    console.log("Invalid Credentials");
  }
  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    console.log("Invalid Credentials");
  }
  const token = user.createJWT();
  user.password = undefined;
  res.status(200).json({ user, token});
  res.send("login user");
};

module.exports.updateUser = async function (req, res) {
  res.send("updateUser");
};
