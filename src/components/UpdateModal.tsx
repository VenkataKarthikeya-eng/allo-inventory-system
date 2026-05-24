"use client";

import { useState } from "react";
import toast from "react-hot-toast";

export default function UpdateModal({
  product,
}: any) {
  const [open, setOpen] = useState(false);

  const [name, setName] = useState(product.name);

  const [description, setDescription] =
    useState(product.description);

  async function updateProduct() {
    await fetch(
      `/api/products/update/${product.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          description,
        }),
      }
    );

    toast.success("Product Updated");

    setOpen(false);

    window.location.reload();
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="bg-blue-500 text-white px-6 py-3 rounded-xl"
      >
        Update
      </button>

      {open && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-2xl w-[400px]">
            <h2 className="text-2xl font-bold mb-4">
              Update Product
            </h2>

            <div className="grid gap-4">
              <input
              value={name}
                onChange={(e) =>
                  setName(e.target.value)
                }
                className="border p-4 rounded-xl"
              />

              <textarea
                value={description}
                onChange={(e) =>
                  setDescription(e.target.value)
                }
                className="border p-4 rounded-xl"
              />

              <button
                onClick={updateProduct}
                className="bg-black text-white p-4 rounded-xl"
              >
                Save Changes
              </button>
            </div>
             </div>
        </div>
      )}
    </>
  );
}