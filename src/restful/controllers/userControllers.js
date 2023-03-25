import Response from "./../../system/helpers/Response";
import DB from "./../../database";
import UserService from "../../services/userService";
import { fileUploader } from "../../system/fileUploader";
import notificationService from "../../services/notificationService";
import sendEmail from "../../services/emailService";
const { User } = DB;
const { createNotification } = notificationService;

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
        return res.status(200).json({ message: "Retrieved all users", users });
      }
      return res.status(401).json({
        message: "Not authorized! Only admin can get a list of all users",
      });
    } catch (error) {
      return res.status(500).json({ message: "Server error" });
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
        const userNotification = {
          title: "Assigned new role!",
          description: `Your role have been updated to "${role}"`,
          url:
            process.env.NODE_ENV === "production"
              ? `${req.protocol}://${req.hostname}/api/v1/users/${userExist.id}`
              : `${req.protocol}://${req.hostname}:${process.env.PORT}/api/v1/users/${userExist.id}`,
          userId: userExist.id,
        };
        await createNotification(userNotification);
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

        const userNotification = {
          title: "Account deactivated!",
          description: `Your codehills account have been deactivated`,
          url:
            process.env.NODE_ENV === "production"
              ? `${req.protocol}://${req.hostname}/api/v1/users/${userExist.id}`
              : `${req.protocol}://${req.hostname}:${process.env.PORT}/api/v1/users/${userExist.id}`,
          userId: userExist.id,
        };
        await createNotification(userNotification);

        await sendEmail(
          userExist.email,
          "Codehills account deactivated!",
          `Hello ${userExist.displayName}, Your codehills account have been deactivated`,
          process.env.NODE_ENV === "production"
            ? `${req.protocol}://${req.hostname}/api/v1/users/${userExist.id}`
            : `${req.protocol}://${req.hostname}:${process.env.PORT}/api/v1/users/${userExist.id}`
        );

        const adminNotification = {
          title: "Account deactivated!",
          description: `You have deactivated ${userExist.displayName}'s account`,
          url:
            process.env.NODE_ENV === "production"
              ? `${req.protocol}://${req.hostname}/api/v1/users/${userExist.id}`
              : `${req.protocol}://${req.hostname}:${process.env.PORT}/api/v1/users/${userExist.id}`,
          userId: admin.id,
        };
        await createNotification(adminNotification);
        await sendEmail(
          admin.email,
          "Codehills account deactivated!",
          `Hello admin, You have deactivated ${userExist.displayName}'s codehills account`,
          process.env.NODE_ENV === "production"
            ? `${req.protocol}://${req.hostname}/api/v1/users/${userExist.id}`
            : `${req.protocol}://${req.hostname}:${process.env.PORT}/api/v1/users/${userExist.id}`
        );
        return res.status(200).json({
          message: "User deactivated successfully!",
        });
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

        const userNotification = {
          title: "Account activated!",
          description: `Your codehills account have been activated`,
          url:
            process.env.NODE_ENV === "production"
              ? `${req.protocol}://${req.hostname}/api/v1/users/${userExist.id}`
              : `${req.protocol}://${req.hostname}:${process.env.PORT}/api/v1/users/${userExist.id}`,
          userId: userExist.id,
        };
        await createNotification(userNotification);

        await sendEmail(
          userExist.email,
          "Codehills account activated!",
          `Hello ${userExist.displayName}, Your codehills account have been activated`,
          process.env.NODE_ENV === "production"
            ? `${req.protocol}://${req.hostname}/api/v1/users/${userExist.id}`
            : `${req.protocol}://${req.hostname}:${process.env.PORT}/api/v1/users/${userExist.id}`
        );

        const adminNotification = {
          title: "Account activated!",
          description: `You have activated ${userExist.displayName}'s account`,
          url:
            process.env.NODE_ENV === "production"
              ? `${req.protocol}://${req.hostname}/api/v1/users/${userExist.id}`
              : `${req.protocol}://${req.hostname}:${process.env.PORT}/api/v1/users/${userExist.id}`,
          userId: admin.id,
        };
        await createNotification(adminNotification);

        await sendEmail(
          admin.email,
          "Codehills account activated!",
          `Hello admin, You have activated ${userExist.displayName}'s codehills account`,
          process.env.NODE_ENV === "production"
            ? `${req.protocol}://${req.hostname}/api/v1/users/${userExist.id}`
            : `${req.protocol}://${req.hostname}:${process.env.PORT}/api/v1/users/${userExist.id}`
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

  static async update(req, res) {
    try {
      const { email } = req.user;
      const userExist = await UserService.findOneUser({ email });
      if (!userExist) {
        return Response.error(res, 404, {
          message: "The user you are trying to update is not found!",
        });
      }
      let obj = req.body;
      let avatar = req?.files
        ? fileUploader(req?.files?.avatar).fileName
        : userExist?.avatar;
      obj.avatar = avatar;

      obj.bank = req.body?.bank ? JSON.parse(obj.bank) : userExist?.bank;
      obj.bank.accountName = req.body?.bank.accountName
        ? obj.bank.accountName
        : userExist?.bank.accountName;
      obj.bank.BankName = req.body?.bank.BankName
        ? obj.bank.BankName
        : userExist?.bank.BankName;
      obj.bank.SwiftCode = req.body?.bank.SwiftCode
        ? obj.bank.SwiftCode
        : userExist?.bank.SwiftCode;
      obj.bank.Currency = req.body?.bank.Currency
        ? obj.bank.Currency
        : userExist?.bank.Currency;

      obj.address = req.body?.address
        ? JSON.parse(obj.address)
        : userExist?.address;
      obj.address.country = req.body?.address?.country
        ? obj.address?.country
        : userExist?.address?.country;
      obj.address.city = req.body?.address?.city
        ? obj.address?.city
        : userExist?.address?.city;
      obj.address.street = req.body?.address?.street
        ? obj.address?.street
        : userExist?.address?.street;

      await userExist.set(obj);
      await userExist.save();

      userExist.avatar = `${process.env.HOST}/uploads/${obj?.avatar}`;
      return Response.success(res, 200, {
        message: "profile updated successfully",
        data: userExist,
      });
    } catch (error) {
      return Response.error(res, 500, {
        message: "server error",
        error: error.message,
      });
    }
  }

  static async getUserById(req, res) {
    try {
      const { userId } = req.params;
      const userExist = await UserService.findUserById(userId);
      if (!userExist) {
        return res.status(404).json({ message: "User not found!" });
      }

      return res
        .status(200)
        .json({ message: "user retrieved successfully", user: userExist });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Server error" });
    }
  }
}
