import { prisma } from "../../../lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const products = await prisma.product.findMany({
    include: {
      inventories: {
        include: {
          warehouse: true,
        },
      },
    },
  });

  const formatted = products.map((product) => ({
    id: product.id,
    name: product.name,
    description: product.description,

    inventories: product.inventories.map((inventory) => ({
      warehouseId: inventory.warehouse.id,
      warehouseName: inventory.warehouse.name,
      totalStock: inventory.totalStock,
      reservedStock: inventory.reservedStock,
      availableStock:
        inventory.totalStock - inventory.reservedStock,
    })),
  }));

  return NextResponse.json(formatted);
}
export async function POST(
  request: Request
) {
  const body = await request.json();

  const product =
    await prisma.product.create({
      data: {
        name: body.name,
        description:
          body.description,
      },
    });

  return NextResponse.json(product);
}