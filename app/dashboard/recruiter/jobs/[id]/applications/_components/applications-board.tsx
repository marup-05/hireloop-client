"use client"

import { useState } from "react"
import Link from "next/link"
import { ChevronRight } from "lucide-react"

import type { JobRow } from "@/app/dashboard/recruiter/jobs/page"
import type { Application, ApplicationStatus } from "@/lib/api/applications"
import { StatusPill } from "@/components/status-pill"
import { updateApplicationsStatus } from "@/lib/actions/applications"

// All possible application statuses, shown in each row's status dropdown
const statusOptions: ApplicationStatus[] = [
  "Applied",
  "Review",
  "Shortlisted",
  "Rejected",
  "Offered",
]

// Avatar fallback colors
const avatarPalette = ["#5c53fe", "#0ea5e9", "#f59e0b", "#22c55e", "#ef4444"]

// Short relative time for the Applied column
const fmtApplied = (iso: string) => {
  const date = new Date(iso).getTime()

  if (Number.isNaN(date)) return "Unknown"

  const minutes = Math.max(1, Math.floor((Date.now() - date) / 60_000))

  if (minutes < 60) return `${minutes} minute${minutes === 1 ? "" : "s"} ago`

  const hours = Math.floor(minutes / 60)

  if (hours < 24) return `${hours} hour${hours === 1 ? "" : "s"} ago`

  const days = Math.floor(hours / 24)

  if (days < 7) return `${days} day${days === 1 ? "" : "s"} ago`

  const weeks = Math.floor(days / 7)

  return `${weeks} week${weeks === 1 ? "" : "s"} ago`
}

// Absolute date shown under the relative time
const fmtDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  })

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
  <div className="flex h-[86px] flex-col justify-center gap-2 rounded-[16px] border border-[#232327] bg-[#151516] px-6">
    <p className="text-[13px] leading-5 text-[#a0a0ab]">{label}</p>

    <p
      className={`text-[26px] leading-8 font-semibold tracking-[-0.5px] ${valueClass}`}
    >
      {value}
    </p>
  </div>
)

// Applicant avatar = initials from the email address
const ApplicantAvatar = ({
  email,
  index,
}: {
  email: string
  index: number
}) => (
  <span
    className="flex size-9 shrink-0 items-center justify-center rounded-full text-[13px] leading-5 font-semibold text-white"
    style={{ backgroundColor: avatarPalette[index % avatarPalette.length] }}
  >
    {email.slice(0, 2).toUpperCase()}
  </span>
)

const tableHeadings = ["Applicant", "Applied", "Status", "Update Status"]

// Table column widths
const colWidths = ["w-[34%]", "w-[22%]", "w-[20%]", "w-[24%]"]

type ApplicationsBoardProps = {
  job: JobRow
  applications: Application[]
}

