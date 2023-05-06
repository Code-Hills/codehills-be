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

      if (!token) {
        return res.status(401).json({ error: "Not Authenticated!" });
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      const user = await UserService.findUserById(decoded.id);

      if (!user.isActivated)
        return res
          .status(401)
          .json({ error: "Not Authorized,User Account Is Not activated" });

      req.user = user;
      next();
    } catch (error) {
      console.log(error);
      return res.status(401).json({ error: "Not Authorized!" });
    }
  }
};
export default protect;
