
import {
  Briefcase,
  ChevronRight,
  EllipsisVertical,
  Eye,
  MapPin,
  Plus,
  SquarePen,
  Users,
} from "lucide-react"
import type { NewJob } from "@/app/dashboard/recruiter/jobs/new/page"
import { getJobs } from "@/lib/api/jobs"
import { DeleteJobDialog } from "@/app/components/DeleteJobDialog";

// Table rows = the exact NewJob shape stored by the new jobs page,
// plus a couple of list-only display fields (applicants, postedAgo).
export type JobRow = NewJob & { applicants: number; postedAgo: string; _id: string}

const categoryMeta: Record<string, { label: string; color: string }> = {
  Engineering: { label: "Engineering", color: "#38bdf8" },
  "Engineering & Tech": { label: "Engineering", color: "#38bdf8" },
  Design: { label: "Design", color: "#f97316" },
  "Design & Creative": { label: "Design", color: "#f97316" },
  Infrastructure: { label: "Infrastructure", color: "#38bdf8" },
  Marketing: { label: "Marketing", color: "#c3c0ff" },
  Quality: { label: "Quality", color: "#c7d2fe" },
}

const categoryInfo = (category: string) =>
  categoryMeta[category] ?? { label: category, color: "#c3c0ff" }

const salaryUnit: Record<string, string> = {
  "per hour": "hr",
  "per day": "day",
  "per week": "week",
  "per month": "month",
  "per year": "yr",
}

const fmtSalary = (v: string) =>
  Number(v) >= 1000 ? `${Number(v) / 1000}k` : v

const fmtDeadline = (d: string) =>
  new Date(d).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  })

const isExpired = (job: JobRow) => new Date(job.deadline) < new Date()

const ApplicantsCell = ({ count }: { count: number }) => {
  const accents = ["#c3c0ff", "#d4d4d8"]
  const color = accents[count % 2]

  return (
    <div className="flex min-w-0 items-center gap-1.5">
      <Users className="size-4 shrink-0" style={{ color }} strokeWidth={2} />
      <span
        className="truncate text-[13px] leading-5 font-semibold"
        style={{ color }}
      >
        {count} Candidates
      </span>
    </div>
  )
}

const StatusCell = ({ active }: { active: boolean }) => (
  <span
    className={`inline-flex h-7 items-center gap-1.5 rounded-full px-[10px] text-[11px] leading-5 font-medium whitespace-nowrap ${
      active
        ? "bg-[#14532d]/40 text-[#4ade80]"
        : "bg-[#1f1f1f] text-[#a0a0ab]"
    }`}
  >
    <span
      className={`size-1.5 shrink-0 rounded-full ${
        active ? "bg-[#4ade80]" : "bg-[#5a5a60]"
      }`}
    />
    {active ? "Active" : "Expired"}
  </span>
)

