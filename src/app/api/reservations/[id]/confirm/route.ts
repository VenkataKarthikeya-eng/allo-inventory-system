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

    if (
      reservation.expiresAt <
      new Date()
    ) {

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

    await prisma.reservation.update({
      where: {
        id: params.id,
      },

      data: {
        status:
          "CONFIRMED",
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
          "Failed to confirm reservation",
      },
      {
        status: 500,
      }
    );

  }
}