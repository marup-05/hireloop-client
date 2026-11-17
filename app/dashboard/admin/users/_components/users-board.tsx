"use client"

import { useState } from "react"
import Link from "next/link"
import { Check, ChevronRight, X } from "lucide-react"

import type { UserRole } from "@/lib/api/user"
import type {AdminUser} from "@/lib/actions/better-auth-users"
import { RoleSelect } from "./role-select"
import { updateUserRole } from "@/lib/actions/users"

// Role pill colors — Admin amber, Recruiter blue, Seeker neutral gray
const rolePill: Record<UserRole, string> = {
  admin: "border-[#f59e0b]/30 bg-[#f59e0b]/15 text-[#f59e0b]",
  recruiter: "border-[#60a5fa]/30 bg-[#60a5fa]/15 text-[#60a5fa]",
  seeker: "border-white/[0.07] bg-[#a1a4aa]/15 text-[#a0a0ab]",
}

// Avatar fallback colors
const avatarPalette = ["#5c53fe", "#0ea5e9", "#f59e0b", "#22c55e", "#ef4444"]

// Role shown for users whose role field is missing (Better Auth defaults to seeker)
const displayRole = (role?: UserRole | null): UserRole => role ?? "seeker"

// Formatted join date
const fmtJoined = (date?: string | Date) => {
  if (!date) return "—"

  const parsed = new Date(date)

  return Number.isNaN(parsed.getTime())
    ? "—"
    : parsed.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
}

// Role pill
const RolePill = ({ role }: { role: UserRole }) => (
  <span
    className={`inline-flex h-[22px] items-center border px-[11px] text-[12px] leading-4 font-medium whitespace-nowrap capitalize ${
      rolePill[role]
    }`}
  >
    {role}
  </span>
)

// Verified badge — green check or neutral dash
const VerifiedBadge = ({ verified }: { verified?: boolean }) => (
  <span
    className={`inline-flex size-6 items-center justify-center rounded-full border ${
      verified
        ? "border-[#22c55e]/30 bg-[#22c55e]/15"
        : "border-white/[0.07] bg-[#a1a4aa]/15"
    }`}
    aria-label={verified ? "Email verified" : "Email not verified"}
  >
    {verified ? (
      <Check className="size-3.5 text-[#22c55e]" strokeWidth={2.5} />
    ) : (
      <X className="size-3.5 text-[#a0a0ab]" strokeWidth={2.5} />
    )}
  </span>
)

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

// User avatar = initials from the name (falls back to the email)
const UserAvatar = ({ user, index }: { user: AdminUser; index: number }) => {
  const source = user.name || user.email
  const initials = source.slice(0, 2).toUpperCase()

  return (
    <span
      className="flex size-9 shrink-0 items-center justify-center rounded-full text-[13px] leading-5 font-semibold text-white"
      style={{ backgroundColor: avatarPalette[index % avatarPalette.length] }}
    >
      {initials}
    </span>
  )
}

const tableHeadings = ["User", "Role", "Verified", "Joined", "Change Role"]

// Table column widths
const colWidths = ["w-[30%]", "w-[14%]", "w-[14%]", "w-[18%]", "w-[24%]"]

type UsersBoardProps = {
  users: AdminUser[]
}

