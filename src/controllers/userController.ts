import { Request, Response } from "express";
import * as userService from "../services/userService";

export async function deleteAccount(req: Request, res: Response) {
  const userId = res.locals.user.userId;

  await userService.deleteAccount(userId);
  res.sendStatus(204);
}
