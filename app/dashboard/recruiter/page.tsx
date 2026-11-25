import Link from "next/link"
import type { ReactNode } from "react"
import {
  Activity,
  ArrowUpRight,
  Briefcase,
  Clock3,
  Inbox,
  Plus,
  Users,
  type LucideIcon,
} from "lucide-react"

import { getJobs } from "@/lib/api/jobs"
import type { JobRow } from "@/app/dashboard/recruiter/jobs/page"
import { getSession } from "@/lib/core/server"

const cardClass = "rounded-[16px] border border-[#232327] bg-[#151516]"

const safeFetchArray = async <T,>(
  request: () => Promise<T[]>
): Promise<T[] | null> => {
  try {
    const data = await request()

    return Array.isArray(data) ? data : null
  } catch {
    return null
  }
}

const formatDate = (value: string) => {
  const date = new Date(value)

  if (Number.isNaN(date.getTime())) return "—"

  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  })
}

const valueOrDash = (value: number | null) =>
  value === null ? "—" : String(value)

const isActiveJob = (job: JobRow) => new Date(job.deadline) >= new Date()

const StatCard = ({
  label,
  value,
  hint,
  icon: Icon,
}: {
  label: string
  value: string
  hint: string
  icon: LucideIcon
}) => (
  <div className={`${cardClass} p-5`}>
    <div className="flex items-start justify-between gap-3">
      <p className="text-[13px] leading-5 text-[#a0a0ab]">{label}</p>
      <span className="flex size-9 shrink-0 items-center justify-center rounded-[10px] bg-[#5c53fe]/15">
        <Icon className="size-[18px] text-[#c3c0ff]" strokeWidth={2} />
      </span>
    </div>

    <p className="mt-4 text-[28px] leading-8 font-semibold tracking-[-0.5px] text-[#ededef]">
      {value}
    </p>
    <p className="mt-1 text-xs text-[#6e6e78]">{hint}</p>
  </div>
)

const SectionCard = ({
  title,
  description,
  href,
  linkLabel,
  children,
}: {
  title: string
  description: string
  href: string
  linkLabel: string
  children: ReactNode
}) => (
  <section className={cardClass}>
    <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#232327] px-5 py-4">
      <div>
        <h2 className="text-[15px] leading-5 font-semibold text-[#ededef]">
          {title}
        </h2>
        <p className="mt-1 text-xs leading-5 text-[#a0a0ab]">{description}</p>
      </div>

      <Link
        href={href}
        className="inline-flex items-center gap-1 text-xs font-medium text-[#c3c0ff] hover:underline"
      >
        {linkLabel}
        <ArrowUpRight className="size-3.5" strokeWidth={2} />
      </Link>
    </div>

    <div className="p-2 sm:p-3">{children}</div>
  </section>
)

const EmptyState = ({
  title,
  description,
}: {
  title: string
  description: string
}) => (
  <div className="flex flex-col items-center justify-center gap-2 px-4 py-10 text-center">
    <span className="flex size-10 items-center justify-center rounded-full bg-[#1f1f22]">
      <Inbox className="size-[18px] text-[#a0a0ab]" strokeWidth={2} />
    </span>
    <p className="text-sm font-medium text-[#ededef]">{title}</p>
    <p className="max-w-[300px] text-xs leading-5 text-[#a0a0ab]">
      {description}
    </p>
  </div>
)

