import { Request, Response } from "express";
import argon2 from "argon2";

import UserModel from "../models/user";
import { Logger } from "../logger/logger";
import { UserNotFoundError, ValidationError } from "../errors/errors";
import { HTTPStatusCode } from "../errors/codes";

const isDuplicateNameError = (error: any) =>
  error.name === "MongoError" && error.code === 11000;

const isValidationError = (error: any) =>
  error.name === "ValidationError" ||
  isDuplicateNameError(error) ||
  !!error.isValidationError;

const validatePassword = async (username: string, password: string) => {
  const user = await UserModel.findOne({ username }).select("password");
  if (!user) {
    return false;
  }

  return argon2.verify(user.password, password);
};

const editErrorMessage = (error: any, username: string) => {
  if (isDuplicateNameError(error)) {
    return `The username '${username}' already exists`;
  }

  if (isValidationError(error)) {
    const splitMsg = error.message.split(":");
    return splitMsg[splitMsg.length - 1].trim();
  }

  return error.message;
};

export class UserController {
  public static async getUser(req: Request, res: Response): Promise<Response> {
    const { username, password } = req.body || {};

    try {
      const user = await UserModel.findOne({ username });
      if (!user) {
        throw new UserNotFoundError();
      }
      const validPassword = await validatePassword(username, password);
      if (!validPassword) {
        throw new ValidationError("Incorrect password");
      }

      return res.status(HTTPStatusCode.OK).json({
        type: "success",
        user,
      });
    } catch (error) {
      Logger.error("UserController - getUser:", error);

      return res.status(HTTPStatusCode.OK).json({
        type: "fail",
        message: editErrorMessage(error, username),
        isValidationError: isValidationError(error),
      });
    }
  }

  public static async registerUser(
    req: Request,
    res: Response
  ): Promise<Response> {
    const { username, password } = req.body || {};

    try {
      const user = await UserModel.create({
        username,
        password: await argon2.hash(password),
      });

      return res.status(HTTPStatusCode.CREATED).json({
        type: "success",
        user,
      });
    } catch (error) {
      Logger.error("UserController - registerUser:", error);
      const isValError = isValidationError(error);

      return res.status(HTTPStatusCode.OK).json({
        type: "fail",
        message: editErrorMessage(error, username),
        isValidationError: isValError,
      });
    }
  }

  public static async saveGame(req: Request, res: Response): Promise<Response> {
    try {
      const { state, config, id } = req.body;
      const user = await UserModel.findByIdAndUpdate(
        id,
        {
          gameState: state,
          gameConfig: config,
        },
        {
          new: true,
          runValidators: true,
        }
      );
      if (!user) {
        throw new UserNotFoundError();
      }

      return res.status(HTTPStatusCode.OK).json({
        type: "success",
      });
    } catch (error) {
      Logger.error("UserController - saveGame:", error);

      return res.status(HTTPStatusCode.OK).json({
        type: "fail",
        message: error.message,
      });
    }
  }
}
