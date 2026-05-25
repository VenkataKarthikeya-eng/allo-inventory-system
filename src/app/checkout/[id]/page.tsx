"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  useParams,
  useRouter,
} from "next/navigation";

import toast from "react-hot-toast";

export default function CheckoutPage() {

  const params = useParams();

  const router = useRouter();

  const [reservation, setReservation] =
    useState<any>(null);

  const [loading, setLoading] =
    useState(true);

  const [timeLeft, setTimeLeft] =
    useState("10:00");

  const [confirmed, setConfirmed] =
    useState(false);

  const [cancelled, setCancelled] =
    useState(false);

  useEffect(() => {

    async function fetchReservation() {

      try {

        const res = await fetch(
          `/api/reservations/${params.id}`
        );

        if (res.status === 410) {

          toast.error(
            "Reservation Expired"
          );

          router.push(
            "/dashboard"
          );

          return;
        }

        const data =
          await res.json();

        setReservation(data);

        setLoading(false);

      } catch (error) {

        toast.error(
          "Failed to load reservation"
        );

      }
    }

    fetchReservation();

  }, [params.id, router]);

  useEffect(() => {

    if (!reservation) return;

    const interval = setInterval(() => {

      const now =
        new Date().getTime();

      const expiry =
        new Date(
          reservation.expiresAt
        ).getTime();

      const distance =
        expiry - now;

      if (distance <= 0) {

        clearInterval(interval);

        setTimeLeft("00:00");

        toast.error(
          "Reservation Expired"
        );

        return;
      }

      const minutes =
        Math.floor(
          distance /
            (1000 * 60)
        );

      const seconds =
        Math.floor(
          (distance %
            (1000 * 60)) /
            1000
        );

      setTimeLeft(
        `${minutes
          .toString()
          .padStart(2, "0")}:${seconds
          .toString()
          .padStart(2, "0")}`
      );

    }, 1000);

    return () =>
      clearInterval(interval);

  }, [reservation]);

  async function confirmReservation() {

    try {

      const res = await fetch(
        `/api/reservations/${params.id}/confirm`,
        {
          method: "POST",
        }
      );

      if (res.status === 410) {

        toast.error(
          "Reservation Expired"
        );

        return;
      }

      setConfirmed(true);

      toast.success(
        "Product Booked Successfully"
      );

    } catch (error) {

      toast.error(
        "Confirmation failed"
      );

    }
  }

  async function cancelReservation() {

    try {

      await fetch(
        `/api/reservations/${params.id}/release`,
        {
          method: "POST",
        }
      );

      setCancelled(true);

      toast.success(
        "Reservation Cancelled"
      );

      setTimeout(() => {

        router.push(
          "/dashboard"
        );

      }, 2000);

    } catch (error) {

      toast.error(
        "Cancellation failed"
      );

    }
  }

  if (loading) {

    return (

      <div className="min-h-screen flex items-center justify-center text-3xl font-bold">

        Loading Checkout...

      </div>

    );

  }

  return (

    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">

      <div className="bg-white w-full max-w-3xl rounded-3xl shadow-2xl p-8 md:p-12">

        <h1 className="text-4xl md:text-5xl font-bold mb-10">

          Checkout

        </h1>

        <div className="space-y-8">

          <div>

            <p className="text-gray-500 text-lg">
              Reservation ID
            </p>

            <h2 className="text-xl font-bold break-all">

              {reservation.id}

            </h2>

          </div>

          <div>

            <p className="text-gray-500 text-lg">
              Reservation Status
            </p>

            <h2 className="text-2xl font-bold text-blue-600">

              {confirmed
                ? "CONFIRMED"
                : cancelled
                ? "CANCELLED"
                : reservation.status}

            </h2>

          </div>

          <div>

            <p className="text-gray-500 text-lg">
              Quantity Reserved
            </p>

            <h2 className="text-2xl font-bold">

              {reservation.quantity}

            </h2>

          </div>

          <div>

            <p className="text-gray-500 text-lg">
              Time Remaining
            </p>

            <h2 className="text-5xl font-bold text-red-500 mt-2">

              {timeLeft}

            </h2>

          </div>

        </div>

        {!confirmed &&
          !cancelled && (

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">

            <button
              onClick={
                confirmReservation
              }
              className="bg-green-600 hover:bg-green-700 active:scale-95 transition-all duration-200 cursor-pointer text-white py-5 rounded-2xl text-xl font-bold shadow-lg"
            >
              Confirm Purchase
            </button>

            <button
              onClick={
                cancelReservation
              }
              className="bg-red-500 hover:bg-red-600 active:scale-95 transition-all duration-200 cursor-pointer text-white py-5 rounded-2xl text-xl font-bold shadow-lg"
            >
              Cancel Reservation
            </button>

          </div>

        )}

        {confirmed && (

          <div className="mt-12 bg-green-100 border border-green-300 rounded-2xl p-8 text-center">

            <h2 className="text-4xl font-bold text-green-700 mb-4">

              Product Booked

            </h2>

            <p className="text-lg text-green-700">

              Reservation successfully confirmed.

            </p>

            <button
              onClick={() =>
                router.push(
                  "/dashboard"
                )
              }
              className="mt-6 bg-green-600 hover:bg-green-700 active:scale-95 transition-all duration-200 cursor-pointer text-white px-8 py-4 rounded-xl text-lg font-bold"
            >
              Back To Dashboard
            </button>

          </div>

        )}

        {cancelled && (

          <div className="mt-12 bg-red-100 border border-red-300 rounded-2xl p-8 text-center">

            <h2 className="text-4xl font-bold text-red-600 mb-4">

              Reservation Cancelled

            </h2>

            <p className="text-lg text-red-600">

              Stock has been released successfully.

            </p>

          </div>

        )}

      </div>

    </div>
  );
}