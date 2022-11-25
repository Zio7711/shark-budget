import { StatusCodes } from "http-status-codes";
const ErrorHandlerMiddleware = (err, _, res, _2) => {
    let status = err.status || StatusCodes.INTERNAL_SERVER_ERROR;
    let message = err.message || "Something went wrong";
    if (err.name === "ValidationError") {
        status = StatusCodes.BAD_REQUEST;
        message = Object.values(err.errors)
            .map((val) => val.message)
            .join(" ");
    }
    if (err.code && err.code === 11000) {
        status = StatusCodes.BAD_REQUEST;
        message = `${Object.keys(err.keyValue)} already exists`;
    }
    // console.log(chalk.red(message));
    res.status(status).send({
        status,
        message,
    });
};
export default ErrorHandlerMiddleware;
