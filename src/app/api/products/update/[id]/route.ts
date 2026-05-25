import  prisma  from "../../../../../lib/prisma";
import { NextResponse } from "next/server";

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const body = await req.json();

  const product = await prisma.product.update({
    where: {
      id,
    },

    data: {
      name: body.name,
      description: body.description,
    },
  });

  return NextResponse.json(product);
}