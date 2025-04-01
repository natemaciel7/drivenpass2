import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import * as userRepository from "../repositories/userRepository";

dotenv.config();

export async function signUp(name: string, email: string, password: string) {
  const existingUser = await userRepository.findByEmail(email);
  if (existingUser) throw { type: "conflict", message: "E-mail já cadastrado" };

  const hashedPassword = await bcrypt.hash(password, 10);
  await userRepository.createUser(name, email, hashedPassword);
}

export async function signIn(email: string, password: string) {
  const user = await userRepository.findByEmail(email);
  if (!user) throw { type: "not_found", message: "E-mail não cadastrado" };

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid)
    throw { type: "unauthorized", message: "Senha incorreta" };

  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, {
    expiresIn: "1h",
  });
  return token;
}
