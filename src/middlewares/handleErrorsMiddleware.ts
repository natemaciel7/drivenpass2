import { Request, Response, NextFunction } from "express";

export default function handleErrors(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
): void {
  console.error(err);

  if (err.type === "conflict") {
    res.status(409).send(err.message);
    return;
  }

  if (err.type === "unauthorized") {
    res.status(401).send(err.message);
    return;
  }

  if (err.type === "not_found") {
    res.status(404).send(err.message);
    return;
  }

  if (err.type === "bad_request") {
    res.status(400).send(err.message);
    return;
  }

  res.status(500).send("Internal Server Error");
}
