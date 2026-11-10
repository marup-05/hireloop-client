
"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import {
  Building2,
  Calendar,
  ChevronRight,
  DollarSign,
  Globe,
  MapPin,
} from "lucide-react"
import type { NewJob } from "@/app/dashboard/recruiter/jobs/new/page"
import { getJobById } from "@/lib/actions/jobs"

const c = {
  label: "text-[14px] font-medium leading-[18px] text-[#f4f4f5]",
}

const inputClass =
  "h-11 w-full rounded-[12px] bg-[#1e1e21] text-sm leading-[17px] text-white outline-none"

const ViewJobPage = () => {
  const params = useParams()
  const jobId = params.id as string

  const [job, setJob] = useState<NewJob | null>(null)

  useEffect(() => {
    const loadJob = async () => {
      const result = await getJobById(jobId)
      setJob(result)
    }

    loadJob()
  }, [jobId])

  if (!job) {
    return (
      <div className="min-h-screen bg-[#131314] p-6 text-white">
        Loading job...
      </div>
    )
  }

  return (
    <div className="min-h-screen w-full bg-[#131314]">
      <div className="mx-auto max-w-[984px] px-6 pt-16 pb-5">
        <div className="border-b border-[#2a2a2b] pt-6 pb-[25px]">
          <div className="flex items-center gap-2">
            <a
              href="/dashboard/recruiter/jobs"
              className="text-[12px] leading-4 font-medium text-[#a0a0ab] hover:underline"
            >
              Manage Jobs
            </a>
            <ChevronRight className="h-3 w-[7.5px] text-[#5a5a60]" strokeWidth={2} />
            <span className="text-[12px] leading-4 font-medium text-[#c3c0ff]">
              View Job
            </span>
          </div>

          <h1 className="mt-1 text-[32px] leading-[42px] font-medium tracking-[-0.8px] text-white">
            Job Details
          </h1>
          <p className="mt-1 text-[13px] leading-5 text-[#a0a0ab]">
            View all information about this job listing.
          </p>
        </div>

        <div className="mt-6 space-y-6">
          <section className="rounded-[16px] bg-[#151516] p-6">
            <div className="flex items-center gap-2">
              <span className="size-2 rounded-full bg-[#5c53fe]" />
              <h2 className="text-base leading-6 font-medium text-white">
                1. Basic Information
              </h2>
            </div>

            <div className="mt-5 space-y-4">
              <div>
                <label className={c.label}>Job Title</label>
                <div className={`${inputClass} mt-1 flex items-center px-4`}>
                  {job.title}
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className={c.label}>Company Name</label>
                  <div className="relative mt-1">
                    <Building2 className="absolute top-1/2 left-[14px] size-5 -translate-y-1/2 text-[#a0a0ab]" />
                    <div className={`${inputClass} flex items-center pr-4 pl-10`}>
                      {job.company}
                    </div>
                  </div>
                </div>

                <div>
                  <label className={c.label}>Job Category</label>
                  <div className={`${inputClass} mt-1 flex items-center px-4`}>
                    {job.category}
                  </div>
                </div>
              </div>

              <div>
                <label className={c.label}>Job Type</label>
                <div className="mt-1 grid grid-cols-2 gap-1 md:grid-cols-4">
                  {["Full-time", "Part-time", "Contract", "Internship"].map((type) => (
                    <div
                      key={type}
                      className={`flex h-11 items-center justify-center rounded-[12px] text-sm ${
                        job.jobType === type
                          ? "border border-[#5c53fe] bg-[#232327] font-medium text-white"
                          : "bg-[#1e1e21] text-[#a0a0ab]"
                      }`}
                    >
                      {type}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section className="rounded-[16px] bg-[#151516] p-6">
            <div className="flex items-center gap-2">
              <span className="size-2 rounded-full bg-[#5c53fe]" />
              <h2 className="text-base leading-6 font-medium text-white">
                2. Location, Compensation &amp; Timeline
              </h2>
            </div>

            <div className="mt-5 space-y-4">
              <div className="flex items-center justify-between gap-3 rounded-[12px] border border-[#232327] bg-[#1e1e21] p-[13px]">
                <div className="flex items-center gap-[10px]">
                  <span className="flex size-8 items-center justify-center rounded-lg bg-[#232327]">
                    <Globe className="size-5 text-[#c3c0ff]" />
                  </span>
                  <div>
                    <p className="text-sm font-medium text-white">
                      Remote Work Allowed
                    </p>
                    <p className="text-[13px] text-[#a0a0ab]">
                      {job.isRemote ? "Yes" : "No"}
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className={c.label}>Job Location</label>
                  <div className="relative mt-1">
                    <MapPin className="absolute top-1/2 left-4 h-5 w-4 -translate-y-1/2 text-[#a0a0ab]" />
                    <div className={`${inputClass} flex items-center pr-4 pl-10`}>
                      {job.location}
                    </div>
                  </div>
                </div>

                <div>
                  <label className={c.label}>Application Deadline</label>
                  <div className="relative mt-1">
                    <Calendar className="absolute top-1/2 left-[15px] h-5 w-[18px] -translate-y-1/2 text-[#a0a0ab]" />
                    <div className={`${inputClass} flex items-center pr-4 pl-10`}>
                      {job.deadline}
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                <div>
                  <label className={c.label}>Min Salary / Rate</label>
                  <div className="relative mt-1">
                    <DollarSign className="absolute top-1/2 left-[15px] size-[18px] -translate-y-1/2 text-[#a0a0ab]" />
                    <div className={`${inputClass} flex items-center pr-4 pl-9`}>
                      {job.minSalary}
                    </div>
                  </div>
                </div>

                <div>
                  <label className={c.label}>Max Salary / Rate</label>
                  <div className="relative mt-1">
                    <DollarSign className="absolute top-1/2 left-[15px] size-[18px] -translate-y-1/2 text-[#a0a0ab]" />
                    <div className={`${inputClass} flex items-center pr-4 pl-9`}>
                      {job.maxSalary}
                    </div>
                  </div>
                </div>

                <div>
                  <label className={c.label}>Frequency</label>
                  <div className={`${inputClass} mt-1 flex items-center px-4`}>
                    {job.salaryFrequency}
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="rounded-[16px] bg-[#151516] p-6">
            <div className="flex items-center gap-2">
              <span className="size-2 rounded-full bg-[#5c53fe]" />
              <h2 className="text-base leading-6 font-medium text-white">
                3. Responsibilities &amp; Requirements
              </h2>
            </div>

            <div className="mt-5 space-y-4">
              <div>
                <label className={c.label}>Key Responsibilities</label>
                <div className="mt-1 min-h-[98px] rounded-[12px] bg-[#1e1e21] px-4 py-4 text-sm leading-[22px] text-white whitespace-pre-wrap">
                  {job.responsibilities}
                </div>
              </div>

              <div>
                <label className={c.label}>Qualifications &amp; Requirements</label>
                <div className="mt-1 min-h-[98px] rounded-[12px] bg-[#1e1e21] px-4 py-4 text-sm leading-[22px] text-white whitespace-pre-wrap">
                  {job.qualifications}
                </div>
              </div>
            </div>
          </section>

          <a
            href="/dashboard/recruiter/jobs"
            className="inline-flex h-11 items-center rounded-[12px] bg-[#5c53fe] px-6 text-sm font-medium text-white"
          >
            Back to Manage Jobs
          </a>
        </div>
      </div>
    </div>
  )
}

export default ViewJobPage
