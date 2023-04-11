const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  boatId: { type: Number, required: true },
  latitude: { type: Number, required: true, default: 0 },
  longitude: { type: Number, required: true, default: 0 },
});

const User = mongoose.model("User", UserSchema);

module.exports = User;