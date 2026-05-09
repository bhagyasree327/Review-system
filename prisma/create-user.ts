import bcrypt from "bcrypt";

import { PrismaClient }
from "@prisma/client";

const prisma =
  new PrismaClient();

async function main() {

  const password =
    await bcrypt.hash(
      "owner123",
      10,
    );

  const business =
    await prisma.business.findFirst();

  await prisma.user.create({
    data: {
      email:
        "owner@test.com",

      password,

      role: "OWNER",

      businessId:
        business?.id,
    },
  });

  console.log("Owner created");
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });