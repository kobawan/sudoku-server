/* eslint-disable max-classes-per-file */
import { HTTPStatusCode } from "./codes";

export class UserNotFoundError extends Error {
  public readonly message = "User not found";
  public readonly status = HTTPStatusCode.NOT_FOUND;
  public readonly isValidationError = true;
}

export class UnknownError extends Error {
  public readonly message = "Unknown error";
  public readonly status = HTTPStatusCode.INTERNAL_SERVER_ERROR;
}

export class ValidationError extends Error {
  public readonly status = HTTPStatusCode.BAD_REQUEST;
  public readonly isValidationError = true;

  constructor(message: string) {
    super();
    this.message = message;
  }
}
