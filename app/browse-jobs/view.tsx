"use client"

import { useState } from "react"
import { Select } from "@/components/ui/select"
import { JobSearchBar } from "@/components/browse-jobs/JobSearchBar"
import {
  JobFilterSidebar,
  type FilterGroup,
} from "@/components/browse-jobs/JobFilterSidebar"
import { JobCard } from "@/components/browse-jobs/JobCard"
import type { JobRow } from "@/app/dashboard/recruiter/jobs/page"

// Job Type and Job Category filters
const groups: FilterGroup[] = [
  {
    title: "Job Type",
    options: [
      { label: "Full-time", value: "Full-time", count: 15 },
      { label: "Part-time", value: "Part-time", count: 2 },
      { label: "Contract", value: "Contract", count: 2 },
      { label: "Internship", value: "Internship", count: 2 },
    ],
  },
  {
    title: "Job Category",
    options: [
      {
        label: "Engineering & Tech",
        value: "Engineering & Tech",
        count: 6,
      },
      {
        label: "Design & Creative",
        value: "Design & Creative",
        count: 3,
      },
      {
        label: "Marketing",
        value: "Marketing",
        count: 3,
      },
      {
        label: "Sales",
        value: "Sales",
        count: 3,
      },
      {
        label: "Finance",
        value: "Finance",
        count: 3,
      },
      {
        label: "Customer Support",
        value: "Customer Support",
        count: 3,
      },
    ],
  },
]

// Browse Jobs view
export default function BrowseJobsView({ jobs }: { jobs: JobRow[] }) {
  const [sort, setSort] = useState("Most Recent")

  return (
    <div className="mx-auto w-full max-w-[1280px] px-4 pt-4 pb-16 sm:px-6 lg:px-8">
      {/* Search & quick filters */}
      <div className="border border-white/[0.07] bg-[#141418] p-[25px] shadow-[0_1px_2px_0_rgba(0,0,0,0.35),inset_0_1px_0_0_rgba(255,255,255,0.04)]">
        <JobSearchBar />
      </div>

      {/* Sidebar filters + job listing */}
      <div className="mt-6 grid items-start gap-8 lg:grid-cols-[296px_minmax(0,1fr)]">
        <JobFilterSidebar groups={groups} />

        <section className="min-w-0">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <h2 className="text-[22px] leading-[28px] font-semibold tracking-[-0.4px] text-[#ededef]">
              Found {jobs.length.toLocaleString("en-US")} Professional Jobs
            </h2>

            <div className="flex items-center gap-3">
              <span className="text-[13px] leading-5 font-medium text-[#6e6e78]">
                Sort by:
              </span>

              <div className="w-[141px]">
                <Select
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                  aria-label="Sort jobs"
                  className="h-9 rounded-none border-white/10 bg-[#0c0c0f] px-3 text-[13px] leading-5 font-medium text-[#ededef] md:text-[13px] dark:bg-[#0c0c0f]"
                >
                  <option>Most Recent</option>
                  <option>Oldest</option>
                  <option>Highest Salary</option>
                  <option>Lowest Salary</option>
                </Select>
              </div>
            </div>
          </div>

          <div className="mt-6 space-y-3">
            {jobs.map((job) => (
              <JobCard key={job._id} job={job} href={`/browse-jobs/${job._id}`} />
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
