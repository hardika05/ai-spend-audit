"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import Result from "@/components/Result";
import { useSearchParams } from "next/navigation";

export default function AuditPage({ initialId }: { initialId?: string }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [resultId, setResultId] = useState<string | null>(initialId || null);
  const [loading, setLoading] = useState(false);
const [success, setSuccess] = useState(false);
const [errorMsg, setErrorMsg] = useState("");
const [copied, setCopied] = useState(false);
const plansByTool: any = {
  "ChatGPT": ["Plus", "Team", "Enterprise", "API"],
  "Claude": ["Free", "Pro", "Max", "Team", "Enterprise", "API"],
  "GitHub Copilot": ["Individual", "Business", "Enterprise"],
  "Cursor": ["Hobby", "Pro", "Business", "Enterprise"],
  "Gemini": ["Pro", "Ultra", "API"],
  "OpenAI API": ["Usage-based"],
  "Anthropic API": ["Usage-based"],
  "Windsurf": ["Starter", "Pro"]
};
  const [formData, setFormData] = useState({
    tool: "",
    plan: "",
    spend: "",
    seats: "",
    teamSize: "",
    useCase: "",
    email: "",
    company: "",
    role: "",
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

  useEffect(() => {
  if (success) {
    setTimeout(() => setSuccess(false), 3000);
  }
}, [success]);

useEffect(() => {
  const idFromUrl = searchParams.get("resultId");

  if (idFromUrl) {
    console.log("Loaded from URL:", idFromUrl);
    setResultId(idFromUrl);
  }
}, [searchParams]);

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrorMsg("");
  };

// const handleSubmit = async () => {
//   setLoading(true);
//   setErrorMsg("");

//   try {
//     const { data, error } = await supabase
//       .from("audits")
//       .insert([
//         {
//           data: formData,
//           email: formData.email,
//         },
//       ])
//       .select()
//       .single();

//     if (error) {
//       console.error(error);
//       setErrorMsg("Something went wrong");
//       return;
//     }

//     const id = data.id;

//     console.log("Generated ID:", id);

//     // ✅ SHOW RESULT ON RIGHT SIDE
//     setResultId(id);

//     setSuccess(true);
//   } catch (err) {
//     console.error(err);
//     setErrorMsg("Unexpected error");
//   } finally {
//     setLoading(false);
//   }
// };

// const handleShare = async () => {
//   if (!resultId) return;

//   const url = `${window.location.origin}/result/${resultId}`;

//   await navigator.clipboard.writeText(url);

//   setCopied(true);

//   setTimeout(() => {
//     setCopied(false);
//     // router.push(`/result/${resultId}`);
//     setResultId(data.id);
//   }, 800);
// };
 const handleSubmit = async () => {
  setLoading(true);
  setErrorMsg("");

  try {
    const { data, error } = await supabase
      .from("audits")
      .insert([
        {
          data: formData,
        },
      ])
      .select()
      .single();

    if (error) {
      console.error(error);
      setErrorMsg("Something went wrong");
      setLoading(false);
      return;
    }

    const id = data.id;

    console.log("Generated ID:", id);

    // ✅ THIS IS THE IMPORTANT LINE
    setResultId(id);   // 👈 THIS SHOWS RESULT ON RIGHT SIDE

    setSuccess(true);
  } catch (err) {
    console.error(err);
    setErrorMsg("Unexpected error");
  }

  setLoading(false);
};
// const handleShare = async () => {
//   if (!resultId) return;

//   const url = `${window.location.origin}/result/${resultId}`;

//   try {
//     await navigator.clipboard.writeText(url);
//     setCopied(true);

//     // ✅ navigate after copy
//     router.push(`/result/${resultId}`);

//     setTimeout(() => setCopied(false), 2000);
//   } catch (err) {
//     console.error("Copy failed", err);
//   }
// };
const handleShare = async () => {
  if (!resultId) return;

  // const url = `${window.location.origin}/result/${resultId}`;
   const url = `${window.location.origin}/audit?resultId=${resultId}`;
  try {
    await navigator.clipboard.writeText(url);
    setCopied(true);

    // // ✅ navigate AFTER copying
    // router.push(`/result/${resultId}`);

    setTimeout(() => setCopied(false), 2000);
  } catch (err) {
    console.error("Copy failed", err);
  }
};
  return (
  <div className="min-h-screen bg-gradient-to-br from-indigo-500 to-pink-500 p-6">

    <div className="grid md:grid-cols-2 gap-6">

      {/* LEFT: FORM */}
      <h1 className="text-3xl font-bold mb-2">
  💸 AI Spend Auditor
</h1>
<p className="text-white/70 text-sm mb-4">
  Analyze your AI tool costs and find savings instantly
</p>
      <div className="bg-white/10 backdrop-blur-xl p-6 rounded-xl text-white">
        <h1 className="text-2xl font-bold mb-4">AI Spend Audit</h1>

        {/* <form onSubmit={handleSubmit} className="space-y-3"> */}
          {/* <form onSubmit={handleSubmit} className="space-y-3" autoComplete="off"> */}
          <form onSubmit={(e) => {
  e.preventDefault();
  handleSubmit();
}}className="space-y-4">
          
         <select
  name="tool"
  value={formData.tool}
  onChange={(e) => {
    handleChange(e);
    setFormData({ ...formData, tool: e.target.value, plan: "" });
  }}
  className="w-full p-3 rounded-lg bg-white/10 border border-white/20"
>
  <option value="" className="text-black">Select Tool</option>
  {Object.keys(plansByTool).map((tool) => (
    <option key={tool} value={tool} className="text-black">
      {tool}
    </option>
  ))}
</select>

          {/* <input name="plan" placeholder="Plan" value={formData.plan} onChange={handleChange} className="w-full p-3 rounded-lg bg-white/10 border border-white/20 placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/40"/> */}
          <select
  name="plan"
  value={formData.plan}
  onChange={handleChange}
  disabled={!formData.tool}
  className="w-full p-3 rounded-lg bg-white/10 border border-white/20"
>
  <option value="" className="text-black">Select Plan</option>
  {plansByTool[formData.tool]?.map((plan: string) => (
    <option key={plan} value={plan} className="text-black">
      {plan}
    </option>
  ))}
</select>
          <input name="spend" placeholder="Monthly Spend" value={formData.spend} onChange={handleChange} className="w-full p-3 rounded-lg bg-white/10 border border-white/20 placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/40" />

          <input name="seats" placeholder="Seats" value={formData.seats} onChange={handleChange} className="w-full p-3 rounded-lg bg-white/10 border border-white/20 placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/40" />

          <input name="teamSize" placeholder="Team Size" value={formData.teamSize} onChange={handleChange} className="w-full p-3 rounded-lg bg-white/10 border border-white/20 placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/40"/>

          <select
  name="useCase"
  value={formData.useCase}
  onChange={handleChange}
  className="w-full p-3 rounded-lg bg-white/10 border border-white/20 placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/40"
>
  <option value="" className="text-black">Use Case</option>
  <option value="coding" className="text-black">coding</option>
  <option value="writing" className="text-black">writing</option>
  <option value="research" className="text-black">research</option>
  <option value="mixed" className="text-black">mixed</option>
</select>

          <input
  type="email"
  name="email"
  autoComplete="new-email"
  placeholder="Email"
  value={formData.email}
  onChange={handleChange}
  className="w-full p-3 rounded-lg bg-white/10 border border-white/20"
/>

<input
  name="company"
  placeholder="Company (optional)"
  value={formData.company}
  onChange={handleChange}
  className="w-full p-3 rounded-lg bg-white/10 border border-white/20"
/>

<input
  name="role"
  placeholder="Role (optional)"
  value={formData.role}
  onChange={handleChange}
  className="w-full p-3 rounded-lg bg-white/10 border border-white/20"
/>
  
  <input
  type="text"
  name="website"
  style={{ display: "none" }}
  onChange={(e) => {
    if (e.target.value) return; // bot detected
  }}
/>
          {errorMsg && (
  <div className="bg-red-500/20 border border-red-400 text-red-200 px-3 py-2 rounded text-sm">
    {errorMsg}
  </div>
)}

          {/* <button
           onClick={handleSubmit}
  disabled={loading}
  className="w-full bg-white text-black py-2 rounded font-semibold disabled:opacity-50"
> */}
  {/* {loading ? "Analyzing..." : "Get Audit Report"}
</button> */}

<button
  type="submit"
  disabled={loading}
  className="w-full bg-white text-black py-2 rounded font-semibold disabled:opacity-50"
>
  {loading ? "Analyzing..." : "Get Audit Report"}
</button>
{success && (
  <p className="text-green-300 text-sm mt-2">
    ✔ Audit generated successfully
  </p>
  
)}


        </form>
      </div>

      {/* RIGHT: RESULT */}

    <div className="text-white flex flex-col justify-start">

  {/* ✅ COPY BUTTON */}
  {/* {resultId && (
    <button
      onClick={handleShare}
      className="mb-4 bg-white text-black px-4 py-2 rounded"
    >
      {copied ? "✅ Copied!" : "🔗 Copy & Open Report"}
    </button>
  )} */}

  {/* ✅ RESULT DISPLAY */}
  {resultId ? (
    <div className="w-full bg-white/10 backdrop-blur-xl p-6 rounded-xl">
      <Result id={resultId} />
    </div>
  ) : (
    <div className="text-center flex flex-col items-center justify-center gap-4 opacity-90">

      <img
        src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
        alt="analysis"
        className="w-28 h-28 opacity-80"
      />

      <div className="text-center space-y-3">
        <div className="text-5xl">📊</div>
        <p className="text-lg font-semibold">
          Your AI cost insights will appear here
        </p>
        <p className="text-white/60 text-sm">
          Fill the form and click “Get Audit Report”
        </p>
      </div>

    </div>
  )}

</div>

    </div>
  </div>
);
}