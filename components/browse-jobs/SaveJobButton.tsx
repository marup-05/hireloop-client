
"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Bookmark, Loader2 } from "lucide-react"
import { toast } from "sonner"

import { useSession } from "@/lib/auth-client"
import { removeSavedJob, saveJob } from "@/lib/api/saved-jobs"

// Bookmark button rendered on top of the job card's stretched link.
//
// `saved` always comes from backend data (fetched on page load), never from
// local-only state. After a successful save/unsave the parent is notified via
// `onChanged` so its backend-derived set stays in sync. Clicks are ignored
// while a request is in flight to prevent duplicate requests.
export function SaveJobButton({
  jobId,
  saved,
  onChanged,
}: {
  jobId: string
  saved: boolean
  onChanged?: (saved: boolean) => void
}) {
  const { data: session, isPending } = useSession()
  const router = useRouter()
  const [pending, setPending] = useState(false)

  const handleClick = async () => {
    if (isPending || pending) return

    const user = session?.user

    if (!user) {
      // Not signed in — go to the existing sign-in page and remember
      // where the user came from (existing auth flow supports redirectTo)
      router.push(
        `/sign-in?redirectTo=${encodeURIComponent(window.location.pathname)}`
      )
      return
    }

    setPending(true)

    try {
      if (saved) {
        await removeSavedJob(user.id, jobId)
        onChanged?.(false)
      } else {
        await saveJob(user.id, jobId)
        onChanged?.(true)
      }
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Something went wrong"
      )
    } finally {
      setPending(false)
    }
  }

  return (
    <button
      type="button"
      aria-label={saved ? "Remove job from saved" : "Save job"}
      aria-pressed={saved}
      onClick={handleClick}
      className="relative z-10 flex size-10 shrink-0 items-center justify-center outline-none"
    >
      {pending ? (
        <Loader2
          className="size-[18px] animate-spin text-[#8e9192]"
          strokeWidth={2}
        />
      ) : (
        <Bookmark
          className={`size-[18px] ${
            saved
              ? "fill-[#5c53fe] text-[#5c53fe]"
              : "text-[#8e9192]"
          }`}
          strokeWidth={2}
        />
      )}
    </button>
  )
}