export function ApplicationsBoard({
  job,
  applications,
}: ApplicationsBoardProps) {
  // Applications with any local status changes applied
  const [rows, setRows] = useState(applications)

  // Updates an applicant's status: persists it via PATCH /applications/:id
  // first, then applies the change to the local state.
  const handleStatusChange = async (id: string, status: ApplicationStatus) => {
    const result = await updateApplicationsStatus(id, { status })

    console.log("result", result)

    if (result.modifiedCount > 0) {
      setRows((prev) =>
        prev.map((row) => (row._id === id ? { ...row, status } : row))
      )
    }
  }

  // Live statistics from the current statuses
  const total = rows.length

  const inReview = rows.filter((row) => row.status === "Review").length

  const shortlisted = rows.filter((row) => row.status === "Shortlisted").length

  const offered = rows.filter((row) => row.status === "Offered").length

  const stats = [
    {
      label: "Total Applicants",
      value: String(total),
      valueClass: "text-white",
    },
    {
      label: "In Review",
      value: String(inReview),
      valueClass: "text-[#f59e0b]",
    },
    {
      label: "Shortlisted",
      value: String(shortlisted),
      valueClass: "text-[#60a5fa]",
    },
    {
      label: "Offered",
      value: String(offered),
      valueClass: "text-[#22c55e]",
    },
  ]

  return (
    <div className="min-h-screen w-full min-w-0 bg-[#131314]">
      <div className="mx-auto w-full max-w-[1400px] min-w-0 px-4 pt-8 pb-12 sm:px-6 lg:px-8 lg:pt-12">
        {/* Breadcrumb */}
        <div className="flex min-w-0 items-center gap-2">
          <Link
            href="/dashboard/recruiter/jobs"
            className="shrink-0 text-[13px] leading-5 text-[#a0a0ab] hover:underline"
          >
            Manage Jobs
          </Link>

          <ChevronRight
            className="h-3 w-[7.5px] shrink-0 text-[#a0a0ab]"
            strokeWidth={2}
          />

          <span className="max-w-[160px] min-w-0 truncate text-[13px] leading-5 text-[#a0a0ab] sm:max-w-[280px] lg:max-w-[360px]">
            {job.title}
          </span>

          <ChevronRight
            className="h-3 w-[7.5px] shrink-0 text-[#a0a0ab]"
            strokeWidth={2}
          />

          <span className="shrink-0 text-[13px] leading-5 font-medium text-[#c3c0ff]">
            Applications
          </span>
        </div>

        {/* Heading */}
        <div className="mt-3 min-w-0">
          <h1 className="text-2xl leading-tight font-medium tracking-[-0.8px] text-white sm:text-[32px] sm:leading-[42px]">
            Job Applications
          </h1>

          <p className="mt-1 max-w-2xl text-sm leading-[22px] text-[#a0a0ab]">
            Review applicants for{" "}
            <span className="font-medium text-white">{job.title}</span> at{" "}
            <span className="font-medium text-white">{job.company}</span> and
            update each candidate&apos;s status.
          </p>
        </div>

        {/* Stats overview */}
        <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {stats.map((stat) => (
            <StatTile key={stat.label} {...stat} />
          ))}
        </div>

        {/* Applicants table */}
        <div className="mt-6 w-full min-w-0 overflow-hidden rounded-[16px] border border-[#232327] bg-[#151516] shadow-[0_8px_10px_-6px_rgba(0,0,0,0.10),0_20px_25px_-5px_rgba(0,0,0,0.10)]">
          <div className="w-full overflow-x-auto">
            <table className="w-full min-w-[760px] table-fixed border-collapse text-left">
              <colgroup>
                {colWidths.map((width, index) => (
                  <col key={index} className={width} />
                ))}
              </colgroup>

              <thead>
                <tr>
                  {tableHeadings.map((heading) => (
                    <th
                      key={heading}
                      className="h-[50px] overflow-hidden border-b border-[#232327] bg-[#0b0b0c] px-3 text-[11px] leading-4 font-semibold tracking-wide text-ellipsis whitespace-nowrap text-[#a0a0ab]"
                    >
                      {heading}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {rows.length === 0 ? (
                  <tr>
                    <td
                      colSpan={tableHeadings.length}
                      className="h-32 text-center text-[13px] leading-5 text-[#a0a0ab]"
                    >
                      No applications received for this job yet.
                    </td>
                  </tr>
                ) : (
                  rows.map((application, index) => (
                    <tr
                      key={application._id}
                      className="border-b border-[#232327] last:border-b-0"
                    >
                      {/* Applicant */}
                      <td className="min-w-0 p-2 sm:p-3">
                        <div className="flex min-w-0 items-center gap-2.5">
                          <ApplicantAvatar
                            email={application.email}
                            index={index}
                          />

                          <div className="min-w-0">
                            <p className="truncate text-xs leading-5 font-semibold text-white sm:text-sm">
                              {application.email}
                            </p>

                            <p className="truncate text-[10px] leading-5 text-[#a0a0ab] sm:text-[11px]">
                              Candidate
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Applied */}
                      <td className="min-w-0 p-2 sm:p-3">
                        <p className="truncate text-[11px] leading-5 font-medium text-white sm:text-[13px]">
                          {fmtApplied(application.appliedAt)}
                        </p>

                        <p className="truncate text-[10px] leading-5 text-[#5a5a60] sm:text-[11px]">
                          {fmtDate(application.appliedAt)}
                        </p>
                      </td>

                      {/* Status */}
                      <td className="p-2 sm:p-3">
                        <StatusPill status={application.status} />
                      </td>

                      {/* Update status (persists via PATCH /applications/:id) */}
                      <td className="p-2 sm:p-3">
                        <select
                          value={application.status}
                          onChange={(event) =>
                            handleStatusChange(
                              application._id,
                              event.target.value as ApplicationStatus
                            )
                          }
                          aria-label={`Update status for ${application.email}`}
                          className="h-8 w-full max-w-[170px] cursor-pointer rounded-lg border border-[#232327] bg-[#1f1f1f] px-2 text-xs leading-5 text-[#d4d4d8] outline-none focus:border-[#5c53fe]"
                        >
                          {statusOptions.map((status) => (
                            <option key={status} value={status}>
                              {status}
                            </option>
                          ))}
                        </select>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
