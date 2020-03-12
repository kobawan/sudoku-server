import { HTTPStatusCode } from "./codes";

export class UserNotFoundError extends Error {
  public readonly message = "User not found!";
  public readonly status = HTTPStatusCode.NOT_FOUND;

  constructor() {
    super();
  }
}

export class UnknownError extends Error {
  public readonly message = "Unknown error!";
  public readonly status = HTTPStatusCode.INTERNAL_SERVER_ERROR;

  constructor() {
    super();
  }
}

export class ValidationError extends Error {
  public readonly status = HTTPStatusCode.BAD_REQUEST;

  constructor(message: string) {
    super();
    this.message = `Validation error: ${message}`;
  }
}