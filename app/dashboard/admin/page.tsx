import Link from "next/link"
import type { ReactNode } from "react"
import {
  ArrowUpRight,
  Briefcase,
  Building2,
  Inbox,
  ShieldCheck,
  UserRound,
  Users,
  type LucideIcon,
} from "lucide-react"

import { getUsers, type AdminUser } from "@/lib/actions/better-auth-users"
import { getJobs } from "@/lib/api/jobs"
import type { UserRole } from "@/lib/api/user"
import { getSession } from "@/lib/core/server"

const cardClass = "rounded-[16px] border border-[#232327] bg-[#151516]"

const avatarPalette = ["#5c53fe", "#0ea5e9", "#f59e0b", "#22c55e"]

const rolePill: Record<UserRole, string> = {
  admin: "border-[#f59e0b]/30 bg-[#f59e0b]/10 text-[#f59e0b]",
  recruiter: "border-[#60a5fa]/30 bg-[#60a5fa]/10 text-[#60a5fa]",
  seeker: "border-white/[0.07] bg-white/[0.04] text-[#a0a0ab]",
}

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

const displayRole = (role?: UserRole | null): UserRole => role ?? "seeker"

const formatDate = (value?: string | Date) => {
  if (!value) return "—"

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

const UserAvatar = ({ user, index }: { user: AdminUser; index: number }) => {
  const source = user.name || user.email
  const initials = source.slice(0, 2).toUpperCase()

  return (
    <span
      className="flex size-9 shrink-0 items-center justify-center rounded-full text-[12px] font-semibold text-white"
      style={{ backgroundColor: avatarPalette[index % avatarPalette.length] }}
    >
      {initials}
    </span>
  )
}

const AdminOverviewPage = async () => {
  const session = await getSession()
  const firstName = session?.user?.name?.trim().split(/\s+/)[0] || "there"

  const [users, jobs] = await Promise.all([
    safeFetchArray(() => getUsers()),
    safeFetchArray(() => getJobs("")),
  ])

  const recentUsers: AdminUser[] = users
    ? [...users]
        .sort(
          (a, b) =>
            new Date(b.createdAt ?? 0).getTime() -
            new Date(a.createdAt ?? 0).getTime()
        )
        .slice(0, 5)
    : []

  const stats = [
    {
      label: "Total users",
      value: valueOrDash(users ? users.length : null),
      hint: users ? "Registered accounts" : "Unavailable",
      icon: Users,
    },
    {
      label: "Job seekers",
      value: valueOrDash(
        users
          ? users.filter((user) => displayRole(user.role) === "seeker").length
          : null
      ),
      hint: users ? "Seeker accounts" : "Unavailable",
      icon: UserRound,
    },
    {
      label: "Recruiters",
      value: valueOrDash(
        users
          ? users.filter((user) => displayRole(user.role) === "recruiter")
              .length
          : null
      ),
      hint: users ? "Recruiter accounts" : "Unavailable",
      icon: Building2,
    },
    {
      label: "Total jobs",
      value: valueOrDash(jobs ? jobs.length : null),
      hint: jobs ? "Platform listings" : "Unavailable",
      icon: Briefcase,
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
              Here&apos;s a snapshot of the HireLoop platform.
            </p>
          </div>

          <Link
            href="/dashboard/admin/users"
            className="inline-flex h-10 w-fit items-center gap-2 rounded-[12px] bg-[#5c53fe] px-4 text-sm font-medium text-white hover:bg-[#4f46e5]"
          >
            <Users className="size-4" strokeWidth={2} />
            Manage users
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
              title="Recently joined users"
              description="The newest accounts on the platform."
              href="/dashboard/admin/users"
              linkLabel="View all users"
            >
              {users === null ? (
                <EmptyState
                  title="User activity unavailable"
                  description="We couldn't load platform users right now. Please try again later."
                />
              ) : recentUsers.length === 0 ? (
                <EmptyState
                  title="No users yet"
                  description="New accounts will appear here once people join."
                />
              ) : (
                <ul className="flex flex-col">
                  {recentUsers.map((user, index) => {
                    const role = displayRole(user.role)

                    return (
                      <li key={user.id}>
                        <Link
                          href="/dashboard/admin/users"
                          className="flex items-center gap-3 rounded-[10px] px-3 py-3 hover:bg-[#1c1c20]"
                        >
                          <UserAvatar user={user} index={index} />

                          <span className="min-w-0 flex-1">
                            <span className="block truncate text-sm font-medium text-[#ededef]">
                              {user.name || user.email}
                            </span>
                            <span className="block truncate text-xs text-[#a0a0ab]">
                              Joined {formatDate(user.createdAt)}
                            </span>
                          </span>

                          <span
                            className={`hidden shrink-0 rounded-full border px-2.5 py-1 text-[11px] leading-4 font-medium capitalize sm:inline-flex ${rolePill[role]}`}
                          >
                            {role}
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
                  Platform overview
                </h2>
                <p className="mt-1 text-xs leading-5 text-[#a0a0ab]">
                  Quick links for platform management.
                </p>
              </div>

              <ul className="flex flex-col p-2 sm:p-3">
                <li>
                  <Link
                    href="/dashboard/admin/users"
                    className="flex items-center gap-3 rounded-[10px] px-3 py-3 hover:bg-[#1c1c20]"
                  >
                    <span className="flex size-9 shrink-0 items-center justify-center rounded-[10px] bg-[#1f1f22]">
                      <Users
                        className="size-[18px] text-[#c3c0ff]"
                        strokeWidth={2}
                      />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-sm font-medium text-[#ededef]">
                        Users
                      </span>
                      <span className="block text-xs leading-5 text-[#a0a0ab]">
                        Manage accounts and roles.
                      </span>
                    </span>
                    <ArrowUpRight
                      className="size-4 shrink-0 text-[#5a5a60]"
                      strokeWidth={2}
                    />
                  </Link>
                </li>
                <li>
                  <Link
                    href="/dashboard/admin/jobs"
                    className="flex items-center gap-3 rounded-[10px] px-3 py-3 hover:bg-[#1c1c20]"
                  >
                    <span className="flex size-9 shrink-0 items-center justify-center rounded-[10px] bg-[#1f1f22]">
                      <Briefcase
                        className="size-[18px] text-[#c3c0ff]"
                        strokeWidth={2}
                      />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-sm font-medium text-[#ededef]">
                        Jobs
                      </span>
                      <span className="block text-xs leading-5 text-[#a0a0ab]">
                        Review listings across the platform.
                      </span>
                    </span>
                    <ArrowUpRight
                      className="size-4 shrink-0 text-[#5a5a60]"
                      strokeWidth={2}
                    />
                  </Link>
                </li>
                <li>
                  <Link
                    href="/dashboard/admin/payments"
                    className="flex items-center gap-3 rounded-[10px] px-3 py-3 hover:bg-[#1c1c20]"
                  >
                    <span className="flex size-9 shrink-0 items-center justify-center rounded-[10px] bg-[#1f1f22]">
                      <ShieldCheck
                        className="size-[18px] text-[#c3c0ff]"
                        strokeWidth={2}
                      />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-sm font-medium text-[#ededef]">
                        Payments
                      </span>
                      <span className="block text-xs leading-5 text-[#a0a0ab]">
                        Keep track of platform payments.
                      </span>
                    </span>
                    <ArrowUpRight
                      className="size-4 shrink-0 text-[#5a5a60]"
                      strokeWidth={2}
                    />
                  </Link>
                </li>
              </ul>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminOverviewPage
