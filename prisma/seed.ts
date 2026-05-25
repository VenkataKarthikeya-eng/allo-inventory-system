import prisma from "../src/lib/prisma";

async function main() {

  const warehouse1 =
    await prisma.warehouse.create({
      data: {
        name: "Delhi Warehouse",
        location: "Delhi",
      },
    });

  const warehouse2 =
    await prisma.warehouse.create({
      data: {
        name: "Mumbai Warehouse",
        location: "Mumbai",
      },
    });

  const product1 =
    await prisma.product.create({
      data: {
        name: "iPhone 15",
        description:
          "Apple smartphone",
      },
    });

  const product2 =
    await prisma.product.create({
      data: {
        name: "Samsung S24",
        description:
          "Samsung flagship phone",
      },
    });

  await prisma.inventory.createMany({
    data: [
      {
        productId: product1.id,
        warehouseId:
          warehouse1.id,
        totalStock: 10,
        reservedStock: 0,
        availableStock: 10,
      },

      {
        productId: product1.id,
        warehouseId:
          warehouse2.id,
        totalStock: 5,
        reservedStock: 0,
        availableStock: 5,
      },

      {
        productId: product2.id,
        warehouseId:
          warehouse1.id,
        totalStock: 8,
        reservedStock: 0,
        availableStock: 8,
      },
    ],
  });

  console.log(
    "Seed data inserted"
  );
}

main()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });