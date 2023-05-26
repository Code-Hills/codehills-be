import Response from "../../system/helpers/Response";

const allowedRole = (roles) => {
  return (req, res, next) => {
    const userRole = req.user.role;
    if (roles.includes(userRole)) {
      next();
    } else {
      return Response.error(res, 403, {
        message: "You are not allowed to perform this action",
      });
    }
  };
};
export default allowedRole;
