const express = require("express");
const authenticateUser = require("../middleware/auth.js");
const router = express.Router();

const {
  register,
  login,
  updateUser,
} = require("../controllers/authController.js");

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/update-user").patch(authenticateUser, updateUser);


module.exports = router;
