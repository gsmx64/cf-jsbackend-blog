import { HttpException, HttpStatus } from '@nestjs/common';


/**
 * Custom error class that extends the built-in Error class.
 * Represents an error with a specific type and message.
 */
export class ErrorManager extends Error {
  /**
   * Creates an instance of ErrorManager.
   * @param type - The type of the error, which should be a valid HTTP status code.
   * @param message - The error message.
   */
  constructor({
    type,
    message,
  }: {
    type: keyof typeof HttpStatus;
    message: string;
  }) {
    super(`${type} :: ${message}`);
  }

  /**
   * Creates a signature error with the given message.
   * If the name is provided in the message, it throws an HttpException with the corresponding HTTP status code.
   * Otherwise, it throws an HttpException with the HTTP status code INTERNAL_SERVER_ERROR.
   * @param message - The error message.
   * @throws HttpException - If the name is provided, it throws an HttpException with the corresponding HTTP status code.
   *                        Otherwise, it throws an HttpException with the HTTP status code INTERNAL_SERVER_ERROR.
   */
  public static createSignatureError(message: string) {
    /*const name = message.split(' :: ')[0];
    if (name) {
      throw new HttpException(message, HttpStatus[name]);
    } else {
      throw new HttpException(message, HttpStatus.INTERNAL_SERVER_ERROR);
    }*/
  }
}