const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000"

// Fields decided from the "Seeker / My Applications" page — it shows the job
// title, company, job type + workplace, when it was applied and its status.
export type ApplicationStatus =
  | "Applied"
  | "Review"
  | "Shortlisted"
  | "Rejected"
  | "Offered"

export type ApplicationData = {
  jobId: string
  userId: string
  email: string
  jobTitle: string
  companyName: string
  jobType: string
  /** "Remote" | "On-site" (later also "Hybrid") — derived from the job */
  workplace: string
  /** ISO date string captured at apply time */
  appliedAt: string
  status: ApplicationStatus
}

// A stored application document (with its MongoDB id)
export type Application = ApplicationData & { _id: string }

export const applyToJob = async (data: ApplicationData) => {
  const res = await fetch(`${BASE_URL}/applications`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(data),
  })

  if (!res.ok) {
    throw new Error("Failed to apply for this job")
  }

  return res.json()
}
