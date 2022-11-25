import { UnauthenticatedError } from "../errors/index.js";
const checkPermissions = (requestUser, resourceUserId) => {
    if (requestUser === resourceUserId.toString())
        return;
    throw new UnauthenticatedError("You are not authorized to perform this action.");
};
export default checkPermissions;
