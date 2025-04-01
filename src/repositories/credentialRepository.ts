import { prisma } from "../config/database";
import { Credential } from "@prisma/client";

export async function create(credential: Omit<Credential, "id">) {
  return prisma.credential.create({ data: credential });
}

export async function findAll(userId: number) {
  return prisma.credential.findMany({ where: { userId } });
}

export async function findById(id: number) {
  return prisma.credential.findUnique({ where: { id } });
}

export async function findByTitleAndUserId(title: string, userId: number) {
  return prisma.credential.findFirst({ where: { title, userId } });
}

export async function update(id: number, data: Partial<Credential>) {
  return prisma.credential.update({ where: { id }, data });
}

export async function remove(id: number) {
  return prisma.credential.delete({ where: { id } });
}
