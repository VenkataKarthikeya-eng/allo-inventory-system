import { prisma } from "../../../../lib/prisma";

import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const product =
      await prisma.product.create({
        data: {
          name: body.name,
          description:
            body.description,
        },
      });

    return NextResponse.json(product);

  } catch (error) {
    return NextResponse.json(
      {
        error:
          "Failed to create product",
      },
      { status: 500 }
    );
  }
}