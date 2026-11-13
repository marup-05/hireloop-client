import {
  Building2,
  ChevronLeft,
  ChevronRight,
  Download,
  PanelLeft,
  PanelRight,
  Search,
  User,
} from "lucide-react"
import type { Application, ApplicationStatus } from "@/lib/api/applications"

// "Seeker / My Applications" Figma frame — shared card chrome
const cardClass =
  "border border-white/[0.07] bg-[#141418] shadow-[0_1px_2px_0_rgba(0,0,0,0.35),inset_0_1px_0_0_rgba(255,255,255,0.04)]"

// ---- dummy data (real data will be loaded from the API later) -------------

const hoursAgo = (h: number) => new Date(Date.now() - h * 3_600_000).toISOString()

const dummyApplications: Application[] = [
  {
    _id: "app-1",
    jobId: "job-1",
    userId: "user-1",
    email: "applicant@hireloop.dev",
    jobTitle: "Senior Frontend Engineer",
    companyName: "Stark Industries",
    jobType: "Full-time",
    workplace: "Remote",
    appliedAt: hoursAgo(2),
    status: "Applied",
  },
  {
    _id: "app-2",
    jobId: "job-2",
    userId: "user-1",
    email: "applicant@hireloop.dev",
    jobTitle: "Product Designer",
    companyName: "Cyberdyne Systems",
    jobType: "Contract",
    workplace: "Hybrid",
    appliedAt: hoursAgo(24),
    status: "Review",
  },
  {
    _id: "app-3",
    jobId: "job-3",
    userId: "user-1",
    email: "applicant@hireloop.dev",
    jobTitle: "Lead Data Scientist",
    companyName: "Wayne Enterprises",
    jobType: "Full-time",
    workplace: "On-site",
    appliedAt: hoursAgo(96),
    status: "Shortlisted",
  },
  {
    _id: "app-4",
    jobId: "job-4",
    userId: "user-1",
    email: "applicant@hireloop.dev",
    jobTitle: "Cloud Architect",
    companyName: "Oscorp Tech",
    jobType: "Full-time",
    workplace: "Remote",
    appliedAt: hoursAgo(24 * 7),
    status: "Rejected",
  },
  {
    _id: "app-5",
    jobId: "job-5",
    userId: "user-1",
    email: "applicant@hireloop.dev",
    jobTitle: "AI Research Engineer",
    companyName: "Hooli Corp",
    jobType: "Full-time",
    workplace: "Hybrid",
    appliedAt: hoursAgo(24 * 14),
    status: "Offered",
  },
]

// ---- helpers ---------------------------------------------------------------

// "2 hours ago" / "1 day ago" / "2 weeks ago" (the Figma "Applied" column)
const fmtApplied = (iso: string) => {
  const minutes = Math.max(1, Math.floor((Date.now() - new Date(iso).getTime()) / 60_000))
  if (minutes < 60) return `${minutes} minute${minutes === 1 ? "" : "s"} ago`
  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `${hours} hour${hours === 1 ? "" : "s"} ago`
  const days = Math.floor(hours / 24)
  if (days < 7) return `${days} day${days === 1 ? "" : "s"} ago`
  const weeks = Math.floor(days / 7)
  return `${weeks} week${weeks === 1 ? "" : "s"} ago`
}

// Status pill — exact fills/strokes/text from the Figma rows
const statusPill: Record<ApplicationStatus, string> = {
  Applied: "border-white/[0.07] bg-[#a1a4aa]/15 text-[#a0a0ab]",
  Review: "border-[#f59e0b]/30 bg-[#f59e0b]/15 text-[#f59e0b]",
  Shortlisted: "border-[#60a5fa]/30 bg-[#60a5fa]/15 text-[#60a5fa]",
  Rejected: "border-[#ef4444]/30 bg-[#ef4444]/15 text-[#ef4444]",
  Offered: "border-[#22c55e]/30 bg-[#22c55e]/15 text-[#22c55e]",
}

// 32×32 logo tile fallback — no logo is stored, so a colored tile with a
// building icon renders in the exact Figma slot (palette from the frame)
const logoPalette = [
  { bg: "#c6c6c7", fg: "#2f3131" },
  { bg: "#474746", fg: "#ffffff" },
  { bg: "#222228", fg: "#ffffff" },
  { bg: "#93000a", fg: "#ffb4ab" },
  { bg: "#222228", fg: "#ffffff" },
]

