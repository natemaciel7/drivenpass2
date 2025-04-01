import { Router } from "express";

const healthRouter = Router();

healthRouter.get("/health", (req, res) => {
  res.status(200).send("I’m OK!");
});

export default healthRouter;
