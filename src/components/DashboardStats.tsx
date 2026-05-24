type Props = {
  totalProducts: number;
  totalStock: number;
};

export default function DashboardStats({
  totalProducts,
  totalStock,
}: Props) {
  return (
    <div className="grid grid-cols-2 gap-6 mb-8">

      <div className="bg-white p-6 rounded-2xl shadow-md">
        <h2 className="text-gray-500">
          Total Products
        </h2>

        <p className="text-4xl font-bold mt-2">
          {totalProducts}
        </p>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-md">
        <h2 className="text-gray-500">
          Total Stock
        </h2>

        <p className="text-4xl font-bold mt-2">
          {totalStock}
        </p>
      </div>

    </div>
  );
}