const User = require("../models/User");
const errorHandlerMiddleware = require("../middleware/error-handler.js");
const { BadRequestError, UnAuthenticatedError } = require('../errors/index.js')



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
    throw new BadRequestError("Please provide all values");
  }
  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    throw new UnAuthenticatedError("Invalid Credentials");
  }
  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new UnAuthenticatedError("Invalid Credentials");
  }
  const token = user.createJWT();
  user.password = undefined;
  res.status(StatusCodes.OK).json({ user, token, location: user.location });
};

module.exports.updateUser = async function (req, res) {
  res.send("updateUser");
};
