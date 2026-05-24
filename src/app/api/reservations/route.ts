import { NextResponse } from "next/server";

import prisma from "../../../lib/prisma";

export async function POST(
  req: Request
) {

  try {

    const body =
      await req.json();

    const {
      productId,
      warehouseId,
      quantity,
    } = body;

    const reservation =
      await prisma.$transaction(
        async (tx) => {

          const inventory =
            await tx.inventory.findUnique({
              where: {
                productId_warehouseId: {
                  productId,
                  warehouseId,
                },
              },
            });

          if (!inventory) {

            throw new Error(
              "Inventory not found"
            );

          }

          const availableStock =
            inventory.totalStock -
            inventory.reservedStock;

          if (
            availableStock <
            quantity
          ) {

            throw new Error(
              "INSUFFICIENT_STOCK"
            );

          }

          await tx.inventory.update({
            where: {
              productId_warehouseId: {
                productId,
                warehouseId,
              },
            },

            data: {
              reservedStock: {
                increment:
                  quantity,
              },
            },
          });

          return tx.reservation.create({
            data: {
              productId,
              warehouseId,
              quantity,

              status:
                "PENDING",

              expiresAt:
                new Date(
                  Date.now() +
                    10 *
                      60 *
                      1000
                ),
            },
          });

        }
      );

    return NextResponse.json(
      reservation
    );

  } catch (error: any) {

    console.log(error);

    if (
      error.message ===
      "INSUFFICIENT_STOCK"
    ) {

      return NextResponse.json(
        {
          error:
            "Not enough stock available",
        },
        {
          status: 409,
        }
      );

    }

    return NextResponse.json(
      {
        error:
          "Reservation failed",
      },
      {
        status: 500,
      }
    );

  }
}