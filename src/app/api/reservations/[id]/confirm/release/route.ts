import { NextResponse } from "next/server";

import prisma from "../../../../../lib/prisma";

export async function POST(
  req: Request,
  { params }: any
) {

  try {

    const reservation =
      await prisma.reservation.findUnique({
        where: {
          id: params.id,
        },
      });

    if (!reservation) {

      return NextResponse.json(
        {
          error:
            "Reservation not found",
        },
        {
          status: 404,
        }
      );

    }

    await prisma.inventory.update({
      where: {
        productId_warehouseId: {
          productId:
            reservation.productId,

          warehouseId:
            reservation.warehouseId,
        },
      },

      data: {
        reservedStock: {
          decrement:
            reservation.quantity,
        },
      },
    });

    await prisma.reservation.update({
      where: {
        id: reservation.id,
      },

      data: {
        status:
          "RELEASED",
      },
    });

    return NextResponse.json({
      success: true,
    });

  } catch (error) {

    console.log(error);

    return NextResponse.json(
      {
        error:
          "Failed to release reservation",
      },
      {
        status: 500,
      }
    );

  }
}