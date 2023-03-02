/* eslint-disable quotes */
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import userService from "./../../services/userService";

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
      const user = await userService.findOrCreateUser(req.user);

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
        `${FRONTEND_URL}/login?code=${responseBuffer.toString("base64")}`
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
          `${FRONTEND_URL}/login?code=${responseBuffer.toString("base64")}`
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
          `${FRONTEND_URL}/login?code=${responseBuffer.toString("base64")}`
        );
      }
      console.log("ERrooo---", error.message);
      const apiResponse = {
        status: 500,
        message: error.message,
        error: "Server Error",
      };
      const responseBuffer = Buffer.from(JSON.stringify(apiResponse));
      return res.redirect(
        `${FRONTEND_URL}/login?code=${responseBuffer.toString("base64")}`
      );
    }
  }
}

export default AuthController;
