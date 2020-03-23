import { Request, Response } from "express";
import Joi from "@hapi/joi";

import UserModel from "../models/user";
import { Logger } from "../logger/logger";
import { UserNotFoundError, ValidationError } from "../errors/errors";

export class UserController {
  public static async getUser(req: Request, res: Response): Promise<Response> {
    try {
      const schema = Joi.object({ id: Joi.string() });
      const { error } = schema.validate(req.params, { presence: "required" });
      if (error) {
        throw new ValidationError(error.details[0].message);
      }

      const user = await UserModel.findById(req.params.id);
      if (!user) {
        throw new UserNotFoundError();
      }

      return res.json(user);
    } catch (error) {
      Logger.error("UserController - getUser:", error);

      return res.json({
        message: error.message,
        status: error.status,
      });
    }
  }

  public static async registerUser(
    _req: Request,
    res: Response
  ): Promise<Response> {
    try {
      const user = new UserModel();
      await user.save();

      return res.json(user.id);
    } catch (error) {
      Logger.error("UserController - registerUser:", error);

      return res.json({
        message: error.message,
        status: error.status,
      });
    }
  }

  public static async saveGame(req: Request, res: Response): Promise<Response> {
    try {
      const schema = Joi.object({
        id: Joi.string(),
        state: Joi.object({
          cellMode: Joi.string(),
          cellProps: Joi.string(),
          gamePhase: Joi.number(),
        }),
        config: Joi.object({
          gameType: Joi.number(),
          difficulty: Joi.number(),
          ratio: Joi.number(),
          matrix: Joi.array().items(Joi.number()),
          mask: Joi.array().items(Joi.number()),
        }),
      });
      const { error } = schema.validate(req.body, { presence: "required" });
      if (error) {
        throw new ValidationError(error.details[0].message);
      }

      const { state, config, id } = req.body;
      const user = await UserModel.findById(id);
      if (!user) {
        throw new UserNotFoundError();
      }

      user.game = {
        state,
        config,
      };
      await user.save();

      return res.json(null);
    } catch (error) {
      Logger.error("UserController - saveGame:", error);

      return res.json({
        message: error.message,
        status: error.status,
      });
    }
  }
}
