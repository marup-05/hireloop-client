
"use client"

import type { UserRole } from "@/lib/api/user"

// All selectable platform roles
const roleOptions: UserRole[] = ["seeker", "recruiter", "admin"]

// Dropdown to change a user's role — styled to match the applications
// board's "Update Status" select so the dashboard stays consistent.
export function RoleSelect({
  value,
  onChange,
  ariaLabel,
}: {
  value: UserRole
  onChange: (role: UserRole) => void
  ariaLabel: string
}) {
  return (
    <select
      value={value}
      onChange={(event) => onChange(event.target.value as UserRole)}
      aria-label={ariaLabel}
      className="h-8 w-full max-w-[170px] cursor-pointer rounded-lg border border-[#232327] bg-[#1f1f1f] px-2 text-xs leading-5 text-[#d4d4d8] outline-none focus:border-[#5c53fe]"
    >
      {roleOptions.map((role) => (
        <option key={role} value={role}>
          {role.charAt(0).toUpperCase() + role.slice(1)}
        </option>
      ))}
    </select>
  )
}
