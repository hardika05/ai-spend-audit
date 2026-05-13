// "use client";

// import { useEffect, useState } from "react";
// import { supabase } from "@/lib/supabase";
// import { auditTools, generateSummary } from "@/lib/auditEngine";

// export default function Result({ id }: { id: string }) {
//   const [data, setData] = useState<any>(null);
//   // const [audit, setAudit] = useState<any>(null);
// //   const result = auditTools(audit);
//   // const summary = generateSummary(audit);
// //   if (!audit) {
// //   return <p className="text-white">Analyzing your data...</p>;
// // }
// //   useEffect(() => {
// //     const fetchData = async () => {
// //       const { data, error } = await supabase
// //         .from("audits")
// //         .select("*")
// //         .eq("id", id)
// //         .single();

// //       if (data) {
// //         setData(data.data);
// //         const result = auditTools(data.data);
// //         setAudit(data.data);
// //       }
// //     };

// //     fetchData();
// //   }, [id]);
// const [audit, setAudit] = useState<any>(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       const { data } = await supabase
//         .from("audits")
//         .select("*")
//         .eq("id", id)
//         .single();

//       if (data) {
//         setAudit(data.data); // 👈 important
//       }
//     };

//     fetchData();
//   }, [id]);

//   // if (!data || !audit) return <p>Loading...</p>;
//   if (!data || !audit) {
//   return <p className="text-white">Analyzing your data...</p>;
// }
//   if (!audit) {
//     return <p className="text-white">Analyzing...</p>;
//   }

//   const result = auditTools(audit);
//   return (
//   <div className="bg-white/10 backdrop-blur-lg p-5 rounded-xl border border-white/20 text-white transition hover:scale-[1.02]">

//     <h2 className="text-xl font-bold">Audit Result</h2>

//     {/* 📊 Current Usage */}
//     <div>
//       <h3 className="text-lg font-semibold">📊 Current Usage</h3>
//       <p>Tool: {data.tool}</p>
//       <p>Spend: ${data.spend}</p>
//       <p>Seats: {data.seats}</p>
//     </div>

//     {/* 💡 Recommendation */}
//     <div>
//       <h3 className="text-lg font-semibold">💡 Recommendation</h3>
//       <p>👉 {audit.results[0].recommendation}</p>

//       {/* Badge */}
//       <span className="bg-green-500/20 text-green-300 px-2 py-1 rounded inline-block mt-2">
//         {audit.totalSavings > 0 ? "Needs Optimization" : "Optimal"}
//       </span>
//     </div>

//     {/* 💰 Savings */}
//     <div>
//       <h3 className="text-lg font-semibold">💰 Savings</h3>
//       <p className="text-green-300 font-bold">
//         ${audit.totalSavings} / month
//       </p>
//       <p className="text-sm text-white/70">
//         {audit.results[0].reason}
//       </p>
//     </div>
//     <p className="mt-2">
//   ⚡ Efficiency Score: {audit.efficiencyScore}/100
// </p>

// <div className="w-full bg-white/20 rounded h-3 mt-2">
//   <div
//     className="bg-green-400 h-3 rounded"
//     style={{ width: `${audit.efficiencyScore}%` }}
//   />
// </div>
// <p className="text-lg font-semibold mb-4">
//   {summary}
// </p>
//   </div>
// );
// }

// "use client";

// import { useEffect, useState } from "react";
// import { supabase } from "@/lib/supabase";
// import { auditTools, generateSummary } from "@/lib/auditEngine";

// export default function Result({ id }: { id: string }) {
//   const [audit, setAudit] = useState<any>(null);
//   const [aiSummary, setAiSummary] = useState<string | null>(null);

//   const [emailSent, setEmailSent] = useState(false);

// useEffect(() => {
//   if (!audit || emailSent) return;

//   const sendEmail = async () => {
//     await fetch("/api/send-email", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         email: audit.email,
//         savings: result.totalSavings,
//       }),
//     });

