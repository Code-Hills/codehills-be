import Response from "./../../system/helpers/Response";
import DB from "./../../database";
import UserService from "../../services/userService";
const { User } = DB;

export default class UserControllers {
  static async addUser(req, res) {
    try {
      const user = await User.create({ ...req.body });
      return Response.success(res, 201, {
        message: "user saved successfully",
        data: user,
      });
    } catch (error) {
      return Response.error(res, 500, {
        message: "Error adding user",
        error: error.message,
      });
    }
  }

  static async getAllUsers(req, res) {
    try {
      const users = await User.findAll();
      res.json(users);
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  }

  static async assignRoles(req, res) {
    try {
      const admin = req.user;
      console.log("RRRRREEEEEEEEQQQ", admin);
      if (admin && admin.role === "admin") {
        const { email, role } = req.body;
        const userExist = await UserService.findOneUser({ email });

        if (!userExist) {
          return res.status(404).json({
            message: "The user you are trying to update was not found!",
          });
        }

        if (userExist.role === "admin") {
          return res
            .status(403)
            .json({ message: "Admin can not be assigned another role" });
        }
        await User.update(
          { role: role },
          {
            where: { email: email },
            returning: true,
          }
        );
        return res
          .status(200)
          .json({ message: "Assigned a role successfully!" });
      }
      return res
        .status(401)
        .json({ message: "Not Authorized! Only admin can assign roles" });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Server error" });
    }
  }
}
