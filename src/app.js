/* eslint-disable no-undef */
import bodyParser from "body-parser";
import express from "express";
import router from "./routes/index";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT || 4000;

const app = express();

app.use(bodyParser.json());
app.use("/api", router);

app.listen(PORT, () => {
  console.log(`The app is listening on port ${PORT}`);
});
