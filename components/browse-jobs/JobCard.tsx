import Link from "next/link"
import { Banknote, Bookmark, BriefcaseBusiness } from "lucide-react"
import type { NewJob } from "@/app/dashboard/recruiter/jobs/new/page"

// 90000 → "90k", 25 → "25"
const fmtSalary = (value: string) =>
  Number(value) >= 1000 ? `${Number(value) / 1000}k` : value

// Job card from the "Public / Browse Jobs" Figma frame.
// `badge` is optional (Figma's "Easy Apply" green / "Hot Job" amber chip).
// `href` makes the whole card a link to the job details page — the bookmark
// button stays clickable on top of it.
export function JobCard({
  job,
  badge,
  href,
}: {
  job: NewJob
  badge?: { label: string; tone: "green" | "amber" }
  href?: string
}) {
  const badgeColors =
    badge?.tone === "green"
      ? "border-[#22c55e]/30 bg-[#22c55e]/10 text-[#22c55e]"
      : "border-[#f59e0b]/30 bg-[#f59e0b]/10 text-[#f59e0b]"

  return (
    <article className="relative border border-white/[0.07] bg-[#141418] p-[25px] shadow-[0_1px_2px_0_rgba(0,0,0,0.35),inset_0_1px_0_0_rgba(255,255,255,0.04)]">
      {href && (
        <Link
          href={href}
          aria-label={`View details for ${job.title}`}
          className="absolute inset-0 outline-none"
        />
      )}
      <div className="flex gap-5">
        {/* Company logo tile */}
        <div className="flex size-16 shrink-0 items-center justify-center rounded-[8px] border border-white/[0.07] bg-[#222228]">
          <span className="flex size-10 items-center justify-center text-xl font-semibold text-[#ededef]">
            {job.company.charAt(0).toUpperCase()}
          </span>
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <h3 className="truncate text-[22px] leading-[28px] font-semibold tracking-[-0.4px] text-[#ededef]">
                {job.title}
              </h3>
              <p className="mt-2 truncate text-base leading-[27px] font-semibold text-[#6e6e78]">
                {job.company} • {job.location}
                {job.isRemote ? " (Remote)" : ""}
              </p>
            </div>

            <button
              type="button"
              aria-label="Save job"
              onClick={() => {}}
              className="relative z-10 flex size-10 shrink-0 items-center justify-center outline-none"
            >
              <Bookmark className="size-[18px] text-[#8e9192]" strokeWidth={2} />
            </button>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <span className="inline-flex h-[30px] items-center gap-2 border border-white/[0.1] bg-[#1a1a1f] px-3 text-[13px] leading-5 font-medium whitespace-nowrap text-[#ededef]">
              <Banknote className="size-3.5 text-[#e5e2e3]" strokeWidth={2} />
              ${fmtSalary(job.minSalary)} - ${fmtSalary(job.maxSalary)}
            </span>

            <span className="inline-flex h-[30px] items-center gap-2 border border-white/[0.1] bg-[#1a1a1f] px-3 text-[13px] leading-5 font-medium whitespace-nowrap text-[#ededef]">
              <BriefcaseBusiness className="size-3.5 text-[#e5e2e3]" strokeWidth={2} />
              {job.jobType}
            </span>

            {badge && (
              <span
                className={`inline-flex h-[30px] items-center gap-2 rounded-[4px] border px-3 text-[13px] leading-5 font-medium whitespace-nowrap ${badgeColors}`}
              >
                <BriefcaseBusiness className="size-3.5" strokeWidth={2} />
                {badge.label}
              </span>
            )}
          </div>
        </div>
      </div>
    </article>
  )
}
