import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {

  // Warehouses
  const warehouse1 = await prisma.warehouse.create({
    data: {
      name: "Delhi Warehouse",
      location: "Delhi",
    },
  });

  const warehouse2 = await prisma.warehouse.create({
    data: {
      name: "Mumbai Warehouse",
      location: "Mumbai",
    },
  });

  // Products
  const product1 = await prisma.product.create({
    data: {
      name: "iPhone 15",
      description: "Apple smartphone",
    },
  });

  const product2 = await prisma.product.create({
    data: {
      name: "Samsung S24",
      description: "Samsung flagship phone",
    },
  });

  // Inventory
  await prisma.inventory.createMany({
    data: [
      {
        productId: product1.id,
        warehouseId: warehouse1.id,
        totalStock: 10,
      },
      {
        productId: product1.id,
        warehouseId: warehouse2.id,
        totalStock: 5,
      },
      {
        productId: product2.id,
        warehouseId: warehouse1.id,
        totalStock: 8,
      },
    ],
  });

  console.log("Seed completed");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });