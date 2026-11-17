
const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000"

// Platform roles available in HireLoop
export type UserRole = "seeker" | "recruiter" | "admin"

// Admin-facing user record shown in the Users management table

// Get all platform users (Better Auth admin plugin — requires an admin session)

export const getUserPremiumById = async (userId: string) => {
  const res = await fetch(`${BASE_URL}/users/${userId}/premium`)
  return res.json()
}
