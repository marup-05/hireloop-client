
import type { JobRow } from "@/app/dashboard/recruiter/jobs/page"

const BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000"

// One saved-jobs record — `job` is the complete job document joined by the
// backend's $lookup from the jobs collection
export type SavedJob = {
  _id: string
  userId: string
  jobId: string
  savedAt: string
  job: JobRow
}

// Shared fetch wrapper — throws with the backend's message when available
const request = async (url: string, options?: RequestInit) => {
  const res = await fetch(url, options)

  if (!res.ok) {
    let message = `Request failed (${res.status})`

    try {
      const body = await res.json()

      if (body?.message) {
        message = body.message
      }
    } catch {
      // non-JSON error body — keep the generic message
    }

    throw new Error(message)
  }

  return res.json()
}

// Save a job for a user
export const saveJob = async (userId: string, jobId: string) => {
  return request(`${BASE_URL}/saved-jobs`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({ userId, jobId }),
  })
}

// Get all saved jobs of a user (newest first)
export const getSavedJobs = async (userId: string): Promise<SavedJob[]> => {
  return request(
    `${BASE_URL}/saved-jobs?userId=${encodeURIComponent(userId)}`,
    {
      cache: "no-store",
    }
  )
}

// Unsave a job for a user
export const removeSavedJob = async (userId: string, jobId: string) => {
  return request(
    `${BASE_URL}/saved-jobs/${jobId}?userId=${encodeURIComponent(userId)}`,
    {
      method: "DELETE",
    }
  )
}
