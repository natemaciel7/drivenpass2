import { Request, Response } from "express";
import * as authService from "../services/authService";

export async function signUp(req: Request, res: Response) {
  const { name, email, password } = req.body;
  await authService.signUp(name, email, password);
  res.sendStatus(201);
}

export async function signIn(req: Request, res: Response) {
  const { email, password } = req.body;
  const token = await authService.signIn(email, password);
  res.status(200).send({ token });
}
