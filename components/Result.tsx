"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { auditTools, generateSummary } from "@/lib/auditEngine";

export default function Result({ id }: { id: string }) {
  const [data, setData] = useState<any>(null);
  const [audit, setAudit] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase
        .from("audits")
        .select("*")
        .eq("id", id)
        .single();

      if (data) {
        setData(data.data);
        const result = auditTools(data.data);
        setAudit(result);
      }
    };

    fetchData();
  }, [id]);

  // if (!data || !audit) return <p>Loading...</p>;
  if (!data || !audit) {
  return <p className="text-white">Analyzing your data...</p>;
}
  return (
    <div className="space-y-2">
  <div className="bg-white/10 backdrop-blur-lg p-5 rounded-xl border border-white/20 text-white">
    
    <h2 className="text-xl font-bold mb-3">Audit Result</h2>

    <p>Tool: {data.tool}</p>
    <p>Plan: {data.plan}</p>
    <p>Spend: ${data.spend}</p>
    <p>Seats: {data.seats}</p>

    <div className="mt-4">
      <p className="font-semibold">
        👉 {audit.results[0].recommendation}
      </p>

      <p className="text-green-300">
        💰 ${audit.totalSavings} savings
      </p>

      <p className="text-sm text-white/70">
        {audit.results[0].reason}
      </p>
    </div>
  </div>
  </div>
);
}