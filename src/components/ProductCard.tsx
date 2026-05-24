"use client";

export default function ProductCard({
  product,
}: any) {

  async function deleteProduct(id: string) {

    const confirmDelete = confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmDelete) return;

    await fetch(
      `/api/products/delete/${id}`,
      {
        method: "DELETE",
      }
    );

    window.location.reload();
  }

  return (

    <div className="bg-white rounded-2xl shadow-md p-4 md:p-6">

      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4 mb-4">

        <div>

          <h2 className="text-2xl md:text-3xl font-bold break-words">
            {product.name}
          </h2>

          <p className="text-gray-500 break-words">
            {product.description}
          </p>

        </div>

        <div className="flex flex-col md:flex-row gap-3">

          <button
            className="bg-blue-500 text-white px-6 py-3 rounded-xl w-full md:w-auto"
          >
            Update
          </button>

          <button
            onClick={() =>
              deleteProduct(product.id)
            }
            className="bg-red-500 text-white px-6 py-3 rounded-xl w-full md:w-auto"
          >
            Delete
          </button>

        </div>

      </div>

      <div className="overflow-x-auto">

        <table className="w-full border min-w-[700px]">

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

            </tr>

          </thead>

          <tbody>

            {product.inventories.map(
              (inventory: any) => (

                <tr
                  key={
                    inventory.warehouseId
                  }
                  className="border-t"
                >

                  <td className="p-4">
                    {
                      inventory.warehouseName
                    }
                  </td>

                  <td className="p-4">
                    {
                      inventory.totalStock
                    }
                  </td>

                  <td className="p-4">
                    {
                      inventory.reservedStock
                    }
                  </td>

                  <td className="p-4 text-green-600 font-bold">
                    {
                      inventory.availableStock
                    }
                  </td>

                </tr>

              )
            )}

          </tbody>

        </table>

      </div>

    </div>

  );
}