import { JobRow } from "@/app/dashboard/recruiter/jobs/page"

const BASE_URL= process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000" 

export const getJobs = async (query = ""): Promise <JobRow[]> =>{

    const res = await fetch(`${BASE_URL}/jobs?${query}`) 
    return res.json()
}

// single job by MongoDB id — returns null when the job doesn't exist,
// throws when the backend is unreachable (so pages can show an error state)
export const getJob = async (id: string): Promise <JobRow | null> =>{

    const res = await fetch(`${BASE_URL}/jobs/${id}`)

    if (!res.ok) {
        throw new Error(`Failed to load job (${res.status})`)
    }

    return res.json()
}