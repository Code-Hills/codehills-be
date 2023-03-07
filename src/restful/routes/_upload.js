import express, { Router } from "express";

const uploadRouter = Router();

uploadRouter.get("/:name", express.static("assets/uploads"));

export default uploadRouter;
