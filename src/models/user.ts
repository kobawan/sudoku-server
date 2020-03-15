import { Schema, model, Document } from "mongoose";

interface Game {
  config: {
    gameType: number;
    difficulty: number;
    ratio: number;
    matrix: number[];
    mask: number[];
  };
  state: string;
}

interface User {
  game: Game;
}

interface UserModel extends User, Document {}

const UserSchema = new Schema<User>({
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

export default model<UserModel>("User", UserSchema);
