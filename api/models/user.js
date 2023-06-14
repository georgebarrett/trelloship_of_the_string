const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  username: { type: String, required: true },
  name: { type: String, required: true },
});

UserSchema.pre("save", async () => {
  this.password = await bcrypt.hash(this.password, 12);
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