export function UsersBoard({ users }: UsersBoardProps) {
  // Users with any local role changes applied
  const [rows, setRows] = useState(users)

  // Changes a user's role in local state only.
  // TODO: persist with the role update API (e.g. Better Auth admin
  // setRole) — the role update logic will be implemented later.
  const handleRoleChange = async (id: string, role: UserRole) => {
    setRows((prev) =>
      prev.map((row) => (row.id === id ? { ...row, role } : row))
    )

    const res = await updateUserRole(id, role)

    if(res.modifiedCount> 0){
      console.log("Role Updated Succesfully"); 
    }
  }
  // Live statistics from the current roles
  const total = rows.length

  const countByRole = (role: UserRole) =>
    rows.filter((row) => displayRole(row.role) === role).length

  const stats = [
    {
      label: "Total Users",
      value: String(total),
      valueClass: "text-white",
    },
    {
      label: "Seekers",
      value: String(countByRole("seeker")),
      valueClass: "text-[#a0a0ab]",
    },
    {
      label: "Recruiters",
      value: String(countByRole("recruiter")),
      valueClass: "text-[#60a5fa]",
    },
    {
      label: "Admins",
      value: String(countByRole("admin")),
      valueClass: "text-[#f59e0b]",
    },
  ]

  return (
    <div className="min-h-screen w-full min-w-0 bg-[#131314]">
      <div className="mx-auto w-full max-w-[1400px] min-w-0 px-4 pt-8 pb-12 sm:px-6 lg:px-8 lg:pt-12">
        {/* Breadcrumb */}
        <div className="flex min-w-0 items-center gap-2">
          <Link
            href="/dashboard/admin"
            className="shrink-0 text-[13px] leading-5 text-[#a0a0ab] hover:underline"
          >
            Dashboard
          </Link>

          <ChevronRight
            className="h-3 w-[7.5px] shrink-0 text-[#a0a0ab]"
            strokeWidth={2}
          />

          <span className="shrink-0 text-[13px] leading-5 font-medium text-[#c3c0ff]">
            Users
          </span>
        </div>

        {/* Heading */}
        <div className="mt-3 min-w-0">
          <h1 className="text-2xl leading-tight font-medium tracking-[-0.8px] text-white sm:text-[32px] sm:leading-[42px]">
            User Management
          </h1>

          <p className="mt-1 max-w-2xl text-sm leading-[22px] text-[#a0a0ab]">
            Review everyone on the platform, monitor their roles and manage
            access across HireLoop.
          </p>
        </div>

        {/* Stats overview */}
        <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {stats.map((stat) => (
            <StatTile key={stat.label} {...stat} />
          ))}
        </div>

        {/* Users table */}
        <div className="mt-6 w-full min-w-0 overflow-hidden rounded-[16px] border border-[#232327] bg-[#151516] shadow-[0_8px_10px_-6px_rgba(0,0,0,0.10),0_20px_25px_-5px_rgba(0,0,0,0.10)]">
          <div className="w-full overflow-x-auto">
            <table className="w-full min-w-[860px] table-fixed border-collapse text-left">
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
                      No users found.
                    </td>
                  </tr>
                ) : (
                  rows.map((user, index) => {
                    const role = displayRole(user.role)

                    return (
                      <tr
                        key={user.id}
                        className="border-b border-[#232327] last:border-b-0"
                      >
                        {/* User */}
                        <td className="min-w-0 p-2 sm:p-3">
                          <div className="flex min-w-0 items-center gap-2.5">
                            <UserAvatar user={user} index={index} />

                            <div className="min-w-0">
                              <p className="truncate text-xs leading-5 font-semibold text-white sm:text-sm">
                                {user.name || "Unnamed user"}
                              </p>

                              <p className="truncate text-[10px] leading-5 text-[#a0a0ab] sm:text-[11px]">
                                {user.email}
                              </p>
                            </div>
                          </div>
                        </td>

                        {/* Role */}
                        <td className="p-2 sm:p-3">
                          <RolePill role={role} />
                        </td>

                        {/* Verified */}
                        <td className="p-2 sm:p-3">
                          <VerifiedBadge verified={user.emailVerified} />
                        </td>

                        {/* Joined */}
                        <td className="min-w-0 p-2 sm:p-3">
                          <p className="truncate text-[11px] leading-5 font-medium text-white sm:text-[13px]">
                            {fmtJoined(user.createdAt)}
                          </p>
                        </td>

                        {/* Change role (local only — role update logic comes later) */}
                        <td className="p-2 sm:p-3">
                          <RoleSelect
                            value={role}
                            onChange={(nextRole) =>
                              handleRoleChange(user.id, nextRole)
                            }
                            ariaLabel={`Change role for ${user.email}`}
                          />
                        </td>
                      </tr>
                    )
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
