const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000"

// Application status
export type ApplicationStatus =
  "Applied" | "Review" | "Shortlisted" | "Rejected" | "Offered"

// Application data type
export type ApplicationData = {
  jobId: string
  userId: string
  email: string
  jobTitle: string
  companyName: string
  jobType: string
  workplace: string
  appliedAt: string
  status: ApplicationStatus
}

// Stored application with MongoDB ID
export type Application = ApplicationData & {
  _id: string
}

// Apply for a job
export const applyToJob = async (data: ApplicationData) => {
  const res = await fetch(`${BASE_URL}/applications`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })

  if (!res.ok) {
    throw new Error("Failed to apply for this job")
  }

  return res.json()
}

// Get applications of a specific user
export const getMyApplications = async (
  userId: string
): Promise<Application[]> => {
  const res = await fetch(
    `${BASE_URL}/applications?applicantId=${encodeURIComponent(userId)}`,
    {
      cache: "no-store",
    }
  )

  if (!res.ok) {
    throw new Error("Failed to fetch applications")
  }

  return res.json()
}

// Get applications submitted for a specific job
export const getJobApplications = async (
  jobId: string
): Promise<Application[]> => {
  const res = await fetch(
    `${BASE_URL}/applications?jobId=${encodeURIComponent(jobId)}`,
    {
      cache: "no-store",
    }
  )

  if (!res.ok) {
    throw new Error("Failed to fetch job applications")
  }

  return res.json()
}

// Get total application count of a user
export const getMyApplicationsCount = async (
  userId: string
): Promise<number> => {
  const res = await fetch(
    `${BASE_URL}/applications/count?applicantId=${encodeURIComponent(userId)}`,
    {
      cache: "no-store",
    }
  )

  if (!res.ok) {
    throw new Error("Failed to fetch applications count")
  }

  const data: { count: number } = await res.json()

  return data.count
}

// Update application status
export const updateApplicationsStatus = async (
  id: string,
  data: { status: ApplicationStatus }
) => {
  const res = await fetch(`${BASE_URL}/applications/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })

  if (!res.ok) {
    const error = await res.text()
    throw new Error(`Update failed: ${res.status} - ${error}`)
  }

  return res.json()
}