const RecruiterOverviewPage = async () => {
  const session = await getSession()
  const recruiterId = session?.user?.id
  const firstName = session?.user?.name?.trim().split(/\s+/)[0] || "there"

  const jobs = recruiterId
    ? await safeFetchArray(() => getJobs("", recruiterId))
    : null

  const activeJobs = jobs ? jobs.filter(isActiveJob).length : null

  const totalApplicants = jobs
    ? jobs.reduce((total, job) => {
        const count = Number(job.applicants)

        return total + (Number.isFinite(count) ? count : 0)
      }, 0)
    : null

  const closedJobs = jobs === null ? null : jobs.length - (activeJobs ?? 0)
  const recentJobs: JobRow[] = jobs ? jobs.slice(0, 5) : []

  const stats = [
    {
      label: "Jobs posted",
      value: valueOrDash(jobs ? jobs.length : null),
      hint: jobs ? "All listings" : "Unavailable",
      icon: Briefcase,
    },
    {
      label: "Total applicants",
      value: valueOrDash(totalApplicants),
      hint: jobs ? "Across all jobs" : "Unavailable",
      icon: Users,
    },
    {
      label: "Active jobs",
      value: valueOrDash(activeJobs),
      hint: jobs ? "Open for applications" : "Unavailable",
      icon: Activity,
    },
    {
      label: "Closed jobs",
      value: valueOrDash(closedJobs),
      hint: jobs ? "Past the deadline" : "Unavailable",
      icon: Clock3,
    },
  ]

  const quickActions = [
    {
      label: "Post a new job",
      description: "Create a listing and start receiving applications.",
      href: "/dashboard/recruiter/jobs/new",
      icon: Plus,
    },
    {
      label: "Manage jobs",
      description: "Update details or close an existing listing.",
      href: "/dashboard/recruiter/jobs",
      icon: Briefcase,
    },
    {
      label: "Review applications",
      description: "See candidates who applied to your roles.",
      href: "/dashboard/recruiter/jobs",
      icon: Users,
    },
  ]

  return (
    <div className="min-h-screen w-full min-w-0 bg-[#131314]">
      <div className="mx-auto w-full max-w-[1400px] min-w-0 px-4 pt-8 pb-12 sm:px-6 lg:px-8 lg:pt-10">
        <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="min-w-0">
            <h1 className="text-2xl leading-tight font-semibold tracking-[-0.6px] text-[#ededef] sm:text-[30px] sm:leading-[40px]">
              Welcome back, {firstName}
            </h1>
            <p className="mt-2 text-sm leading-6 text-[#a0a0ab]">
              Here&apos;s what&apos;s happening with your hiring.
            </p>
          </div>

          <Link
            href="/dashboard/recruiter/jobs/new"
            className="inline-flex h-10 w-fit items-center gap-2 rounded-[12px] bg-[#5c53fe] px-4 text-sm font-medium text-white hover:bg-[#4f46e5]"
          >
            <Plus className="size-4" strokeWidth={2} />
            New job post
          </Link>
        </header>

        <section className="mt-7 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat) => (
            <StatCard key={stat.label} {...stat} />
          ))}
        </section>

        <div className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-3">
          <div className="min-w-0 xl:col-span-2">
            <SectionCard
              title="Job activity"
              description="Your latest listings with applicant counts and deadlines."
              href="/dashboard/recruiter/jobs"
              linkLabel="Manage jobs"
            >
              {jobs === null ? (
                <EmptyState
                  title="Job activity unavailable"
                  description="We couldn't load your listings right now. Please try again later."
                />
              ) : recentJobs.length === 0 ? (
                <EmptyState
                  title="No jobs posted yet"
                  description="Create your first job post to start receiving applications."
                />
              ) : (
                <ul className="flex flex-col">
                  {recentJobs.map((job) => {
                    const isActive = isActiveJob(job)

                    return (
                      <li key={job._id}>
                        <Link
                          href={`/dashboard/recruiter/jobs/${job._id}/applications`}
                          className="flex items-center gap-3 rounded-[10px] px-3 py-3 hover:bg-[#1c1c20]"
                        >
                          <span className="flex size-9 shrink-0 items-center justify-center rounded-[10px] bg-[#1f1f22]">
                            <Briefcase
                              className="size-[18px] text-[#c3c0ff]"
                              strokeWidth={2}
                            />
                          </span>

                          <span className="min-w-0 flex-1">
                            <span className="block truncate text-sm font-medium text-[#ededef]">
                              {job.title}
                            </span>
                            <span className="block truncate text-xs text-[#a0a0ab]">
                              {job.company} ·{" "}
                              {isActive
                                ? `Closes ${formatDate(job.deadline)}`
                                : "Closed"}
                            </span>
                          </span>

                          <span className="hidden shrink-0 items-center gap-1.5 rounded-full border border-[#232327] bg-[#1f1f22] px-2.5 py-1 text-[11px] leading-4 text-[#a0a0ab] sm:inline-flex">
                            <Users className="size-3.5" strokeWidth={2} />
                            {job.applicants ?? 0}
                          </span>

                          <span
                            className={`hidden shrink-0 rounded-full border px-2.5 py-1 text-[11px] leading-4 font-medium md:inline-flex ${
                              isActive
                                ? "border-[#22c55e]/30 bg-[#22c55e]/10 text-[#4ade80]"
                                : "border-white/[0.07] bg-white/[0.04] text-[#a0a0ab]"
                            }`}
                          >
                            {isActive ? "Active" : "Expired"}
                          </span>
                        </Link>
                      </li>
                    )
                  })}
                </ul>
              )}
            </SectionCard>
          </div>

          <div className="min-w-0">
            <section className={cardClass}>
              <div className="border-b border-[#232327] px-5 py-4">
                <h2 className="text-[15px] leading-5 font-semibold text-[#ededef]">
                  Quick actions
                </h2>
                <p className="mt-1 text-xs leading-5 text-[#a0a0ab]">
                  Common tasks to keep hiring moving.
                </p>
              </div>

              <ul className="flex flex-col p-2 sm:p-3">
                {quickActions.map((action) => (
                  <li key={action.label}>
                    <Link
                      href={action.href}
                      className="flex items-center gap-3 rounded-[10px] px-3 py-3 hover:bg-[#1c1c20]"
                    >
                      <span className="flex size-9 shrink-0 items-center justify-center rounded-[10px] bg-[#1f1f22]">
                        <action.icon
                          className="size-[18px] text-[#c3c0ff]"
                          strokeWidth={2}
                        />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block text-sm font-medium text-[#ededef]">
                          {action.label}
                        </span>
                        <span className="block text-xs leading-5 text-[#a0a0ab]">
                          {action.description}
                        </span>
                      </span>
                      <ArrowUpRight
                        className="size-4 shrink-0 text-[#5a5a60]"
                        strokeWidth={2}
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RecruiterOverviewPage
