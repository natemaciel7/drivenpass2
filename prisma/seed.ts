import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  const email = "demo@driven.com.br";
  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) return;

  const hashedPassword = await bcrypt.hash("demo123", 10);
  await prisma.user.create({
    data: {
      name: "Demo",
      email,
      password: hashedPassword,
    },
  });

  console.log("✅ Usuário demo criado com sucesso.");
}

main()
  .catch((e) => {
    console.error("Erro ao seedar:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
