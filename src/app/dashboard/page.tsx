"use client";

import { useEffect, useState } from "react";

import ProductForm from "../../components/ProductForm";

import ProductCard from "../../components/ProductCard";

import DashboardStats from "../../components/DashboardStats";

import Navbar from "../../components/Navbar";

export default function DashboardPage() {

  const [products, setProducts] = useState([]);

  const [search, setSearch] = useState("");

  const [loading, setLoading] =
    useState(true);

  const [currentPage, setCurrentPage] =
    useState(1);

  const PRODUCTS_PER_PAGE = 3;

  useEffect(() => {

    async function fetchProducts() {

      const res = await fetch(
        "/api/products"
      );

      const data = await res.json();

      setProducts(data);

      setLoading(false);
    }

    fetchProducts();

  }, []);

  const filteredProducts = products.filter(
    (product: any) =>
      product.name
        .toLowerCase()
        .includes(search.toLowerCase())
  );

  const totalStock = filteredProducts.reduce(
    (sum: number, product: any) =>
      sum +
      product.inventories.reduce(
        (s: number, inv: any) =>
          s + inv.totalStock,
        0
      ),
    0
  );

  const totalAvailable =
    filteredProducts.reduce(
      (sum: number, product: any) =>
        sum +
        product.inventories.reduce(
          (s: number, inv: any) =>
            s + inv.availableStock,
          0
        ),
      0
    );

  const totalPages = Math.ceil(
    filteredProducts.length /
      PRODUCTS_PER_PAGE
  );

  const startIndex =
    (currentPage - 1) *
    PRODUCTS_PER_PAGE;

  const paginatedProducts =
    filteredProducts.slice(
      startIndex,
      startIndex + PRODUCTS_PER_PAGE
    );

  if (loading) {

    return (
      <div className="min-h-screen flex items-center justify-center text-2xl md:text-4xl font-bold">
        Loading Dashboard...
      </div>
    );

  }

  return (

    <div className="min-h-screen bg-gray-100 p-4 md:p-8">

      <Navbar />

      <DashboardStats
        totalProducts={
          filteredProducts.length
        }
        totalStock={totalStock}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">

        <div className="bg-white p-6 rounded-2xl shadow-md">

          <p className="text-gray-500">
            Available Stock
          </p>

          <h2 className="text-3xl md:text-5xl font-bold mt-2 text-green-600">
            {totalAvailable}
          </h2>

        </div>

        <div className="bg-white p-6 rounded-2xl shadow-md">

          <p className="text-gray-500">
            Low Stock Products
          </p>

          <h2 className="text-3xl md:text-5xl font-bold mt-2 text-red-500">

            {
              filteredProducts.filter(
                (product: any) =>
                  product.inventories.some(
                    (inv: any) =>
                      inv.availableStock < 6
                  )
              ).length
            }

          </h2>

        </div>

        <div className="bg-white p-6 rounded-2xl shadow-md">

          <p className="text-gray-500">
            Warehouses
          </p>

          <h2 className="text-3xl md:text-5xl font-bold mt-2">

            {
              new Set(
                filteredProducts.flatMap(
                  (p: any) =>
                    p.inventories.map(
                      (i: any) =>
                        i.warehouseName
                    )
                )
              ).size
            }

          </h2>

        </div>

      </div>

      <ProductForm />

      <input
        type="text"
        placeholder="Search products..."
        value={search}
        onChange={(e) => {

          setSearch(e.target.value);

          setCurrentPage(1);

        }}
        className="w-full p-4 rounded-xl border mb-6 shadow-sm"
      />

      <div className="space-y-8">

        {paginatedProducts.length > 0 ? (

          paginatedProducts.map(
            (product: any) => (

              <ProductCard
                key={product.id}
                product={product}
              />

            )
          )

        ) : (

          <div className="bg-white p-10 rounded-2xl shadow-md text-center text-xl md:text-2xl font-bold">

            No Products Found

          </div>

        )}

      </div>

      {totalPages > 1 && (

        <div className="flex flex-col md:flex-row justify-center items-center gap-4 mt-10">

          <button
            disabled={currentPage === 1}
            onClick={() =>
              setCurrentPage(
                currentPage - 1
              )
            }
            className="bg-black text-white px-6 py-3 rounded-xl disabled:opacity-50 w-full md:w-auto"
          >
            Previous
          </button>

          <div className="flex items-center text-lg md:text-xl font-bold">

            Page {currentPage} of {totalPages}

          </div>

          <button
            disabled={
              currentPage === totalPages
            }
            onClick={() =>
              setCurrentPage(
                currentPage + 1
              )
            }
            className="bg-black text-white px-6 py-3 rounded-xl disabled:opacity-50 w-full md:w-auto"
          >
            Next
          </button>

        </div>

      )}

    </div>

  );
}