export default function Loading() {
  return (
    <div className="p-10 animate-pulse">
      <div className="h-12 bg-gray-300 rounded-xl mb-6" />

      <div className="grid grid-cols-3 gap-6 mb-8">
        <div className="h-32 bg-gray-300 rounded-2xl" />
        <div className="h-32 bg-gray-300 rounded-2xl" />
        <div className="h-32 bg-gray-300 rounded-2xl" />
      </div>

      <div className="h-96 bg-gray-300 rounded-2xl" />
    </div>
  );
}