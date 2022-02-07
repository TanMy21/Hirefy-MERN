const User = require("../models/User");

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
  res.send("login user");
};

module.exports.updateUser = async function (req, res) {
  res.send("updateUser");
};
