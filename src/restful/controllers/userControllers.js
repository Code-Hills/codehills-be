import Response from "./../../system/helpers/Response";
import DB from "./../../database";
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
}
