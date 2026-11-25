import Link from "next/link"
import type { ReactNode } from "react"
import {
  ArrowUpRight,
  BadgeCheck,
  Bookmark,
  Briefcase,
  Clock3,
  FileText,
  Inbox,
  MapPin,
  Send,
  type LucideIcon,
} from "lucide-react"

import {
  getMyApplications,
  type ApplicationStatus,
} from "@/lib/api/applications"
import { getSavedJobs } from "@/lib/api/saved-jobs"
import { getJobs } from "@/lib/api/jobs"
import type { JobRow } from "@/app/dashboard/recruiter/jobs/page"
import { getSession } from "@/lib/core/server"
import { cn } from "@/lib/utils"

const statusPill: Record<ApplicationStatus, string> = {
  Applied: "border-white/[0.07] bg-white/[0.04] text-[#a0a0ab]",
  Review: "border-[#f59e0b]/30 bg-[#f59e0b]/10 text-[#f59e0b]",
  Shortlisted: "border-[#60a5fa]/30 bg-[#60a5fa]/10 text-[#60a5fa]",
  Rejected: "border-[#ef4444]/30 bg-[#ef4444]/10 text-[#ef4444]",
  Offered: "border-[#22c55e]/30 bg-[#22c55e]/10 text-[#22c55e]",
}

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

const SeekerOverviewPage = async () => {
  const session = await getSession()
  const userId = session?.user?.id
  const firstName = session?.user?.name?.trim().split(/\s+/)[0] || "there"

  const [applications, savedJobs, jobs] = await Promise.all([
    userId
      ? safeFetchArray(() => getMyApplications(userId))
      : Promise.resolve(null),
    userId ? safeFetchArray(() => getSavedJobs(userId)) : Promise.resolve(null),
    safeFetchArray(() => getJobs("")),
  ])

  const recentApplications = applications
    ? [...applications]
        .sort(
          (a, b) =>
            new Date(b.appliedAt).getTime() - new Date(a.appliedAt).getTime()
        )
        .slice(0, 5)
    : []

  const recentJobs: JobRow[] = jobs ? jobs.slice(0, 5) : []

  const stats = [
    {
      label: "Applied jobs",
      value: applications ? String(applications.length) : "—",
      hint: applications ? "All applications" : "Unavailable",
      icon: Send,
    },
    {
      label: "Saved jobs",
      value: savedJobs ? String(savedJobs.length) : "—",
      hint: savedJobs ? "Saved for later" : "Unavailable",
      icon: Bookmark,
    },
    {
      label: "In review",
      value: applications
        ? String(
            applications.filter(
              (application) => application.status === "Review"
            ).length
          )
        : "—",
      hint: applications ? "Under employer review" : "Unavailable",
      icon: Clock3,
    },
    {
      label: "Shortlisted",
      value: applications
        ? String(
            applications.filter(
              (application) => application.status === "Shortlisted"
            ).length
          )
        : "—",
      hint: applications ? "Moved to next round" : "Unavailable",
      icon: BadgeCheck,
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
              Here&apos;s a quick look at your job search.
            </p>
          </div>

          <Link
            href="/browse-jobs"
            className="inline-flex h-10 w-fit items-center gap-2 rounded-[12px] bg-[#5c53fe] px-4 text-sm font-medium text-white hover:bg-[#4f46e5]"
          >
            <Briefcase className="size-4" strokeWidth={2} />
            Browse jobs
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
              title="Recent applications"
              description="Keep track of your latest applications and their status."
              href="/dashboard/seeker/applications"
              linkLabel="View all"
            >
              {applications === null ? (
                <EmptyState
                  title="Applications unavailable"
                  description="We couldn't load your applications right now. Please try again later."
                />
              ) : recentApplications.length === 0 ? (
                <EmptyState
                  title="No applications yet"
                  description="When you apply to a job, it will show up here."
                />
              ) : (
                <ul className="flex flex-col">
                  {recentApplications.map((application) => (
                    <li key={application._id}>
                      <Link
                        href="/dashboard/seeker/applications"
                        className="flex items-center gap-3 rounded-[10px] px-3 py-3 hover:bg-[#1c1c20]"
                      >
                        <span className="flex size-9 shrink-0 items-center justify-center rounded-[10px] bg-[#1f1f22]">
                          <FileText
                            className="size-[18px] text-[#c3c0ff]"
                            strokeWidth={2}
                          />
                        </span>

                        <span className="min-w-0 flex-1">
                          <span className="block truncate text-sm font-medium text-[#ededef]">
                            {application.jobTitle}
                          </span>
                          <span className="block truncate text-xs text-[#a0a0ab]">
                            {application.companyName} · Applied{" "}
                            {formatDate(application.appliedAt)}
                          </span>
                        </span>

                        <span
                          className={cn(
                            "hidden shrink-0 rounded-full border px-2.5 py-1 text-[11px] leading-4 font-medium sm:inline-flex",
                            statusPill[application.status]
                          )}
                        >
                          {application.status}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </SectionCard>
          </div>

          <div className="min-w-0">
            <SectionCard
              title="Recently posted jobs"
              description="Fresh roles you can explore right now."
              href="/browse-jobs"
              linkLabel="Browse all"
            >
              {jobs === null ? (
                <EmptyState
                  title="Jobs unavailable"
                  description="We couldn't load job listings right now. Please try again later."
                />
              ) : recentJobs.length === 0 ? (
                <EmptyState
                  title="No jobs posted yet"
                  description="New roles will appear here once employers post them."
                />
              ) : (
                <ul className="flex flex-col">
                  {recentJobs.map((job) => (
                    <li key={job._id}>
                      <Link
                        href={`/browse-jobs/${job._id}`}
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
                          <span className="flex min-w-0 items-center gap-1 text-xs text-[#a0a0ab]">
                            <span className="truncate">{job.company}</span>
                            {job.location && (
                              <>
                                <span aria-hidden>·</span>
                                <MapPin
                                  className="size-3 shrink-0"
                                  strokeWidth={2}
                                />
                                <span className="truncate">{job.location}</span>
                              </>
                            )}
                          </span>
                        </span>

                        <span className="hidden shrink-0 rounded-full border border-[#232327] bg-[#1f1f22] px-2.5 py-1 text-[11px] leading-4 text-[#a0a0ab] sm:inline-flex">
                          {job.jobType}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </SectionCard>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SeekerOverviewPage
