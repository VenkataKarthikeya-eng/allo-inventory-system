"use client";

import { useState } from "react";

export default function ProductForm() {
  const [name, setName] = useState("");
  const [description, setDescription] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  async function handleSubmit(
    e: React.FormEvent
  ) {
    e.preventDefault();

    setLoading(true);

    await fetch(
      "/api/products/create",
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify({
          name,
          description,
        }),
      }
    );

    setName("");
    setDescription("");

    window.location.reload();

    setLoading(false);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-2xl shadow-md mb-8"
    >
      <h2 className="text-2xl font-bold mb-4">
        Add Product
      </h2>

      <div className="grid gap-4">

        <input
          type="text"
          placeholder="Product Name"
          className="border p-4 rounded-xl"
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
          required
        />

        <textarea
          placeholder="Description"
          className="border p-4 rounded-xl"
          value={description}
          onChange={(e) =>
            setDescription(
              e.target.value
            )
          }
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="bg-black text-white p-4 rounded-xl"
        >
          {loading
            ? "Adding..."
            : "Add Product"}
        </button>

      </div>
    </form>
  );
}