const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  stats: {
    totalGames: { type: Number, default: 0 },
    totalWins: { type: Number, default: 0 },
    totalLosses: { type: Number, default: 0 },
    totalTies: { type: Number, default: 0 },
    // winStreak: { type: Number, default: 0 },
  },
});

module.exports = mongoose.model("User", UserSchema);
