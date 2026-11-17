import { headers } from "next/headers"
import { auth } from "../auth"

export type AdminUser = {
  id: string
  name: string
  email: string
  role?: UserRole | null
  emailVerified?: boolean
  createdAt?: string | Date
}

export const getUsers = async (): Promise<AdminUser[]> => {
  const result = await auth.api.listUsers({
    query: {
      sortBy: "name", // The field to sort by.
      sortDirection: "desc", // The direction to sort by.
    },
    // This endpoint requires session cookies.
    headers: await headers(),
  })

  return (result?.users ?? []) as AdminUser[]
}