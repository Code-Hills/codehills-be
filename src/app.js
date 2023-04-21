/* eslint-disable no-undef */
import express from "express";
import session from "express-session";
import dotenv from "dotenv";
import cors from "cors";
import DB from "./database";
import router from "./restful/routes/index";
import fileUploader from "express-fileupload";
import { associate } from "./database/relationships";
import { passport } from "./restful/routes/authRouters";
dotenv.config();

const PORT = process.env.PORT || 4000;

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(express.json());
app.use(
  session({
    secret: process.env.SESSION_KEY || "your-secret-key",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(
  fileUploader({
    fileSize: 50 * 1024 * 1024,
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);
app.use(router);

const initializeDatabase = async () => {
  await DB.sequelize.sync({
    force: false,
    // alter: process.env.NODE_ENV !== "production",
  });
  associate();
};

const start = () => {
  try {
    initializeDatabase();
    app.listen({ port: PORT }, () =>
      process.stdout.write(`http://localhost:${PORT} \n`)
    );
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};

start();

export default app;
