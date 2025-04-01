import { Request, Response } from "express";
import * as credentialService from "../services/credentialService";

export async function create(req: Request, res: Response) {
  const userId = res.locals.user.userId;
  const { title, url, username, password } = req.body;

  await credentialService.createCredential(
    userId,
    title,
    url,
    username,
    password
  );
  res.sendStatus(201);
}

export async function get(req: Request, res: Response) {
  const userId = res.locals.user.userId;
  const id = req.params.id ? Number(req.params.id) : undefined;

  const result = await credentialService.getCredentials(userId, id);
  res.status(200).send(result);
}

export async function update(req: Request, res: Response) {
  const userId = res.locals.user.userId;
  const id = Number(req.params.id);
  const { title, url, username, password } = req.body;

  await credentialService.updateCredential(userId, id, {
    title,
    url,
    username,
    password,
  });
  res.sendStatus(204);
}

export async function remove(req: Request, res: Response) {
  const userId = res.locals.user.userId;
  const id = Number(req.params.id);

  await credentialService.deleteCredential(userId, id);
  res.sendStatus(204);
}
