import { Schema, model, Document } from "mongoose";
import validator from "validator";

interface User {
  gameConfig: {
    gameType: number;
    difficulty: number;
    ratio: number;
    matrix: number[];
    mask: number[];
  } | null;
  gameState: {
    cellMode: string;
    cellProps: string;
    gamePhase: number;
  } | null;
  username: string;
  password: string;
}

interface UserModel extends User, Document {}

const UserSchema = new Schema<User>({
  username: {
    type: String,
    required: [true, "A user must have a username"],
    unique: true,
    trim: true,
    maxlength: [20, "A username must have less or equal than 20 characters"],
    minlength: [2, "A username must have more or equal than 2 characters"],
    validator: [
      // TODO: doesnt work
      validator.isAlphanumeric,
      "A username must contain only characters or numbers",
    ],
  },
  password: {
    type: String,
    required: [true, "A user must have a password"],
    select: false,
  },
  gameConfig: {
    type: {
      gameType: Number,
      difficulty: Number,
      ratio: Number,
      matrix: [Number],
      mask: [Number],
    },
    default: null,
  },
  gameState: {
    type: {
      cellMode: String,
      cellProps: String,
      gamePhase: Number,
    },
    default: null,
  },
});

export default model<UserModel>("User", UserSchema);
