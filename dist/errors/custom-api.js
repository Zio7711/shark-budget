import { StatusCodes } from "http-status-codes";
class CustomAPIError extends Error {
    status;
    constructor(message, status = StatusCodes.INTERNAL_SERVER_ERROR) {
        super(message);
        this.status = status;
    }
}
export default CustomAPIError;
