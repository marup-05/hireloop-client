import Link from "next/link"
import { notFound } from "next/navigation"
import {
  BadgeCheck,
  Bookmark,
  BriefcaseBusiness,
  Calendar,
  MapPin,
  Wallet,
  type LucideIcon,
} from "lucide-react"

import { SiteNavbar } from "@/components/site-navbar"
import { ApplyNowButton } from "@/components/browse-jobs/ApplyNowButton"
import { getJob } from "@/lib/api/jobs"
import type { JobRow } from "@/app/dashboard/recruiter/jobs/page"

// Shared card styling
const cardClass =
  "border border-white/[0.07] bg-[#141418] shadow-[0_1px_2px_0_rgba(0,0,0,0.35),inset_0_1px_0_0_rgba(255,255,255,0.04)]"

// 90000 → 90k
const fmtSalary = (value: string) =>
  Number(value) >= 1000 ? `${Number(value) / 1000}k` : value

const salaryUnit: Record<string, string> = {
  "per hour": "hr",
  "per day": "day",
  "per week": "week",
  "per month": "month",
  "per year": "yr",
}

const fmtDeadline = (value: string) =>
  new Date(value).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  })

const toListItems = (text?: string) =>
  (text ?? "")
    .split(/\n/)
    .map((line) => line.replace(/^•\s*/, "").trim())
    .filter(Boolean)

// Bento info tile
const InfoTile = ({
  icon: Icon,
  label,
  value,
}: {
  icon: LucideIcon
  label: string
  value: string
}) => (
  <div className={`${cardClass} min-h-[121px] p-[25px]`}>
    <Icon className="size-5 text-[#c4c7c8]" strokeWidth={2} />

    <p className="mt-2 text-[13px] leading-5 font-medium text-[#a0a0ab] uppercase">
      {label}
    </p>

    <p className="mt-0.5 truncate text-base leading-[27px] font-semibold text-[#ededef]">
      {value}
    </p>
  </div>
)

// Bullet list
const BulletList = ({ items }: { items: string[] }) => {
  if (items.length === 0) return null

  if (items.length === 1) {
    return (
      <p className="mt-6 text-[13px] leading-5 text-[#a0a0ab]">{items[0]}</p>
    )
  }

  return (
    <ul className="mt-6 space-y-3">
      {items.map((item) => (
        <li key={item} className="flex gap-6">
          <span className="mt-[7px] size-1.5 shrink-0 rounded-full bg-white" />
          <span className="text-[13px] leading-5 text-[#a0a0ab]">{item}</span>
        </li>
      ))}
    </ul>
  )
}

// Content section
const ContentSection = ({
  title,
  bordered,
  children,
}: {
  title: string
  bordered?: boolean
  children: React.ReactNode
}) => (
  <section
    className={
      bordered ? "mt-6 border-t border-white/[0.07] pt-[25px]" : undefined
    }
  >
    <h2 className="text-[22px] leading-[28px] font-semibold tracking-[-0.4px] text-[#ededef]">
      {title}
    </h2>

    {children}
  </section>
)

// Sidebar info row
const OverviewRow = ({ label, value }: { label: string; value?: string }) =>
  value ? (
    <div className="flex h-[49px] items-center justify-between gap-4 border-y border-white/[0.07]">
      <span className="shrink-0 text-[13px] leading-5 text-[#a0a0ab] uppercase">
        {label}
      </span>

      <span className="truncate text-base leading-6 text-[#ededef]">
        {value}
      </span>
    </div>
  ) : null

