async function getProducts() {
  const res = await fetch("http://localhost:3000/api/products", {
    cache: "no-store",
  });

  return res.json();
}

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-4xl font-bold mb-8">
        Inventory Dashboard
      </h1>

      <div className="grid gap-6">
        {products.map((product: any) => (
          <div
            key={product.id}
            className="bg-white rounded-2xl shadow p-6"
          >
            <h2 className="text-2xl font-semibold">
              {product.name}
            </h2>

            <p className="text-gray-600 mb-4">
              {product.description}
            </p>

            <div className="overflow-x-auto">
              <table className="w-full border">
                <thead className="bg-black text-white">
                  <tr>
                    <th className="p-3 text-left">
                      Warehouse
                    </th>

                    <th className="p-3 text-left">
                      Total Stock
                    </th>

                    <th className="p-3 text-left">
                      Reserved
                    </th>

                    <th className="p-3 text-left">
                      Available
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {product.inventories.map(
                    (inventory: any) => (
                      <tr
                        key={inventory.warehouseId}
                        className="border-b"
                      >
                        <td className="p-3">
                          {inventory.warehouseName}
                        </td>

                        <td className="p-3">
                          {inventory.totalStock}
                        </td>

                        <td className="p-3">
                          {inventory.reservedStock}
                        </td>

                        <td className="p-3 font-bold text-green-600">
                          {inventory.availableStock}
                        </td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}