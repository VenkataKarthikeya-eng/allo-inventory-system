"use client";

import jsPDF from "jspdf";

export default function ExportPDF({
  products,
}: any) {

  function exportPDF() {
    const doc = new jsPDF();

    doc.text(
      "Inventory Report",
      20,
      20
    );
     products.forEach(
      (p: any, index: number) => {
        doc.text(
          `${p.name} - ${p.description}`,
          20,
          40 + index * 10
        );
      }
    );

    doc.save("inventory.pdf");
  }

  return (
    <button
     onClick={exportPDF}
      className="bg-green-600 text-white px-6 py-3 rounded-xl"
    >
      Export PDF
    </button>
  );
}