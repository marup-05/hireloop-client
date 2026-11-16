
import { JobRow } from "@/app/dashboard/recruiter/jobs/page"

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000"

export const getJobs = async (
  query = "",
  recruiterId?: string
): Promise<JobRow[]> => {
  const params = new URLSearchParams(query)

  if (recruiterId) {
    params.set("recruiterId", recruiterId)
  }

  console.log("Fetching jobs URL:", `${BASE_URL}/jobs?${params.toString()}`)

  const res = await fetch(`${BASE_URL}/jobs?${params.toString()}`)

  return res.json()
}

// single job by MongoDB id
export const getJob = async (id: string): Promise<JobRow | null> => {
  const res = await fetch(`${BASE_URL}/jobs/${id}`)

  if (!res.ok) {
    throw new Error(`Failed to load job (${res.status})`)
  }

  return res.json()
}
