import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-gray-100 to-gray-200">
      <h1 className="text-4xl font-bold mb-4 text-center">
        AI Spend Audit
      </h1>

      <p className="text-gray-600 mb-6 text-center max-w-md">
        Analyze your AI tool usage and discover potential cost savings instantly.
      </p>

      <Link
        href="/audit"
        className="bg-black text-white px-6 py-3 rounded-lg shadow hover:scale-105 transition"
      >
        Start Audit →
      </Link>
    </div>
  );
}