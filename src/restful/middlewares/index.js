import jwt from "jsonwebtoken";
import UserService from "../../services/userService";

const protect = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      const user = await UserService.findUserById(decoded.id);
      if (!user.isLoggedIn)
        return res
          .status(401)
          .json({ message: "Not Authorized, Not logged in" });

      if (!user.isActivated)
        return res
          .status(401)
          .json({ message: "Not Authorized,User Account Is Not activated" });

      req.user = user;
      next();
    } catch (error) {
      console.log(error);
      res.status(401).json({ message: "Not Authorized!" });
    }
  }
  if (!token) {
    res.status(401).json({ message: "Not Authenticated!" });
  }
};
export default protect;
