
"use client"

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

import type {
  Application,
  ApplicationStatus,
} from "@/lib/api/applications"

// Shared card styling
const cardClass =
  "border border-white/[0.07] bg-[#141418] shadow-[0_1px_2px_0_rgba(0,0,0,0.35),inset_0_1px_0_0_rgba(255,255,255,0.04)]"

// Format applied date
const fmtApplied = (iso: string) => {
  const date = new Date(iso).getTime()

  if (Number.isNaN(date)) return "Unknown"

  const minutes = Math.max(
    1,
    Math.floor((Date.now() - date) / 60_000)
  )

  if (minutes < 60)
    return `${minutes} minute${minutes === 1 ? "" : "s"} ago`

  const hours = Math.floor(minutes / 60)

  if (hours < 24)
    return `${hours} hour${hours === 1 ? "" : "s"} ago`

  const days = Math.floor(hours / 24)

  if (days < 7)
    return `${days} day${days === 1 ? "" : "s"} ago`

  const weeks = Math.floor(days / 7)

  return `${weeks} week${weeks === 1 ? "" : "s"} ago`
}

// Status styles
const statusPill: Record<ApplicationStatus, string> = {
  Applied: "border-white/[0.07] bg-[#a1a4aa]/15 text-[#a0a0ab]",
  Review: "border-[#f59e0b]/30 bg-[#f59e0b]/15 text-[#f59e0b]",
  Shortlisted: "border-[#60a5fa]/30 bg-[#60a5fa]/15 text-[#60a5fa]",
  Rejected: "border-[#ef4444]/30 bg-[#ef4444]/15 text-[#ef4444]",
  Offered: "border-[#22c55e]/30 bg-[#22c55e]/15 text-[#22c55e]",
}

// Logo fallback colors
const logoPalette = [
  { bg: "#c6c6c7", fg: "#2f3131" },
  { bg: "#474746", fg: "#ffffff" },
  { bg: "#222228", fg: "#ffffff" },
  { bg: "#93000a", fg: "#ffb4ab" },
  { bg: "#222228", fg: "#ffffff" },
]

// Logo tile
const LogoTile = ({ index }: { index: number }) => {
  const { bg, fg } = logoPalette[index % logoPalette.length]

  return (
    <span
      className="flex size-8 shrink-0 items-center justify-center rounded-[4px]"
      style={{ backgroundColor: bg }}
    >
      <Building2
        className="size-4"
        style={{ color: fg }}
        strokeWidth={2}
      />
    </span>
  )
}

// Stats tile
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
    <p className="text-[13px] leading-5 text-[#a0a0ab]">
      {label}
    </p>

    <p
      className={`text-[26px] leading-8 font-semibold tracking-[-0.5px] ${valueClass}`}
    >
      {value}
    </p>
  </div>
)

const tableHeadings = [
  "Job Title",
  "Company",
  "Applied",
  "Status",
  "Action",
]

// Table column widths
const colWidths = [
  "w-[30.7%]",
  "w-[20.5%]",
  "w-[15.4%]",
  "w-[17.9%]",
  "w-[15.5%]",
]

type ApplicationsBoardProps = {
  applications: Application[]
}

