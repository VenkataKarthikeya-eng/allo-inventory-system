"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function StockChart({
  products,
}: any) {

  const data = products.map((p: any) => ({
    name: p.name,
    stock: p.inventories.reduce(
      (s: number, i: any) =>
        s + i.totalStock,
      0
    ),
    }));

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md mb-8 h-[400px]">

      <h2 className="text-2xl font-bold mb-4">
        Stock Analytics
      </h2>

      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="stock" />
        </BarChart>
      </ResponsiveContainer>

    </div>
  );
}
