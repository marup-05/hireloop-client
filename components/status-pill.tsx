
import type { ApplicationStatus } from "@/lib/api/applications"

// Shared status → style map, so every status pill in the app looks the same
const statusStyles: Record<ApplicationStatus, string> = {
  Applied: "border-white/[0.07] bg-[#a1a4aa]/15 text-[#a0a0ab]",
  Review: "border-[#f59e0b]/30 bg-[#f59e0b]/15 text-[#f59e0b]",
  Shortlisted: "border-[#60a5fa]/30 bg-[#60a5fa]/15 text-[#60a5fa]",
  Rejected: "border-[#ef4444]/30 bg-[#ef4444]/15 text-[#ef4444]",
  Offered: "border-[#22c55e]/30 bg-[#22c55e]/15 text-[#22c55e]",
}

// Small pill showing an application status with its accent color
export function StatusPill({ status }: { status: ApplicationStatus }) {
  return (
    <span
      className={`inline-flex h-[22px] items-center border px-[11px] text-[12px] leading-4 font-medium whitespace-nowrap ${
        statusStyles[status]
      }`}
    >
      {status}
    </span>
  )
}
