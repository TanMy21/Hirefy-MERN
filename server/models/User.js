const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide name"],
      minlength: 3,
      maxlength: 20,
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Please provide email"],
      validate: {
        validator: validator.isEmail,
      },
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please provide password"],
      minlength: 4,
      select: false,
    },
    location: {
      type: String,
      trim: true,
      maxlength: 20,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function () {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.createJWT = function () {
  return jwt.sign({ userId: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_LIFETIME,
  });
};


userSchema.methods.comparePassword = async function (candidatePassword) {
  const isMatch = await bcrypt.compare(candidatePassword, this.password)
  return isMatch
}

const User = mongoose.model("User", userSchema);
module.exports = User;
