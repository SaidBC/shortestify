import { PrismaClient } from "@prisma/client";
import { countries } from "country-data";

const prisma = new PrismaClient();

async function seedCountries() {
  const countryData = countries.all.filter((c) => c.status === "assigned");

  const countryRecords = countryData.map((country) => ({
    code: country.alpha2,
    name: country.name,
    rate: 3,
  }));

  const batchSize = 50;
  for (let i = 0; i < countryRecords.length; i += batchSize) {
    const batch = countryRecords.slice(i, i + batchSize);
    await prisma.country.createMany({
      data: batch,
      skipDuplicates: true,
    });
    console.log(`Seeded batch ${i / batchSize + 1}`);
  }

  console.log("✅ Country seeding completed");
}

seedCountries()
  .catch((e) => {
    console.error("Error seeding countries:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
