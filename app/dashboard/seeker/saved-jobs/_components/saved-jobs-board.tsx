
"use client"

import { useState } from "react"
import Link from "next/link"
import { BookmarkX, PanelLeft, PanelRight, Search, User } from "lucide-react"

import { JobCard } from "@/components/browse-jobs/JobCard"
import { SaveJobButton } from "@/components/browse-jobs/SaveJobButton"
import type { SavedJob } from "@/lib/api/saved-jobs"

// "Saved Dec 12, 2026" — the savedAt timestamp from the backend
const fmtSavedDate = (iso: string) => {
  const date = new Date(iso).getTime()

  if (Number.isNaN(date)) return "Recently"

  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  })
}

type SavedJobsBoardProps = {
  savedJobs: SavedJob[]
}

export function SavedJobsBoard({ savedJobs }: SavedJobsBoardProps) {
  // Local list starts from the backend data; unsaving removes the card
  // immediately without a page refresh
  const [jobs, setJobs] = useState(savedJobs)

  const handleUnsave = (jobId: string, saved: boolean) => {
    if (saved) return

    setJobs((prev) => prev.filter((saved2) => saved2.jobId !== jobId))
  }

  return (
    <div className="relative min-h-screen w-full min-w-0 overflow-hidden bg-[#0e0e11]">
      {/* Figma decorative glow */}
      <span
        aria-hidden
        className="pointer-events-none absolute -right-24 -bottom-24 size-96 rounded-full bg-white/5 blur-[100px]"
      />

      {/* Top nav bar */}
      <header className="relative flex h-14 items-center justify-between gap-4 border-b border-white/[0.07] px-4 sm:px-8">
        {/* Search */}
        <div className="flex h-9 w-full max-w-[320px] min-w-0 items-center gap-3 border border-white/[0.07] bg-[#0c0c0f] px-3">
          <Search
            className="size-[15px] shrink-0 text-[#c4c7c8]"
            strokeWidth={2}
          />

          <input
            type="text"
            placeholder="Search saved jobs..."
            className="w-full min-w-0 bg-transparent text-[13px] leading-5 text-[#ededef] outline-none placeholder:text-[#828997]"
          />
        </div>

        <div className="flex shrink-0 items-center gap-1">
          <button
            type="button"
            aria-label="Toggle panel"
            className="flex size-9 items-center justify-center outline-none"
          >
            <PanelLeft
              className="size-[15px] text-[#c4c7c8]"
              strokeWidth={2}
            />
          </button>

          <button
            type="button"
            aria-label="Toggle layout"
            className="flex size-9 items-center justify-center outline-none"
          >
            <PanelRight
              className="size-[15px] text-[#c4c7c8]"
              strokeWidth={2}
            />
          </button>

          <span className="ml-1 flex size-8 shrink-0 items-center justify-center rounded-full border border-white/[0.07] bg-[#222228]">
            <User
              className="size-4 text-[#c4c7c8]"
              strokeWidth={2}
            />
          </span>
        </div>
      </header>

      {/* Content */}
      <div className="relative px-4 pt-6 pb-16 sm:px-8">
        {/* Header section */}
        <div className="flex min-w-0 flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="min-w-0">
            <h1 className="text-[22px] leading-7 font-semibold tracking-[-0.4px] text-[#ededef]">
              Saved Jobs
            </h1>

            <p className="mt-2 text-[13px] leading-5 text-[#ededef]">
              {jobs.length} job{jobs.length === 1 ? "" : "s"} you bookmarked
              to apply later.
            </p>
          </div>
        </div>

        {/* Empty state */}
        {jobs.length === 0 ? (
          <div className="mt-6 flex min-h-[320px] items-center justify-center">
            <div className="w-full max-w-[520px] border border-white/[0.07] bg-[#141418] p-[33px] text-center shadow-[0_1px_2px_0_rgba(0,0,0,0.35),inset_0_1px_0_0_rgba(255,255,255,0.04)]">
              <BookmarkX
                className="mx-auto size-8 text-[#6e6e78]"
                strokeWidth={2}
              />

              <h2 className="mt-4 text-[22px] leading-7 font-semibold tracking-[-0.4px] text-[#ededef]">
                No saved jobs yet
              </h2>

              <p className="mt-3 text-[13px] leading-5 text-[#a0a0ab]">
                Browse jobs and tap the bookmark icon to save them for later.
              </p>

              <Link
                href="/browse-jobs"
                className="mt-6 inline-flex h-10 items-center bg-white px-5 text-sm font-semibold text-[#2f3131] shadow-[0_1px_2px_0_rgba(0,0,0,0.35)] outline-none active:translate-y-px"
              >
                Browse Jobs
              </Link>
            </div>
          </div>
        ) : (
          /* Saved job cards */
          <div className="mt-6 grid items-start gap-3 md:grid-cols-2">
            {jobs.map((saved) => (
              <JobCard
                key={saved._id}
                job={saved.job}
                href={`/browse-jobs/${saved.jobId}`}
                saveButton={
                  <SaveJobButton
                    jobId={saved.jobId}
                    saved={true}
                    onChanged={(next) => handleUnsave(saved.jobId, next)}
                  />
                }
                footer={
                  <div className="mt-5 flex items-center justify-between gap-3 border-t border-white/[0.07] pt-4">
                    <span className="truncate text-[13px] leading-5 text-[#a0a0ab]">
                      {saved.job.category}
                    </span>

                    <span className="shrink-0 text-[13px] leading-5 text-[#6e6e78]">
                      Saved {fmtSavedDate(saved.savedAt)}
                    </span>
                  </div>
                }
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
