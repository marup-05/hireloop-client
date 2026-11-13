
import { auth } from "@/lib/auth"
import { headers } from "next/headers"
import { getMyApplications } from "@/lib/api/applications"
import { ApplicationsBoard } from "./_components/applications-board"

export default async function MyApplicationsPage() {
  // Get current logged-in user session
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  // Check if user is logged in
  if (!session?.user?.id) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#0e0e11] text-[#ededef]">
        Please sign in to view your applications.
      </div>
    )
  }

  // Fetch current user's applications
  const applications = await getMyApplications(session.user.id)

  return <ApplicationsBoard applications={applications} />
}
