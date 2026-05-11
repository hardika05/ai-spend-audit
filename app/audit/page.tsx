"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import Result from "@/components/Result";


export default function AuditPage() {
  const router = useRouter();
  const [resultId, setResultId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    tool: "",
    plan: "",
    spend: "",
    seats: "",
    teamSize: "",
    useCase: "",
    email: "",
  });

  // Load saved data
  useEffect(() => {
    const saved = localStorage.getItem("auditData");
    if (saved) setFormData(JSON.parse(saved));
  }, []);

  // Save data
  useEffect(() => {
    localStorage.setItem("auditData", JSON.stringify(formData));
  }, [formData]);

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };


const handleSubmit = async (e: any) => {
  e.preventDefault();

  const { data, error } = await supabase
    .from("audits")
    .insert([{ data: formData , email: formData.email }])
    .select();

  if (error) {
    console.log(error);
    return;
  }

  const id = data[0].id;

  setResultId(id);
};
  return (
  <div className="min-h-screen bg-gradient-to-br from-indigo-500 to-pink-500 p-6">

    <div className="grid md:grid-cols-2 gap-6">

      {/* LEFT: FORM */}
      <div className="bg-white/10 backdrop-blur-xl p-6 rounded-xl text-white">
        <h1 className="text-2xl font-bold mb-4">AI Spend Audit</h1>

        <form onSubmit={handleSubmit} className="space-y-3">

          <select
  name="tool"
  value={formData.tool}
  onChange={handleChange}
  className="w-full p-3 rounded-lg bg-white/20 text-white appearance-none focus:outline-none focus:ring-2 focus:ring-white/50"
>
  <option value="" className="text-black">Select Tool</option>
  <option value="ChatGPT" className="text-black">ChatGPT</option>
  <option value="Claude" className="text-black">Claude</option>
  <option value="GitHub Copilot" className="text-black">GitHub Copilot</option>
</select>

          <input name="plan" placeholder="Plan" value={formData.plan} onChange={handleChange} className="w-full p-2 rounded bg-white/20" />

          <input name="spend" placeholder="Monthly Spend" value={formData.spend} onChange={handleChange} className="w-full p-2 rounded bg-white/20" />

          <input name="seats" placeholder="Seats" value={formData.seats} onChange={handleChange} className="w-full p-2 rounded bg-white/20" />

          <input name="teamSize" placeholder="Team Size" value={formData.teamSize} onChange={handleChange} className="w-full p-2 rounded bg-white/20" />

          <select
  name="useCase"
  value={formData.useCase}
  onChange={handleChange}
  className="w-full p-3 rounded-lg bg-white/20 text-white appearance-none focus:outline-none focus:ring-2 focus:ring-white/50"
>
  <option value="" className="text-black">Use Case</option>
  <option value="coding" className="text-black">coding</option>
  <option value="writing" className="text-black">writing</option>
  <option value="research" className="text-black">research</option>
  <option value="mixed" className="text-black">mixed</option>
</select>

          <input
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 rounded bg-white/20"
          />

          <button className="w-full p-3 rounded-lg bg-white/20 text-white appearance-none focus:outline-none focus:ring-2 focus:ring-white/50">
            Get Audit Report
          </button>

        </form>
      </div>

      {/* RIGHT: RESULT */}
      <div className="text-white flex items-center justify-center">

  {resultId ? (
    <div className="w-full h-full overflow-auto bg-white/10 backdrop-blur-xl p-6 rounded-xl">
      <Result id={resultId} />
    </div>
  ) : (
    <div className="text-center flex flex-col items-center justify-center gap-4 opacity-90">

      <img
        src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
        alt="analysis"
        className="w-28 h-28 opacity-80"
      />

      <p className="text-xl font-semibold">
        Your audit results will appear here
      </p>

      <p className="text-white/70 text-sm max-w-xs">
        Fill the form and click “Get Audit Report” to analyze your AI spending and discover savings.
      </p>

    </div>
  )}

</div>

    </div>
  </div>
);
}