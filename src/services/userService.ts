import { prisma } from "../config/database";
import * as userRepository from "../repositories/userRepository";

export async function deleteAccount(userId: number) {
  await prisma.credential.deleteMany({ where: { userId } });
  await userRepository.deleteUser(userId);
}
