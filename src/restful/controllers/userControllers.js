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
      const admin = req.user;
      if (admin && admin.role === "admin") {
        const users = await User.findAll();
        res.status(200).json({ message: "Retrieved all users", users });
      }
      return res.status(401).json({
        message: "Not authorized! Only admin can get a list of all users",
      });
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  }

  static async assignRoles(req, res) {
    try {
      const admin = req.user;
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

        const validRoles = ["developer", "manager", "architect", "admin"];
        if (!validRoles.includes(role)) {
          return res.status(400).json({ message: "Invalid role" });
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
      console.error(error);
      return res.status(500).json({ message: "Server error" });
    }
  }

  static async getUserProjects(req, res) {
    try {
      const user = req.user;
      const { userId } = req.params;
      const userExist = await UserService.findUserById(userId);
      if (!userExist) {
        return res.status(404).json({ message: "User not found!" });
      }

      // Check if user is accessing their own projects
      if (user.id === userId || user.role === "admin") {
        const projects = await userExist.getProjects({
          attributes: ["name", "description", "startDate", "endDate"],
          through: {
            attributes: [],
          },
          joinTableAttributes: [],
        });
        return res.status(200).json({ message: "User Projects", projects });
      }

      // Return an error if user is not authorized to view the projects
      return res.status(401).json({
        message: "Not Authorized! You can only view your own projects.",
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Server error" });
    }
  }

  static async deactivateUser(req, res) {
    try {
      const admin = req.user;
      if (admin && admin.role === "admin") {
        const { email } = req.body;
        const userExist = await UserService.findOneUser({ email });
        if (!userExist) {
          return res.status(404).json({
            message: "The user you are trying to update was not found!",
          });
        }
        if (userExist.role === "admin") {
          return res
            .status(403)
            .json({ message: "Admin can not be deactivated" });
        }
        if (!userExist.isActivated) {
          return res
            .status(403)
            .json({ message: "User is already deactivated" });
        }
        await User.update(
          { isActivated: false },
          {
            where: { email: email },
            returning: true,
          }
        );
        return res
          .status(200)
          .json({ message: "User deactivated successfully!" });
      }
      return res
        .status(401)
        .json({ message: "Not Authorized! Only admin can deactivate user" });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Server error" });
    }
  }

  static async activateUser(req, res) {
    try {
      const admin = req.user;
      if (admin && admin.role === "admin") {
        const { email } = req.body;
        const userExist = await UserService.findOneUser({ email });
        if (!userExist) {
          return res.status(404).json({
            message: "The user you are trying to update was not found!",
          });
        }
        if (userExist.isActivated) {
          return res.status(403).json({ message: "User is already activated" });
        }
        await User.update(
          { isActivated: true },
          {
            where: { email: email },
            returning: true,
          }
        );
        return res
          .status(200)
          .json({ message: "User activated successfully!" });
      }
      return res
        .status(401)
        .json({ message: "Not Authorized! Only admin can activate user" });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Server error" });
    }
  }
}
