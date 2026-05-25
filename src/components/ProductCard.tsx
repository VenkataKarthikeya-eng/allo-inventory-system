"use client";

import toast from "react-hot-toast";

export default function ProductCard({
  product,
}: any) {

  async function deleteProduct(
    id: string
  ) {

    const confirmDelete =
      confirm(
        "Delete product?"
      );

    if (!confirmDelete) return;

    await fetch(
      `/api/products/delete/${id}`,
      {
        method: "DELETE",
      }
    );

    toast.success(
      "Product Deleted"
    );

    window.location.reload();
  }

  async function reserveProduct() {

    try {

      const inventory =
        product.inventories[0];

      const res = await fetch(
        "/api/reservations",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            productId:
              product.id,

            warehouseId:
              inventory.warehouseId,

            quantity: 1,
          }),
        }
      );

      if (
        res.status === 409
      ) {

        toast.error(
          "Not enough stock available"
        );

        return;
      }

      if (
        res.status === 500
      ) {

        toast.error(
          "Reservation failed"
        );

        return;
      }

      const data =
        await res.json();

      toast.success(
        "Reservation Created"
      );

      window.location.href =
        `/checkout/${data.id}`;

    } catch (error) {

      toast.error(
        "Something went wrong"
      );

    }
  }

  return (

    <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition-all duration-300">

      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-6 mb-6">

        <div className="space-y-2">

          <h2 className="text-2xl md:text-3xl font-bold">

            {product.name}

          </h2>

          <p className="text-gray-500 text-sm md:text-base">

            {product.description}

          </p>

        </div>

        <div className="flex flex-wrap gap-3">

          <button
            onClick={
              reserveProduct
            }
            className="bg-green-600 hover:bg-green-700 transition-all text-white px-5 py-3 rounded-xl font-semibold"
          >
            Reserve
          </button>

          <button
            className="bg-blue-500 hover:bg-blue-600 transition-all text-white px-5 py-3 rounded-xl font-semibold"
          >
            Update
          </button>

          <button
            onClick={() =>
              deleteProduct(
                product.id
              )
            }
            className="bg-red-500 hover:bg-red-600 transition-all text-white px-5 py-3 rounded-xl font-semibold"
          >
            Delete
          </button>

        </div>

      </div>

      <div className="overflow-x-auto rounded-xl border">

        <table className="w-full min-w-[650px]">

          <thead className="bg-black text-white">

            <tr>

              <th className="p-4 text-left">
                Warehouse
              </th>

              <th className="p-4 text-left">
                Total Stock
              </th>

              <th className="p-4 text-left">
                Reserved
              </th>

              <th className="p-4 text-left">
                Available
              </th>

              <th className="p-4 text-left">
                Status
              </th>

            </tr>

          </thead>

          <tbody>

            {product.inventories.map(
              (
                inventory: any
              ) => {

                const available =
                  inventory.totalStock -
                  inventory.reservedStock;

                return (

                  <tr
                    key={
                      inventory.warehouseId
                    }
                    className="border-t hover:bg-gray-50 transition-all"
                  >

                    <td className="p-4 font-medium">

                      {
                        inventory.warehouseName
                      }

                    </td>

                    <td className="p-4">

                      {
                        inventory.totalStock
                      }

                    </td>

                    <td className="p-4 text-yellow-600 font-semibold">

                      {
                        inventory.reservedStock
                      }

                    </td>

                    <td className="p-4 text-green-600 font-bold">

                      {available}

                    </td>

                    <td className="p-4">

                      {available <= 5 ? (

                        <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm font-semibold">

                          Low Stock

                        </span>

                      ) : (

                        <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-sm font-semibold">

                          In Stock

                        </span>

                      )}

                    </td>

                  </tr>

                );

              }
            )}

          </tbody>

        </table>

      </div>

    </div>
  );
}