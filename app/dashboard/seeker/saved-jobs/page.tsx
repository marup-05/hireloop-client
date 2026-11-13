
import { auth } from "@/lib/auth"
import { headers } from "next/headers"
import { getSavedJobs, type SavedJob } from "@/lib/api/saved-jobs"
import { SavedJobsBoard } from "./_components/saved-jobs-board"

// Seeker Dashboard → Saved Jobs. Data is fetched server-side from the
// backend so the saved state is always correct, then handed to the client
// board for instant unsave updates.
export default async function SavedJobsPage() {
  // Get current logged-in user session
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  // Check if user is logged in
  if (!session?.user?.id) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#0e0e11] text-[#ededef]">
        Please sign in to view your saved jobs.
      </div>
    )
  }

  // Fetch current user's saved jobs
  let savedJobs: SavedJob[] = []
  let failed = false

  try {
    savedJobs = await getSavedJobs(session.user.id)
  } catch {
    failed = true
  }

  // Backend/API failure state
  if (failed) {
    return (
      <div className="flex min-h-screen w-full items-center justify-center bg-[#0e0e11] px-4">
        <div className="w-full max-w-[520px] border border-white/[0.07] bg-[#141418] p-[33px] text-center shadow-[0_1px_2px_0_rgba(0,0,0,0.35),inset_0_1px_0_0_rgba(255,255,255,0.04)]">
          <h1 className="text-[22px] leading-7 font-semibold tracking-[-0.4px] text-[#ededef]">
            Something went wrong
          </h1>

          <p className="mt-3 text-[13px] leading-5 text-[#a0a0ab]">
            We couldn&apos;t load your saved jobs right now. Please try again
            in a moment.
          </p>

          <a
            href="/dashboard/seeker/saved-jobs"
            className="mt-6 inline-flex h-10 items-center bg-white px-5 text-sm font-semibold text-[#2f3131] shadow-[0_1px_2px_0_rgba(0,0,0,0.35)] outline-none active:translate-y-px"
          >
            Try again
          </a>
        </div>
      </div>
    )
  }

  return <SavedJobsBoard savedJobs={savedJobs} />
}
