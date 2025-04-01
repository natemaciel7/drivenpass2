import Cryptr from "cryptr";
import dotenv from "dotenv";
import * as credentialRepository from "../repositories/credentialRepository";

dotenv.config();
const cryptr = new Cryptr(process.env.CRYPT_SECRET!);

export async function createCredential(
  userId: number,
  title: string,
  url: string,
  username: string,
  password: string
) {
  const existing = await credentialRepository.findByTitleAndUserId(
    title,
    userId
  );
  if (existing) throw { type: "conflict", message: "Título já existe" };

  const encryptedPassword = cryptr.encrypt(password);

  return credentialRepository.create({
    title,
    url,
    username,
    password: encryptedPassword,
    userId,
  });
}

export async function getCredentials(userId: number, id?: number) {
  if (id) {
    const credential = await credentialRepository.findById(id);
    if (!credential || credential.userId !== userId)
      throw { type: "not_found", message: "Credencial não encontrada" };

    return {
      ...credential,
      password: cryptr.decrypt(credential.password),
    };
  }

  const credentials = await credentialRepository.findAll(userId);
  return credentials.map((c) => ({
    ...c,
    password: cryptr.decrypt(c.password),
  }));
}

export async function updateCredential(
  userId: number,
  id: number,
  data: { title: string; url: string; username: string; password: string }
) {
  const credential = await credentialRepository.findById(id);
  if (!credential || credential.userId !== userId)
    throw { type: "not_found", message: "Credencial não encontrada" };

  const encryptedPassword = cryptr.encrypt(data.password);
  await credentialRepository.update(id, {
    ...data,
    password: encryptedPassword,
  });
}

export async function deleteCredential(userId: number, id: number) {
  const credential = await credentialRepository.findById(id);
  if (!credential || credential.userId !== userId)
    throw { type: "not_found", message: "Credencial não encontrada" };

  await credentialRepository.remove(id);
}
