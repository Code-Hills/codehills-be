import bodyParser from "body-parser";
import express from "express";
import router from "./routes/index.js";
import dotenv from "dotenv";
import swaggerUi from "swagger-ui-express";
import swaggerDoc from "../src/documentation/swagger";
dotenv.config();

const PORT = process.env.PORT || 4000;

const app = express();

app.use(bodyParser.json());
app.use("/api", router);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDoc));

app.listen(PORT, () => {
  console.log(`The app is listening on port ${PORT}`);
});
