import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-10 rounded-2xl shadow-xl text-center">
        <h1 className="text-5xl font-bold mb-4">
          Inventory System
        </h1>

        <p className="text-gray-500 mb-6">
          Professional Inventory Dashboard
        </p>

        <Link
          href="/dashboard"
          className="bg-black text-white px-6 py-3 rounded-xl"
        >
          Open Dashboard
        </Link>
      </div>
    </div>
  );
}