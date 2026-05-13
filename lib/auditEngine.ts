import { pricing } from "./pricing";
export type Tool = keyof typeof pricing;
export type Plan<T extends Tool> = keyof typeof pricing[T];

export function generateSummary(audit: any) {
  if (!audit) return "Analyzing your data..."; // ✅ FIX

  const savings = audit.totalSavings || 0;

  if (savings > 500) {
    return "You are significantly overpaying. Major cost savings possible.";
  }

  if (savings > 50) {
    return "There are clear opportunities to reduce your AI spend.";
  }

  if (savings > 0) {
    return "Minor optimizations can reduce your costs slightly.";
  }

  return "Your current setup looks efficient.";
}

export function auditTools(data: any) {
  if (!data) {
    return {
      results: [],
      totalSavings: 0,
      efficiencyScore: 0,
    };
  }

  const tool = data.tool;
  const plan = data.plan;
  const seats = Number(data.seats);
  const teamSize = Number(data.teamSize || seats);
  const spend = Number(data.spend);
  const useCase = data.useCase;

  // let savings = 0;
  // let recommendation = "Looks good";
  // let reason = "No issues found";

  // // your logic...

  // return {
  //   results: [
  //     {
  //       tool,
  //       currentPlan: plan,
  //       recommendation,
  //       savings,
  //       reason,
  //     },
  //   ],
  //   totalSavings: savings,
  //   efficiencyScore: Math.max(0, 100 - savings),
  // };
  let savings = 0;
let recommendation = "Your plan looks optimal.";
let reason = "No major inefficiencies detected.";

// 🔥 RULE 1: Overpaying for seats
if (seats > teamSize) {
  const extra = seats - teamSize;
  savings += extra * 10;
  recommendation = "Reduce unused seats";
  reason = "You are paying for seats that are not being used.";
}

// 🔥 RULE 2: Wrong plan for small team
if (tool === "ChatGPT" && plan === "Team" && seats <= 2) {
  savings += 10 * seats;
  recommendation = "Switch to ChatGPT Plus";
  reason = "Team plan is unnecessary for small teams.";
}

// 🔥 RULE 3: Mixed use optimization
if (useCase === "mixed") {
  recommendation = "Use a combination of tools instead of one plan";
}

// 🔥 Efficiency score
const efficiencyScore = Math.max(0, 100 - savings);

return {
  totalSavings: savings,
  efficiencyScore,
  results: [
    {
      recommendation,
      reason,
    },
  ],
};
}