const LogoTile = ({ index }: { index: number }) => {
  const { bg, fg } = logoPalette[index % logoPalette.length]

  return (
    <span
      className="flex size-8 shrink-0 items-center justify-center rounded-[4px]"
      style={{ backgroundColor: bg }}
    >
      <Building2 className="size-4" style={{ color: fg }} strokeWidth={2} />
    </span>
  )
}

// Stats tile ("Stats Overview - Bento Layout" in the Figma frame)
const StatTile = ({
  label,
  value,
  valueClass,
}: {
  label: string
  value: string
  valueClass: string
}) => (
  <div
    className={`flex h-[86px] flex-col justify-center gap-2 px-[25px] ${cardClass}`}
  >
    <p className="text-[13px] leading-5 text-[#a0a0ab]">{label}</p>
    <p
      className={`text-[26px] leading-8 font-semibold tracking-[-0.5px] ${valueClass}`}
    >
      {value}
    </p>
  </div>
)

// Dummy stats — will come from the real application data later
const stats = [
  { label: "Total Applied", value: "24", valueClass: "text-[#ededef]" },
  { label: "Shortlisted", value: "8", valueClass: "text-[#ededef]" },
  { label: "Interviews", value: "3", valueClass: "text-[#f59e0b]" },
  { label: "Success Rate", value: "12%", valueClass: "text-[#22c55e]" },
]

const tableHeadings = ["Job Title", "Company", "Applied", "Status", "Action"]

// Column widths from the Figma table (1094px after the 12px card insets)
const colWidths = ["w-[30.7%]", "w-[20.5%]", "w-[15.4%]", "w-[17.9%]", "w-[15.5%]"]

