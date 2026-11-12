const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000"

export type ApplicationData = {
  jobId: string
  userId: string
  email: string
  jobTitle: string
  companyName: string
}

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
