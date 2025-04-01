import { prisma } from "../config/database";

export async function findByEmail(email: string) {
  return prisma.user.findUnique({ where: { email } });
}

export async function createUser(
  name: string,
  email: string,
  hashedPassword: string
) {
  return prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });
}

export async function deleteUser(id: number) {
  return prisma.user.delete({ where: { id } });
}
