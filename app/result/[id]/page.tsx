"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { auditTools } from "@/lib/auditEngine";
import { generateSummary } from "@/lib/auditEngine";

export default function ResultPage() {
  const params = useParams();
  const id = params.id;

  const [data, setData] = useState<any>(null);
  const [audit, setAudit] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase
        .from("audits")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        console.log(error);
        return;
      }

      if (data) {
        setData(data.data);

        const result = auditTools(data.data);
        setAudit(result);
      }
    };

    if (id) fetchData();
  }, [id]);

  if (!data || !audit) return <div>Loading...</div>;

  return (
  <div className="min-h-screen flex items-center justify-center bg-gray-100">
    <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-xl">

      <h1 className="text-2xl font-bold mb-6 text-center">
        Audit Result
      </h1>

      <div className="space-y-2 text-gray-700">
        <p><b>Tool:</b> {data.tool}</p>
        <p><b>Plan:</b> {data.plan}</p>
        <p><b>Spend:</b> ${data.spend}</p>
        <p><b>Seats:</b> {data.seats}</p>
      </div>

      <div className="mt-6 p-4 border rounded-lg bg-gray-50">
        <h2 className="text-lg font-semibold">Recommendation</h2>

        <p className="mt-2">
          👉 {audit.results[0].recommendation}
        </p>

        <p className="text-green-600 mt-2 font-bold text-lg">
          💰 ${audit.totalSavings.toFixed(2)} / month savings
        </p>

        <p className="mt-2 text-gray-600">
          {audit.results[0].reason}
        </p>
      </div>

      {/* AI Summary */}
      <div className="mt-6 p-4 bg-gray-100 rounded-lg">
        <h2 className="text-lg font-semibold">AI Summary</h2>
        <p className="mt-2">
          {generateSummary(audit)}
        </p>
      </div>

      {/* CTA */}
      {audit.totalSavings > 500 && (
        <div className="mt-6 p-4 bg-yellow-100 rounded-lg text-center font-semibold">
          🚀 You can save big! Book a consultation.
        </div>
      )}

    </div>
  </div>
);
}