//     setEmailSent(true);
//   };

//   sendEmail();
// }, [audit]);

//   useEffect(() => {
//   if (!audit) return;

//   const fetchSummary = async () => {
//     try {
//       const res = await fetch("/api/summary", {
//         method: "POST",
//         body: JSON.stringify({
//           ...audit,
//           savings: result.totalSavings,
//           recommendation: result.results[0].recommendation,
//           reason: result.results[0].reason,
//         }),
//       });

//       const data = await res.json();

//       if (data.summary) {
//         setAiSummary(data.summary);
//       } else {
//         setAiSummary(generateSummary(result)); // fallback
//       }

//     } catch {
//       setAiSummary(generateSummary(result)); // fallback
//     }
//   };

//   fetchSummary();
// }, [audit]);
//   // 🔥 Fetch data from Supabase
//   useEffect(() => {
//     const fetchData = async () => {
//       const { data, error } = await supabase
//         .from("audits")
//         .select("*")
//         .eq("id", id)
//         .single();

//       if (error) {
//         console.log(error);
//         return;
//       }

//       if (data) {
//         setAudit(data.data); // 👈 important (your form data)
//       }
//     };

//     fetchData();
//   }, [id]);

//   // ⛔ Stop rendering until data is ready
//   if (!audit) {
//     return (
//       <p className="text-white animate-pulse">
//         Analyzing your data...
//       </p>
//     );
//   }

//   // ✅ Run audit engine
//   const result = auditTools(audit);

//   // ✅ Generate summary
//   const summary = generateSummary(result);
//   const monthly = result.totalSavings;
// const annual = monthly * 12;
// const handleNotify = async () => {
//   await supabase.from("leads").insert([
//     { email: audit.email }
//   ]);

//   alert("You’ll be notified when new optimizations are available 🚀");
// };
//   return (
//   <div className="space-y-4">

//     {/* 💸 HERO */}
//     <div className="bg-white/10 backdrop-blur-lg p-6 rounded-xl border border-white/20 text-center">
//       <h2 className="text-2xl font-bold mb-2">💸 Your Savings Potential</h2>

//       <p className="text-4xl font-extrabold text-green-300">
//         ${monthly} / month
//       </p>

//       <p className="text-lg text-white/70">
//         ${annual} per year
//       </p>
//     </div>

//     {/* 🚀 / 👍 CONDITIONAL MESSAGE */}
//     {monthly > 500 && (
//       <div className="bg-green-500/20 border border-green-400 p-4 rounded-lg text-green-200">
//         🚀 You’re overspending significantly. Credex can help you capture these savings automatically.
//       </div>
//     )}

//     {monthly <= 100 && (
//       <div className="bg-blue-500/20 border border-blue-400 p-4 rounded-lg text-blue-200">
//         👍 You’re already spending well. Just click the button in below and We’ll notify you when better optimizations become available.
//       </div>
//     )}

//     {/* 📊 RESULT CARD */}
//     <div className="bg-white/10 backdrop-blur-lg p-5 rounded-xl border border-white/20 text-white space-y-4">

//       <h2 className="text-xl font-bold">Audit Result</h2>

//       {/* 📊 BREAKDOWN */}
//       <div className="bg-white/10 p-5 rounded-xl border border-white/20">
//         <h3 className="text-lg font-semibold mb-3">📊 Breakdown</h3>

//         <div className="bg-white/5 p-4 rounded-lg space-y-1">
//           <p><b>Tool:</b> {audit.tool}</p>
//           <p><b>Current Spend:</b> ${audit.spend}</p>
//           <p><b>Recommended Action:</b> {result.results[0].recommendation}</p>
//           <p><b>Savings:</b> ${result.totalSavings}/month</p>
//           <p className="text-sm text-white/70">
//             {result.results[0].reason}
//           </p>
//         </div>
//       </div>

