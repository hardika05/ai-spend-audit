// import Result from "@/components/Result";

// export default function Page({ params }: any) {
//   return (
//     <div className="min-h-screen bg-gradient-to-br from-indigo-500 to-pink-500 p-6">
//       <Result id={params.id} />
//     </div>
//   );
// }

// export async function generateMetadata({ params }: any) {
//   return {
//     title: "AI Spend Audit Result",
//     description: "See how much you can save on AI tools",
//     openGraph: {
//       title: "AI Spend Audit",
//       description: "Check your AI cost savings",
//       images: ["/og-image.png"],
//     },
//     twitter: {
//       card: "summary_large_image",
//     },
//   };
// }

// import Result from "@/components/Result";

// export default function Page({ params }: { params: { id: string } }) {
//   return (
//     <div className="min-h-screen bg-gradient-to-br from-indigo-500 to-pink-500 p-6">
//       <Result id={params.id} />
//     </div>
//   );
// }

// export function generateMetadata({ params }: { params: { id: string } }) {
//   return {
//     title: "AI Spend Audit Result",
//     description: "See how much you can save on AI tools",
//     openGraph: {
//       title: "AI Spend Audit",
//       description: "Check your AI cost savings",
//       images: ["/og-image.png"],
//     },
//     twitter: {
//       card: "summary_large_image",
//     },
//   };
// }

// import Result from "@/components/Result";

// export default async function Page({ params }: any) {
//   const { id } = await params; // ✅ MUST

//   return (
//     <div className="min-h-screen p-6">
//       <Result id={id} />
//     </div>
//   );
// }

// export async function generateMetadata({ params }: any) {
//   const { id } = await params; // ✅ ALSO REQUIRED

//   return {
//     title: "AI Spend Audit Result",
//     description: "See how much you can save on AI tools",
//     metadataBase: new URL("http://localhost:3000"), // ✅ FIX WARNING
//     openGraph: {
//       title: "AI Spend Audit",
//       description: "Check your AI cost savings",
//       images: ["/og-image.png"],
//     },
//     twitter: {
//       card: "summary_large_image",
//     },
//   };
// }



// import Result from "@/components/Result";
import AuditPage from "@/app/audit/page";

// export default async function Page({ params }: any) {
//   const { id } = await params;

//   return <AuditPage initialId={id} />;
// }

import { redirect } from "next/navigation";

export default function Page() {
  // ✅ ALWAYS redirect to audit page on refresh
  redirect("/audit");
}

export async function generateMetadata({ params }: any) {
  const { id } = await params;

  return {
    title: "AI Spend Audit Result",
    description: "See how much you can save on AI tools",
    metadataBase: new URL("http://localhost:3000"),
    openGraph: {
      title: "AI Spend Audit",
      description: "Check your AI cost savings",
      images: ["/og-image.png"],
    },
    twitter: {
      card: "summary_large_image",
    },
  };
}