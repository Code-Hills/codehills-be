import express from "express";
import passport from "passport";
import { Strategy as MicrosoftStrategy } from "passport-microsoft";
import AuthController from "../controllers/authControllers";
import protect from "../middlewares";

const router = express.Router();
const { loginCallback } = AuthController;
const { HOST, CLIENTID, CLIENTSECRET } = process.env;

passport.use(
  new MicrosoftStrategy(
    {
      clientID: `${CLIENTID}`,
      clientSecret: `${CLIENTSECRET}`,
      callbackURL: `${HOST}/api/v1/auth/microsoft/callback`,
      scope: ["user.read"],
    },
    async (req, accessToken, refreshToken, profile, done) => {
      // Your code here
      const user = {
        microsoftId: profile.id,
        firstName: profile.name.givenName,
        lastName: profile.name.familyName,
        email: profile.emails[0].value,
        telephone: profile._json.mobilePhone,
        displayName: profile._json.displayName,
      };
      if (user) {
        return done(null, user);
      } else {
        return done(null, false, { message: "Authentication failed" });
      }
    }
  )
);
passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));

router.get("/microsoft", passport.authenticate("microsoft"));

router.get(
  "/microsoft/callback",
  passport.authenticate("microsoft", {
    failureRedirect: "/login",
  }),
  loginCallback
);

router.post("/login", AuthController.login);
router.post("/logout", protect, AuthController.logout);

module.exports = { router, passport };
