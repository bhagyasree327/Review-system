import bcrypt from "bcrypt";

import { PrismaClient }
from "@prisma/client";

const prisma =
  new PrismaClient();

async function main() {

  const password =
    await bcrypt.hash(
      "admin123",
      10,
    );

  await prisma.user.create({
    data: {
      email:
        "admin@test.com",

      password,

      role: "ADMIN",
    },
  });

  console.log("Admin created");
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });