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

  if (!data || !audit) return <p>Loading...</p>;

  return (
    <div>
      <h2 className="text-xl font-bold mb-2">Result</h2>

      <p>Tool: {data.tool}</p>
      <p>Plan: {data.plan}</p>
      <p>Spend: ${data.spend}</p>
      <p>Seats: {data.seats}</p>

      <div className="mt-3">
        <p>👉 {audit.results[0].recommendation}</p>
        <p className="text-green-300">
          💰 ${audit.totalSavings} savings
        </p>
        <p className="text-sm">{audit.results[0].reason}</p>
      </div>

      <div className="mt-3">
        <h3 className="font-semibold">AI Summary</h3>
        <p>{generateSummary(audit)}</p>
      </div>
    </div>
  );
}