const MyApplicationsPage = () => {
  return (
    <div className="relative min-h-screen w-full min-w-0 overflow-hidden bg-[#0e0e11]">
      {/* Figma decorative glow (bottom-right corner) */}
      <span
        aria-hidden
        className="pointer-events-none absolute -right-24 -bottom-24 size-96 rounded-full bg-white/5 blur-[100px]"
      />

      {/* Top nav bar */}
      <header className="relative flex h-14 items-center justify-between gap-4 border-b border-white/[0.07] px-4 sm:px-8">
        {/* Search */}
        <div className="flex h-9 w-full max-w-[320px] min-w-0 items-center gap-3 border border-white/[0.07] bg-[#0c0c0f] px-3">
          <Search className="size-[15px] shrink-0 text-[#c4c7c8]" strokeWidth={2} />
          <input
            type="text"
            placeholder="Search applications..."
            className="w-full min-w-0 bg-transparent text-[13px] leading-5 text-[#ededef] outline-none placeholder:text-[#828997]"
          />
        </div>

        <div className="flex shrink-0 items-center gap-1">
          <button
            type="button"
            aria-label="Toggle panel"
            className="flex size-9 items-center justify-center outline-none"
          >
            <PanelLeft className="size-[15px] text-[#c4c7c8]" strokeWidth={2} />
          </button>
          <button
            type="button"
            aria-label="Toggle layout"
            className="flex size-9 items-center justify-center outline-none"
          >
            <PanelRight className="size-[15px] text-[#c4c7c8]" strokeWidth={2} />
          </button>
          {/* Avatar — falls back to an icon until a profile image exists */}
          <span className="ml-1 flex size-8 shrink-0 items-center justify-center rounded-full border border-white/[0.07] bg-[#222228]">
            <User className="size-4 text-[#c4c7c8]" strokeWidth={2} />
          </span>
        </div>
      </header>

      {/* Content */}
      <div className="relative px-4 pt-6 pb-16 sm:px-8">
        {/* Header section */}
        <div className="flex min-w-0 flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div className="min-w-0">
            <h1 className="text-[22px] leading-7 font-semibold tracking-[-0.4px] text-[#ededef]">
              My Applications
            </h1>
            <p className="mt-2 text-[13px] leading-5 text-[#ededef]">
              Track your job applications and interview progress in real-time.
            </p>
          </div>

          <div className="flex shrink-0 flex-wrap items-center gap-3">
            {/* Active / Archived segmented control */}
            <div className="flex items-center border border-white/[0.07] bg-[#1a1a1f] p-[5px]">
              <button
                type="button"
                className="h-8 border border-white/[0.07] px-4 text-[13px] leading-5 text-[#ededef] outline-none"
              >
                Active
              </button>
              <button
                type="button"
                className="h-8 px-4 text-[13px] leading-5 text-[#a0a0ab] outline-none"
              >
                Archived
              </button>
            </div>

            {/* Export PDF */}
            <button
              type="button"
              className="flex h-[42px] items-center gap-2 bg-[#fafafa] px-4 text-[13px] leading-5 font-medium text-[#0b0b0c] shadow-[0_1px_2px_0_rgba(0,0,0,0.35)] outline-none active:translate-y-px"
            >
              <Download className="size-3 text-[#2f3131]" strokeWidth={2} />
              Export PDF
            </button>
          </div>
        </div>

        {/* Stats overview — bento layout */}
        <div className="mt-6 grid grid-cols-2 gap-6 lg:grid-cols-4">
          {stats.map((stat) => (
            <StatTile key={stat.label} {...stat} />
          ))}
        </div>

        {/* Main table */}
        <div className={`mt-6 overflow-hidden ${cardClass}`}>
          <div className="w-full overflow-x-auto">
            <table className="w-full min-w-[900px] table-fixed border-collapse">
              <colgroup>
                {colWidths.map((width, index) => (
                  <col key={index} className={width} />
                ))}
              </colgroup>

              <thead>
                <tr className="bg-[#1a1a1f]">
                  {tableHeadings.map((heading, index) => (
                    <th
                      key={heading}
                      className={`h-11 px-4 text-[12px] leading-4 font-medium whitespace-nowrap text-[#6e6e78] ${
                        index === 0 ? "pl-7 text-left" : ""
                      } ${index === tableHeadings.length - 1 ? "pr-7 text-right" : "text-left"}`}
                    >
                      {heading}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody className="divide-y divide-white/[0.07]">
                {dummyApplications.map((application, index) => (
                  <tr key={application._id} className="h-16">
                    {/* Job title (+ type • workplace) */}
                    <td className="px-4 pl-7">
                      <div className="flex min-w-0 items-center gap-3">
                        <LogoTile index={index} />
                        <div className="min-w-0">
                          <p className="truncate text-[13px] leading-5 font-medium text-[#ededef]">
                            {application.jobTitle}
                          </p>
                          <p className="truncate text-[12px] leading-[15px] text-[#a0a0ab]">
                            {application.jobType} • {application.workplace}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Company */}
                    <td className="truncate px-4 text-[13px] leading-5 text-[#ededef]">
                      {application.companyName}
                    </td>

                    {/* Applied */}
                    <td className="truncate px-4 text-[13px] leading-5 text-[#a0a0ab]">
                      {fmtApplied(application.appliedAt)}
                    </td>

                    {/* Status */}
                    <td className="px-4">
                      <span
                        className={`inline-flex h-[22px] items-center border px-[11px] text-[12px] leading-4 font-medium whitespace-nowrap ${statusPill[application.status]}`}
                      >
                        {application.status}
                      </span>
                    </td>

                    {/* Action */}
                    <td className="px-4 pr-7 text-right">
                      <button
                        type="button"
                        className="text-[13px] leading-5 text-[#ededef] outline-none"
                      >
                        Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex h-[65px] items-center justify-between gap-4 border-t border-white/[0.07] bg-[#1a1a1f] px-4 sm:px-6">
            <p className="truncate text-[13px] leading-5 text-[#a0a0ab]">
              Showing 1-5 of 24 applications
            </p>

            <div className="flex shrink-0 items-center gap-1.5">
              <button
                type="button"
                aria-label="Previous page"
                className="flex size-8 items-center justify-center rounded-[8px] border border-white/[0.07] outline-none"
              >
                <ChevronLeft className="size-4 text-[#a0a0ab]" strokeWidth={2} />
              </button>
              <button
                type="button"
                className="flex size-8 items-center justify-center rounded-[8px] bg-white text-[13px] leading-5 text-[#0b0b0c] outline-none"
              >
                1
              </button>
              {["2", "3"].map((page) => (
                <button
                  key={page}
                  type="button"
                  className="flex size-8 items-center justify-center rounded-[8px] border border-white/[0.07] text-[13px] leading-5 text-[#a0a0ab] outline-none"
                >
                  {page}
                </button>
              ))}
              <button
                type="button"
                aria-label="Next page"
                className="flex size-8 items-center justify-center rounded-[8px] border border-white/[0.07] outline-none"
              >
                <ChevronRight className="size-4 text-[#a0a0ab]" strokeWidth={2} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MyApplicationsPage
