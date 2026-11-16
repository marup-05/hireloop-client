
import { notFound } from "next/navigation"
import { getSession } from "@/lib/core/server"
import { getJob } from "@/lib/api/jobs"
import { getJobApplications } from "@/lib/api/applications"
import { ApplicationsBoard } from "./_components/applications-board"

// Job ids are MongoDB ObjectIds — 24 hex characters
const isObjectId = (id: string) => /^[0-9a-fA-F]{24}$/.test(id)

export default async function JobApplicationsPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  // Anything that isn't a valid job id can't have applications
  if (!isObjectId(id)) {
    notFound()
  }

  // Only signed-in users can review applications
  const session = await getSession()

  if (!session?.user?.id) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#131314] text-[#ededef]">
        Please sign in to review job applications.
      </div>
    )
  }

  // Load the job — an unknown id gets the 404 page
  let job = null

  try {
    job = await getJob(id)
  } catch {
    job = null
  }

  if (!job) {
    notFound()
  }

  // All applications submitted for this job
  const applications = await getJobApplications(id)

  return <ApplicationsBoard job={job} applications={applications} />
}
