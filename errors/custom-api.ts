import { StatusCodes } from "http-status-codes";
class CustomAPIError extends Error {
  status: number;
  constructor(
    message: string,
    status: number = StatusCodes.INTERNAL_SERVER_ERROR
  ) {
    super(message);
    this.status = status;
  }
}

export default CustomAPIError;