//       {/* ⚡ Efficiency */}
//       <div>
//         <p>⚡ Efficiency Score: {result.efficiencyScore}/100</p>

//         <div className="w-full bg-white/20 rounded h-3 mt-2">
//           <div
//             className="bg-green-400 h-3 rounded"
//             style={{ width: `${result.efficiencyScore}%` }}
//           />
//         </div>
//       </div>

//      <p className="text-lg font-semibold text-center">
//   {aiSummary || "Generating AI insights..."}
// </p>

//       {/* 📩 CTA */}
//       <div className="text-center">
//         <button
//   onClick={handleNotify}
//   className="bg-white text-black px-4 py-2 rounded font-semibold"
// >
//   📩 Notify Me
// </button>
//       </div>

//     </div>

//   </div>
// );
// }

// export default function Result({ id }: { id: string }) {
//   const [auditData, setAuditData] = useState<any>(null);
//   const [emailSent, setEmailSent] = useState(false);
//   const [aiSummary, setAiSummary] = useState<string>("");

//   // 🔥 Fetch data
//   useEffect(() => {
//     const fetchData = async () => {
//       const { data, error } = await supabase
//         .from("audits")
//         .select("*")
//         .eq("id", id)
//         .single();

//       if (error) {
//         console.log(error);
//         return;
//       }

//       if (data) {
//         setAuditData(data.data); // form data
//       }
//     };

//     fetchData();
//   }, [id]);

  // // ⛔ Wait until data loads
  // if (!auditData) {
  //   return <p className="text-white">Analyzing your data...</p>;
  // }

  // // ✅ Run audit engine
  // const result = auditTools(auditData);

  // const monthly = result.totalSavings;
  // const annual = monthly * 12;

  // // 🤖 AI Summary + Email
  // useEffect(() => {
  //   if (!auditData || emailSent) return;

  //   const runAI = async () => {
  //     try {
  //       // 🔥 Call AI summary API
  //       const res = await fetch("/api/summary", {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify({
  //           ...auditData,
  //           savings: result.totalSavings,
  //           recommendation: result.results[0].recommendation,
  //           reason: result.results[0].reason,
  //         }),
  //       });

  //       const data = await res.json();

  //       if (data.summary) {
  //         setAiSummary(data.summary);
  //       } else {
  //         setAiSummary(generateSummary(result)); // fallback
  //       }

  //       // 📧 Send email
  //       await fetch("/api/send-email", {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify({
  //           email: auditData.email,
  //           savings: result.totalSavings,
  //         }),
  //       });

  //       setEmailSent(true);

  //     } catch {
  //       setAiSummary(generateSummary(result)); // fallback
  //     }
  //   };

  //   runAI();
  // }, [auditData]);

// 


"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { auditTools, generateSummary } from "@/lib/auditEngine";

export default function Result({ id }: { id: string }) {
  const router = useRouter();

  const [copied, setCopied] = useState(false);
  const [auditData, setAuditData] = useState<any>(null);
  const [emailSent, setEmailSent] = useState(false);
  const [aiSummary, setAiSummary] = useState("");

  // ✅ FETCH DATA
useEffect(() => {
  const fetchData = async () => {
    if (!id) {
      console.error("❌ Invalid ID");
      return;
    }

    console.log("📡 Fetching ID:", id);

    const { data, error } = await supabase
      .from("audits")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      console.error("❌ Supabase error:", error);
      return;
    }

    if (data) {
      console.log("✅ Fetched FULL:", data);
      console.log("✅ Fetched INNER:", data.data);

      // ✅ IMPORTANT FIX
      setAuditData(data.data); // this is your actual formData
    }
  };

  fetchData();
}, [id]);

  // ✅ AI + EMAIL
  useEffect(() => {
    if (!auditData || emailSent) return;

    const runAI = async () => {
      try {
        const result = auditTools(auditData);

        const res = await fetch("/api/summary", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...auditData,
            savings: result.totalSavings,
            recommendation: result.results[0].recommendation,
            reason: result.results[0].reason,
          }),
        });

        const data = await res.json();

        if (data.summary) {
          setAiSummary(data.summary);
        } else {
          setAiSummary(generateSummary(result));
        }

        await fetch("/api/send-email", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: auditData.email,
            savings: result.totalSavings,
          }),
        });

        setEmailSent(true);
      } catch (err) {
        console.error("AI error:", err);
        const result = auditTools(auditData);
        setAiSummary(generateSummary(result));
      }
    };

    runAI();
  }, [auditData, emailSent]);


  // ✅ CALCULATIONS
 // ⛔ Wait for data