const ManageJobPage = async () => {
  const jobs = await getJobs()
  console.log("jobs data", jobs)

  return (
    <div className="min-h-screen w-full min-w-0 bg-[#131314]">
      <div className="mx-auto w-full min-w-0 max-w-[1400px] px-4 pt-8 pb-12 sm:px-6 lg:px-8 lg:pt-12">
        {/* Breadcrumb */}
        <div className="flex min-w-0 items-center gap-2">
          <a
            href="/dashboard/recruiter"
            className="shrink-0 text-[13px] leading-5 text-[#a0a0ab] hover:underline"
          >
            Manage Jobs
          </a>
          <ChevronRight
            className="h-3 w-[7.5px] shrink-0 text-[#a0a0ab]"
            strokeWidth={2}
          />
          <span className="truncate text-[13px] leading-5 font-medium text-[#c3c0ff]">
            Job Listings &amp; Postings
          </span>
        </div>

        {/* Heading + action */}
        <div className="mt-3 flex min-w-0 flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="min-w-0">
            <h1 className="text-2xl leading-tight font-medium tracking-[-0.8px] text-white sm:text-[32px] sm:leading-[42px]">
              Manage Job Posts
            </h1>
            <p className="mt-1 max-w-2xl text-sm leading-[22px] text-[#a0a0ab]">
              Review live listings, monitor applicants, and update job details
              across your organization.
            </p>
          </div>

          <a
            href="/dashboard/recruiter/jobs/new"
            className="inline-flex h-10 w-fit shrink-0 items-center gap-1 rounded-[12px] bg-[#5c53fe] px-5 text-sm leading-5 font-medium text-white shadow-[0_2px_4px_-2px_rgba(0,0,0,0.10),0_4px_6px_-1px_rgba(0,0,0,0.10)] outline-none active:translate-y-px"
          >
            <Plus className="size-3.5" strokeWidth={2.5} />
            New Job Post
          </a>
        </div>

        {/* Postings table */}
        <div className="mt-6 w-full min-w-0 overflow-hidden rounded-[16px] border border-[#232327] bg-[#151516] shadow-[0_8px_10px_-6px_rgba(0,0,0,0.10),0_20px_25px_-5px_rgba(0,0,0,0.10)]">
          {/* Horizontal scroll on small screens — page itself never overflows */}
          <div className="w-full overflow-x-auto">
            <table className="w-full min-w-[1080px] table-fixed border-collapse text-left">
            <colgroup>
              <col className="w-[17%]" />
              <col className="w-[14%]" />
              <col className="w-[9%]" />
              <col className="w-[13%]" />
              <col className="w-[11%]" />
              <col className="w-[9%]" />
              <col className="w-[10%]" />
              <col className="w-[17%]" />
            </colgroup>

            <thead>
              <tr>
                {[
                  "JOB TITLE & DEPT",
                  "COMPANY & LOCATION",
                  "TYPE",
                  "COMPENSATION",
                  "APPLICANTS",
                  "STATUS",
                  "DEADLINE",
                  "ACTIONS",
                ].map((heading) => (
                  <th
                    key={heading}
                    className="h-[50px] overflow-hidden border-b border-[#232327] bg-[#0b0b0c] px-2 text-[10px] leading-4 font-semibold tracking-wide whitespace-nowrap text-[#a0a0ab] text-ellipsis sm:px-3 sm:text-[11px]"
                  >
                    {heading}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {jobs.map((job: JobRow, index: number) => {
                const expired = isExpired(job)
                const { label: dept, color } = categoryInfo(job.category)

                return (
                  <tr key={`${job.title}-${index}`} className="border-b border-[#232327]">
                    {/* Job title & dept */}
                    <td className="min-w-0 p-2 sm:p-3">
                      <div className="flex min-w-0 items-center gap-2">
                        <span className="hidden size-9 shrink-0 items-center justify-center rounded-lg bg-[#232327] sm:flex">
                          <Briefcase
                            className="size-[18px]"
                            style={{ color }}
                            strokeWidth={2}
                          />
                        </span>
                        <div className="min-w-0">
                          <p className="truncate text-xs leading-5 font-semibold text-white sm:text-sm">
                            {job.title}
                          </p>
                          <p
                            className="truncate text-[10px] leading-5 font-medium sm:text-[11px]"
                            style={{ color }}
                          >
                            {dept}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Company & location */}
                    <td className="min-w-0 p-2 sm:p-3">
                      <p className="truncate text-xs leading-5 font-medium text-white sm:text-[13px]">
                        {job.company}
                      </p>
                      <p className="flex min-w-0 items-center gap-1 text-[10px] leading-5 text-[#a0a0ab] sm:text-xs">
                        <MapPin className="size-3 shrink-0 sm:size-4" strokeWidth={2} />
                        <span className="truncate">
                          {job.isRemote ? `Remote (${job.location})` : job.location}
                        </span>
                      </p>
                    </td>

                    {/* Type */}
                    <td className="p-2 sm:p-3">
                      <span className="inline-flex max-w-full items-center rounded-full border border-[#232327] bg-[#1f1f1f] px-2 py-1 text-[10px] leading-4 font-medium whitespace-nowrap text-[#d4d4d8] sm:px-[11px] sm:text-[11px]">
                        {job.jobType}
                      </span>
                    </td>

                    {/* Compensation */}
                    <td className="p-2 sm:p-3">
                      <span className="block truncate text-[10px] leading-4 font-medium text-white sm:text-[13px] sm:leading-5">
                        €{fmtSalary(job.minSalary)} – €{fmtSalary(job.maxSalary)} /{" "}
                        {salaryUnit[job.salaryFrequency] ?? job.salaryFrequency}
                      </span>
                    </td>

                    {/* Applicants */}
                    <td className="p-2 sm:p-3">
                      <ApplicantsCell count={job.applicants} />
                    </td>

                    {/* Status */}
                    <td className="p-2 sm:p-3">
                      <StatusCell active={!expired} />
                    </td>

                    {/* Deadline */}
                    <td className="p-2 sm:p-3">
                      <p
                        className={`truncate text-[11px] leading-5 font-medium sm:text-[13px] ${
                          expired ? "text-[#a0a0ab]" : "text-white"
                        }`}
                      >
                        {fmtDeadline(job.deadline)}
                      </p>
                      <p className="truncate text-[10px] leading-5 text-[#5a5a60] sm:text-[11px]">
                        {expired ? "Closed" : job.postedAgo}
                      </p>
                    </td>

                    {/* Actions */}
                    <td className="p-2 sm:p-3">
                      <div className="flex flex-nowrap items-center justify-end gap-1">
                        <a
                          href={`/dashboard/recruiter/jobs/${job._id}/edit`}
                          aria-label="Update job"
                          className="inline-flex h-8 items-center justify-center gap-1 rounded-lg bg-[#5c53fe]/20 px-2 text-[10px] leading-5 font-medium text-[#c3c0ff] outline-none hover:bg-[#5c53fe]/30 sm:px-3 sm:text-xs"
                        >
                          <SquarePen className="size-4 shrink-0 sm:size-[18px]" strokeWidth={2} />
                          <span className="hidden lg:inline">Update</span>
                        </a>

                        <a
                          href={`/dashboard/recruiter/jobs/${job._id}`}
                          aria-label="View job"
                          className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-[#1f1f1f] outline-none hover:bg-[#232327]"
                        >
                          <Eye className="size-4 text-[#a0a0ab]" strokeWidth={2} />
                        </a>

                        <DeleteJobDialog job={job}></DeleteJobDialog>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ManageJobPage
