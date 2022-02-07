const express = require("express");

const router = express.Router();

const {
  register,
  login,
  updateUser,
} = require("../controllers/authController.js");

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/update-user").patch(updateUser);

module.exports = router;
