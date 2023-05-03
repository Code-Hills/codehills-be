/* eslint-disable quotes */
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import UserService from "./../../services/userService";
import Response from "../../system/helpers/Response";
import { getImageUrl } from "./../../system/helpers/getImage";

dotenv.config();
const { JWT_SECRET, FRONTEND_URL, EXPIRES_IN } = process.env;
/**
 * @class AuthController
 * @classdesc AuthController
 */
class AuthController {
  /**
   * Login Callback method.
   * @function loginCallback
   * @param {Object} req request Object.
   * @param {Object} res response Object.
   * @returns {Object} response Object.
   */
  static async loginCallback(req, res) {
    try {
      req.user.role = "developer";
      req.user.isLoggedIn = true;
      req.user.email = req.user?.email?.toLowerCase();
      const user = await UserService.findOrCreateUser(req.user);

      const createdUser = user.toJSON();
      const token = jwt.sign(createdUser, JWT_SECRET, {
        expiresIn: EXPIRES_IN,
      });
      const apiResponse = {
        status: 200,
        message: "Successfully logged in",
        data: { token },
      };
      const responseBuffer = await Buffer.from(JSON.stringify(apiResponse));
      // console.log("createdUser---", createdUser)
      return res.redirect(
        `${FRONTEND_URL}/?code=${responseBuffer.toString("base64")}`
      );
    } catch (error) {
      if (error.name === "SequelizeValidationError") {
        const apiResponse = {
          status: 422,
          message: error.errors[0].message,
          error: "Validation Error",
        };
        const responseBuffer = Buffer.from(JSON.stringify(apiResponse));
        return res.redirect(
          `${FRONTEND_URL}/?code=${responseBuffer.toString("base64")}`
        );
      }
      // in case the email is not authorized
      if (error.name === "Email not authorized") {
        const apiResponse = {
          status: 401,
          message: error.message,
          error: "Email not authorized",
        };
        const responseBuffer = Buffer.from(JSON.stringify(apiResponse));
        return res.redirect(
          `${FRONTEND_URL}/?code=${responseBuffer.toString("base64")}`
        );
      }
      const apiResponse = {
        status: 500,
        message: error.message,
        error: "Server Error",
      };
      const responseBuffer = Buffer.from(JSON.stringify(apiResponse));
      return res.redirect(
        `${FRONTEND_URL}/?code=${responseBuffer.toString("base64")}`
      );
    }
  }

  static async login(req, res) {
    try {
      const email = req.body.email?.toLowerCase();
      const userExist = await UserService.findOneUser({ email });
      if (!userExist) {
        return res.status(404).json({ message: "user not found!" });
      }

      if (!userExist.isActivated) {
        return res.status(403).json({ message: "user is not activated!" });
      }

      userExist.isLoggedIn = true;
      await UserService.updateUser({ isLoggedIn: true }, { email: email });
      const token = jwt.sign(userExist?.toJSON(), JWT_SECRET, {
        expiresIn: EXPIRES_IN,
      });

      return res.status(200).json({ message: "user logged in", token: token });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Server error", error: error.message });
    }
  }

  static async profile(req, res) {
    try {
      const { email } = req.user;
      const userExist = await UserService.findOneUser({ email });
      if (!userExist) {
        return Response.error(res, 404, {
          message: "The user not found!",
        });
      }
      userExist.avatar = userExist?.avatar?.startsWith("media-")
        ? getImageUrl(userExist?.avatar)
        : userExist?.avatar;
      return Response.success(res, 200, {
        message: "user profile retreived successfully",
        data: userExist,
      });
    } catch (error) {
      return Response.error(res, 500, {
        message: "server error",
        error: error.message,
      });
    }
  }

  static async logout(req, res) {
    try {
      const { email } = req.user;
      await UserService.updateUser({ isLoggedIn: false }, { email: email });
      return res.status(200).json({ message: "user logged out" });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ message: "Server error", error: error.message });
    }
  }
}

export default AuthController;
