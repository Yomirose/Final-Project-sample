const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");


const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
      type: String,
      required: true
  },
  // isAdmin: {
  //   type: boolean,
  //   default: false
  // },
},
  {timestamps: true }
);

userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) {
      return next();
    }
    try {
      const salt = await bcrypt.genSalt(10);
      this.password = await bcrypt.hash(this.password, salt);
      next();
    } catch (err) {
      next(err);
    }
  });

module.exports = mongoose.model("user", userSchema)