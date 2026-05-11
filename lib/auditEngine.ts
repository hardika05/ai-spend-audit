export function auditTools(data: any) {
  const results: any[] = [];
  let totalSavings = 0;

  const tool = data.tool;
  const plan = (data.plan || "").toLowerCase();
  const seats = Number(data.seats) || 0;
  const spend = Number(data.spend) || 0;
  const useCase = data.useCase || "mixed";

  let recommendation = "Looks reasonable, but monitor usage";
  let savings = 0;
  let reason =
    "No major inefficiencies found, but minor optimizations may exist";

  if (tool === "ChatGPT" && plan === "team" && seats <= 2) {
    recommendation = "Switch to ChatGPT Plus";
    savings = 10 * seats;
    reason = "Team plan is too expensive for small teams";
  } else if (useCase === "writing" && tool === "ChatGPT") {
    recommendation = "Consider Claude Pro for writing tasks";
    savings = 5 * seats;
    reason = "Claude is better for writing";
  } else if (useCase === "coding" && tool === "ChatGPT") {
    recommendation = "Use GitHub Copilot for coding";
    savings = 8 * seats;
    reason = "Copilot is optimized for coding";
  } else if (tool === "Claude" && seats >= 4) {
    recommendation = "Use team/bulk pricing";
    savings = 10 * seats;
    reason = "Bulk pricing is cheaper";
  } else if (tool === "Claude" && spend > 70) {
    recommendation = "Review your plan";
    savings = 10;
    reason = "You may be overpaying";
  } else {
    recommendation = "Review your usage";
    savings = 0;
    reason = "No optimization rule matched";
  }

  results.push({
    tool,
    currentPlan: plan,
    recommendation,
    savings,
    reason,
  });

  totalSavings += savings;

  return { results, totalSavings };
}

export function generateSummary(audit: any) {
  const savings = audit.totalSavings;

  if (savings > 500)
    return "You are significantly overpaying.";
  if (savings > 50)
    return "There are clear cost-saving opportunities.";
  if (savings > 0)
    return "Minor optimizations possible.";

  return "Your setup looks efficient.";
}