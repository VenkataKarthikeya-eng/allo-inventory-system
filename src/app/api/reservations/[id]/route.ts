import { NextResponse } from "next/server";

import prisma from "../../../../lib/prisma";

export async function GET(
  req: Request,
  context: any
) {

  try {

    const params =
      await context.params;

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

    if (
      reservation.status ===
      "PENDING"
    ) {

      if (
        reservation.expiresAt <
        new Date()
      ) {

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

        return NextResponse.json(
          {
            error:
              "Reservation expired",
          },
          {
            status: 410,
          }
        );

      }

    }

    return NextResponse.json(
      reservation
    );

  } catch (error) {

    console.log(error);

    return NextResponse.json(
      {
        error:
          "Failed to fetch reservation",
      },
      {
        status: 500,
      }
    );

  }
}