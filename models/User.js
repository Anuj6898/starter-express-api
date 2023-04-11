const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  latitude: { type: Number, required: true, default: 0 },
  longitude: { type: Number, required: true, default: 0 },
  boatId: { type: Number, required: true },
});

const User = mongoose.model("User", UserSchema);

module.exports = User;