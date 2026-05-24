export default function Navbar() {
  return (
    <div className="bg-black text-white p-5 rounded-2xl mb-8 flex justify-between">
      <h1 className="text-2xl font-bold">
        Inventory System
      </h1>

      <div className="flex gap-6">
        <p>Dashboard</p>
        <p>Products</p>
        <p>Analytics</p>
      </div>
    </div>
  );
}