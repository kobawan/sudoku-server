import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  game: {
    config: {
      gameType: Number,
      difficulty: Number,
      ratio: Number,
      matrix: [Number],
      mask: [Number],
    },
    state: String,
  },
});

export default mongoose.model("User", UserSchema);
