import Response from "../../system/helpers/Response";

const allowedReviewer = async (req, res, next) => {
  const allowedRoles = ["developer", "architect"];
  const loggedInUser = req.user;
  if (allowedRoles.includes(loggedInUser?.role)) {
    return next();
  }
  return Response.error(res, 403, {
    message: "your are not allowed to make review",
  });
};
export default allowedReviewer;
