import { NextFunction, Request, Response } from "express";

export function handleErrors(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.error(err);

  if (err.type === "conflict") return res.status(409).send(err.message);
  if (err.type === "unauthorized") return res.status(401).send(err.message);
  if (err.type === "not_found") return res.status(404).send(err.message);
  if (err.type === "bad_request") return res.status(400).send(err.message);

  return res.status(500).send("Internal Server Error");
}