// Job details UI
const JobDetails = ({ job }: { job: JobRow }) => {
  const active = job.status?.toLowerCase() === "active"

  const statusBadge = job.status ? (
    <span
      className={`flex items-center gap-1.5 text-base leading-[27px] font-semibold ${
        active ? "text-[#22c55e]" : "text-[#a0a0ab]"
      }`}
    >
      <BadgeCheck className="size-4" strokeWidth={2} />
      {job.status}
    </span>
  ) : null

  const salaryValue =
    job.minSalary || job.maxSalary
      ? `$${fmtSalary(job.minSalary || "0")} – $${fmtSalary(
          job.maxSalary || "0"
        )}${
          job.salaryFrequency
            ? ` / ${salaryUnit[job.salaryFrequency] ?? job.salaryFrequency}`
            : ""
        }`
      : "Not specified"

  const locationValue = job.isRemote
    ? job.location
      ? `Remote (${job.location})`
      : "Remote"
    : job.location || "Not specified"

  return (
    <>
      {/* Header */}
      <section className={`${cardClass} relative overflow-hidden p-[33px]`}>
        <span
          aria-hidden
          className="absolute -top-32 -right-32 size-64 rounded-full bg-white/5 blur-3xl"
        />

        <div className="relative flex flex-wrap items-center justify-between gap-6">
          <div className="flex min-w-0 items-center gap-6">
            <div className="flex size-20 shrink-0 items-center justify-center rounded-[12px] border border-white/[0.07] bg-[#1a1a1f]">
              <span className="flex size-[70px] items-center justify-center text-[26px] font-semibold text-[#ededef]">
                {job.company?.charAt(0).toUpperCase() || "•"}
              </span>
            </div>

            <div className="min-w-0">
              <h1 className="text-[32px] leading-[40px] font-semibold tracking-[-0.8px] text-[#ededef]">
                {job.title}
              </h1>

              <div className="mt-4 flex flex-wrap items-center gap-3">
                <span className="truncate text-[22px] leading-[28px] font-semibold tracking-[-0.4px] text-[#a0a0ab]">
                  {job.company}
                </span>

                <span className="size-1 shrink-0 rounded-full bg-[#8e9192]" />

                {statusBadge}
              </div>
            </div>
          </div>

          <div className="flex shrink-0 items-center gap-3">
            <button
              type="button"
              aria-label="Save job"
              className="flex size-12 items-center justify-center rounded-[8px] border border-white/[0.07] bg-[#222228] outline-none"
            >
              <Bookmark
                className="size-[18px] text-[#e5e2e3]"
                strokeWidth={2}
              />
            </button>

            <ApplyNowButton
              jobId={String(job._id)}
              jobTitle={job.title}
              companyName={job.company}
              jobType={job.jobType}
              isRemote={job.isRemote}
            />
          </div>
        </div>
      </section>

      <div className="mt-6 grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_397px]">
        {/* Main content */}
        <div className="min-w-0">
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            <InfoTile icon={Wallet} label="Salary Range" value={salaryValue} />

            <InfoTile icon={MapPin} label="Location" value={locationValue} />

            <InfoTile
              icon={BriefcaseBusiness}
              label="Job Type"
              value={job.jobType || "Not specified"}
            />

            <InfoTile
              icon={Calendar}
              label="Application Deadline"
              value={job.deadline ? fmtDeadline(job.deadline) : "Not specified"}
            />
          </div>

          <div className={`${cardClass} mt-6 p-[33px]`}>
            <ContentSection title="Responsibilities">
              <BulletList items={toListItems(job.responsibilities)} />
            </ContentSection>

            <ContentSection title="Requirements" bordered>
              <BulletList items={toListItems(job.qualifications)} />
            </ContentSection>
          </div>
        </div>

        {/* Sidebar */}
        <aside className={`${cardClass} p-[25px]`}>
          <h2 className="text-[22px] leading-[28px] font-semibold tracking-[-0.4px] text-[#ededef]">
            Company Overview
          </h2>

          <div className="relative mt-6 h-[204px] overflow-hidden rounded-[12px] border border-white/[0.07] bg-gradient-to-br from-[#5c53fe]/40 via-[#1a1a1f] to-[#0b0b0c]">
            <span className="absolute inset-0 flex items-center justify-center text-[80px] font-semibold text-white/10">
              {job.company?.charAt(0).toUpperCase() || "•"}
            </span>

            <span className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/60 to-transparent" />

            {job.category && (
              <span className="absolute bottom-4 left-4 text-[13px] leading-5 font-medium text-[#a0a0ab]">
                {job.category}
              </span>
            )}
          </div>

          <div className="mt-6 space-y-6">
            <OverviewRow label="Category" value={job.category} />
            <OverviewRow label="Status" value={job.status} />
          </div>
        </aside>
      </div>
    </>
  )
}

// API error state
const ErrorState = () => (
  <div className={`${cardClass} mx-auto max-w-[520px] p-[33px] text-center`}>
    <h1 className="text-[22px] leading-[28px] font-semibold tracking-[-0.4px] text-[#ededef]">
      Something went wrong
    </h1>

    <p className="mt-3 text-[13px] leading-5 text-[#a0a0ab]">
      We couldn&apos;t load this job right now. Please try again in a moment.
    </p>

    <Link
      href="/browse-jobs"
      className="mt-6 inline-flex h-10 items-center rounded-[8px] bg-white px-5 text-sm font-semibold text-[#2f3131] outline-none active:translate-y-px"
    >
      Back to Browse Jobs
    </Link>
  </div>
)

// Server Component — keep this page server-side
const JobDetailsPage = async ({
  params,
}: {
  params: Promise<{ id: string }>
}) => {
  const { id } = await params

  if (!/^[0-9a-fA-F]{24}$/.test(id)) {
    notFound()
  }

  let job: JobRow | null = null
  let failed = false

  try {
    job = await getJob(id)
  } catch {
    failed = true
  }

  return (
    <div className="min-h-screen w-full bg-[#08080a]">
      <SiteNavbar />

      <main>
        <div className="mx-auto w-full max-w-[1240px] px-4 pt-6 pb-16 sm:px-6 lg:px-8">
          {failed ? (
            <ErrorState />
          ) : job ? (
            <JobDetails job={job} />
          ) : (
            notFound()
          )}
        </div>
      </main>
    </div>
  )
}

export default JobDetailsPage
