/* eslint-disable no-undef */
import express from "express";
import dotenv from "dotenv";
import DB from "./database";
import router from "./restful/routes/index";
import { associate } from "./database/relationships";
dotenv.config();

const PORT = process.env.PORT || 4000;

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(router);

const initializeDatabase = async () => {
  await DB.sequelize.sync({
    force: false,
    alter: process.env.NODE_ENV !== "production",
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