if (!auditData) {
  return (
    <div className="text-white text-center mt-10">
      ⏳ Analyzing your data...
    </div>
  );
}

// ✅ NOW SAFE
const result = auditTools(auditData);
console.log("RESULT:", result);

const monthly = result.totalSavings;
const annual = monthly * 12;

  // ✅ COPY FUNCTION (FIXED)
  const handleCopy = async () => {
    // const url = `${window.location.origin}/result/${id}`;
    const url = `${window.location.origin}/audit?resultId=${id}`;
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Copy failed", err);
    }
  };
  console.log("AUDIT DATA:", auditData);
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 to-pink-500 p-6">

      {/* 💸 HERO */}
      <div className="bg-white/10 backdrop-blur-lg p-6 rounded-xl border border-white/20 text-center">
        <h2 className="text-2xl font-bold mb-2">💸 Your Savings Potential</h2>

        <p className="text-4xl font-extrabold text-green-300">
          ${monthly} / month
        </p>

        <p className="text-lg text-white/70">
          ${annual} per year
        </p>
      </div>

      {/* 📊 BREAKDOWN */}
      <div className="bg-white/10 p-5 rounded-xl border border-white/20">
        <h3 className="text-lg font-semibold mb-3">📊 Breakdown</h3>

        <div className="bg-white/5 p-4 rounded-lg space-y-1">
          <p><b>Tool:</b> {auditData.tool}</p>
          <p><b>Plan:</b> {auditData.plan}</p>
          <p><b>Current Spend:</b> ${auditData.spend}</p>

          <p><b>Action:</b> {result.results[0].recommendation}</p>

          <p className="text-green-300 font-bold">
            💰 ${result.totalSavings}/month
          </p>

          <p className="text-sm text-white/70">
            {result.results[0].reason}
          </p>
        </div>
      </div>

      {/* ⚡ Efficiency */}
      <div>
        <p>⚡ Efficiency Score: {result.efficiencyScore}/100</p>

        <div className="w-full bg-white/20 rounded h-3 mt-2">
          <div
            className="bg-green-400 h-3 rounded"
            style={{ width: `${result.efficiencyScore}%` }}
          />
        </div>
      </div>

      {/* 🧠 AI SUMMARY */}
      <div className="bg-white/10 p-5 rounded-xl border border-white/20">
        <h3 className="text-lg font-semibold mb-2">🧠 AI Summary</h3>
        <p>{aiSummary}</p>
      </div>

      {/* 🚀 CTA */}
      {monthly > 500 ? (
        <div className="bg-yellow-300 text-black p-4 rounded-xl text-center font-semibold">
          🚀 High savings detected — Credex can help you optimize this further.
        </div>
      ) : (
        <div className="bg-white/10 p-4 rounded-xl text-center">
          👍 You're spending well.
          <br />
          <span className="text-sm text-white/70">
            Get notified when new optimizations are available.
          </span>
        </div>
      )}

      {/* 🔗 SHARE */}
      <button
        onClick={handleCopy}
        className="bg-white text-black px-4 py-2 rounded"
      >
        {copied ? "✅ Copied!" : "🔗 Copy Share Link"}
      </button>

    </div>
  );
}