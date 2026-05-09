import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.business.create({
    data: {
      name: "Cafe Royal",
      slug: "cafe-royal",
      googleUrl: "https://maps.google.com",
    },
  });

  console.log("Business created");
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });