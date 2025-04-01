import { Request, Response, NextFunction } from "express";

export function validateIdParam(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { id } = req.params;
  const numberId = Number(id);

  if (!numberId || numberId <= 0) {
    return res.status(400).send("Invalid ID");
  }

  next();
}