export function ApplicationsBoard({
  applications,
}: ApplicationsBoardProps) {
  // Dynamic statistics
  const totalApplied = applications.length

  const shortlisted = applications.filter(
    (application) => application.status === "Shortlisted"
  ).length

  const inReview = applications.filter(
    (application) => application.status === "Review"
  ).length

  const offered = applications.filter(
    (application) => application.status === "Offered"
  ).length

  const successRate =
    totalApplied > 0
      ? Math.round((offered / totalApplied) * 100)
      : 0

  const stats = [
    {
      label: "Total Applied",
      value: String(totalApplied),
      valueClass: "text-[#ededef]",
    },
    {
      label: "Shortlisted",
      value: String(shortlisted),
      valueClass: "text-[#ededef]",
    },
    {
      label: "In Review",
      value: String(inReview),
      valueClass: "text-[#f59e0b]",
    },
    {
      label: "Success Rate",
      value: `${successRate}%`,
      valueClass: "text-[#22c55e]",
    },
  ]

  return (
    <div className="relative min-h-screen w-full min-w-0 overflow-hidden bg-[#0e0e11]">
      {/* Figma decorative glow */}
      <span
        aria-hidden
        className="pointer-events-none absolute -right-24 -bottom-24 size-96 rounded-full bg-white/5 blur-[100px]"
      />

      {/* Top nav bar */}
      <header className="relative flex h-14 items-center justify-between gap-4 border-b border-white/[0.07] px-4 sm:px-8">
        {/* Search */}
        <div className="flex h-9 w-full max-w-[320px] min-w-0 items-center gap-3 border border-white/[0.07] bg-[#0c0c0f] px-3">
          <Search
            className="size-[15px] shrink-0 text-[#c4c7c8]"
            strokeWidth={2}
          />

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
            <PanelLeft
              className="size-[15px] text-[#c4c7c8]"
              strokeWidth={2}
            />
          </button>

          <button
            type="button"
            aria-label="Toggle layout"
            className="flex size-9 items-center justify-center outline-none"
          >
            <PanelRight
              className="size-[15px] text-[#c4c7c8]"
              strokeWidth={2}
            />
          </button>

          <span className="ml-1 flex size-8 shrink-0 items-center justify-center rounded-full border border-white/[0.07] bg-[#222228]">
            <User
              className="size-4 text-[#c4c7c8]"
              strokeWidth={2}
            />
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
            {/* Active / Archived */}
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
              <Download
                className="size-3 text-[#2f3131]"
                strokeWidth={2}
              />
              Export PDF
            </button>
          </div>
        </div>

        {/* Stats overview */}
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
                      } ${
                        index === tableHeadings.length - 1
                          ? "pr-7 text-right"
                          : "text-left"
                      }`}
                    >
                      {heading}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody className="divide-y divide-white/[0.07]">
                {applications.length === 0 ? (
                  <tr>
                    <td
                      colSpan={5}
                      className="h-32 text-center text-[13px] text-[#a0a0ab]"
                    >
                      You haven't applied to any jobs yet.
                    </td>
                  </tr>
                ) : (
                  applications.map((application, index) => (
                    <tr key={application._id} className="h-16">
                      {/* Job title + type + workplace */}
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
                          className={`inline-flex h-[22px] items-center border px-[11px] text-[12px] leading-4 font-medium whitespace-nowrap ${
                            statusPill[application.status]
                          }`}
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
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination info */}
          <div className="flex h-[65px] items-center justify-between gap-4 border-t border-white/[0.07] bg-[#1a1a1f] px-4 sm:px-6">
            <p className="truncate text-[13px] leading-5 text-[#a0a0ab]">
              Showing{" "}
              {applications.length > 0 ? 1 : 0}-
              {applications.length} of {applications.length} applications
            </p>

            <div className="flex shrink-0 items-center gap-1.5">
              <button
                type="button"
                aria-label="Previous page"
                disabled
                className="flex size-8 items-center justify-center rounded-[8px] border border-white/[0.07] opacity-50 outline-none"
              >
                <ChevronLeft
                  className="size-4 text-[#a0a0ab]"
                  strokeWidth={2}
                />
              </button>

              <button
                type="button"
                className="flex size-8 items-center justify-center rounded-[8px] bg-white text-[13px] leading-5 text-[#0b0b0c] outline-none"
              >
                1
              </button>

              <button
                type="button"
                aria-label="Next page"
                disabled
                className="flex size-8 items-center justify-center rounded-[8px] border border-white/[0.07] opacity-50 outline-none"
              >
                <ChevronRight
                  className="size-4 text-[#a0a0ab]"
                  strokeWidth={2}
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
