"use client";

import * as XLSX from "xlsx";

export default function ExportExcel({
  products,
}: any) {

  function exportExcel() {

    const worksheet = XLSX.utils.json_to_sheet(
      products
    );

    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(
      workbook,
      worksheet,
      "Products"
    );
XLSX.writeFile(
      workbook,
      "inventory.xlsx"
    );
  }

  return (
    <button
      onClick={exportExcel}
      className="bg-blue-600 text-white px-6 py-3 rounded-xl"
    >
      Export Excel
    </button>
  );
}