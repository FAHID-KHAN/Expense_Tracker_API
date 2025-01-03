const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const connection = require("./connection");
app_connection = connection;

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  budget: { type: Number, default: 0 },
});

//Hash password before saving

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

module.exports = mongoose.model("User", userSchema);
