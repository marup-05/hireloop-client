
"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import {
  Building2,
  Calendar,
  ChevronDown,
  ChevronRight,
  DollarSign,
  Globe,
  MapPin,
  Send,
} from "lucide-react"
import { toast } from "sonner"
import type { NewJob } from "@/app/dashboard/recruiter/jobs/new/page"
import { getJobById, updateJob } from "@/lib/actions/jobs"

const c = {
  label: "text-[14px] font-medium leading-[18px] text-[#f4f4f5]",
}

const inputClass =
  "h-11 w-full rounded-[12px] bg-[#1e1e21] text-sm leading-[17px] text-white outline-none placeholder:text-[#5a5a60]"

const jobTypes = ["Full-time", "Part-time", "Contract", "Internship"]

const categories = [
  "Engineering & Tech",
  "Design & Creative",
  "Marketing",
  "Sales",
  "Finance",
  "Customer Support",
]

const salaryFrequencies = [
  "per hour",
  "per day",
  "per week",
  "per month",
  "per year",
]

const EditJobPage = () => {
  const params = useParams()
  const router = useRouter()
  const jobId = params.id as string

  const [job, setJob] = useState<NewJob | null>(null)

  useEffect(() => {
    const loadJob = async () => {
      const result = await getJobById(jobId)

      const { _id, ...jobData } = result
      setJob(jobData)
    }

    loadJob()
  }, [jobId])

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    if (job) {
      setJob((prev) =>
        prev ? { ...prev, [e.target.name]: e.target.value } : prev
      )
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (job) {
      const result = await updateJob(jobId, job)

      if (result.matchedCount > 0) {
        toast.success("Job updated successfully!", {
          description: "Your job post has been updated.",
        })

        router.push("/dashboard/recruiter/jobs")
      } else {
        toast.error("Update failed!", {
          description: "Could not update this job post.",
        })
      }
    }
  }

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
              Update Job
            </span>
          </div>

          <h1 className="mt-1 text-[32px] leading-[42px] font-medium tracking-[-0.8px] text-white">
            Update Job Post
          </h1>
          <p className="mt-1 text-[13px] leading-5 text-[#a0a0ab]">
            Update the position specifications and job details.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-6 space-y-6">
          <section className="rounded-[16px] bg-[#151516] p-6">
            <div className="flex items-center gap-2">
              <span className="size-2 rounded-full bg-[#5c53fe]" />
              <h2 className="text-base leading-6 font-medium text-white">
                1. Basic Information
              </h2>
            </div>

            <div className="mt-5 space-y-4">
              <div>
                <label htmlFor="title" className={c.label}>
                  Job Title *
                </label>
                <input
                  id="title"
                  name="title"
                  value={job.title}
                  onChange={handleChange}
                  className={`${inputClass} mt-1 px-4`}
                  required
                />
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label htmlFor="company" className={c.label}>
                    Company Name *
                  </label>
                  <div className="relative mt-1">
                    <Building2 className="pointer-events-none absolute top-1/2 left-[14px] size-5 -translate-y-1/2 text-[#a0a0ab]" />
                    <input
                      id="company"
                      name="company"
                      value={job.company}
                      onChange={handleChange}
                      className={`${inputClass} pr-4 pl-10`}
                      required
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="category" className={c.label}>
                    Job Category *
                  </label>
                  <div className="relative mt-1">
                    <select
                      id="category"
                      name="category"
                      value={job.category}
                      onChange={handleChange}
                      className={`${inputClass} appearance-none pr-8 pl-4`}
                      required
                    >
                      <option value="" disabled hidden>
                        Select category
                      </option>
                      {categories.map((cat) => (
                        <option key={cat} value={cat} className="bg-[#1e1e21] text-white">
                          {cat}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="pointer-events-none absolute top-1/2 right-3 h-3 w-3 -translate-y-1/2 text-[#a0a0ab]" />
                  </div>
                </div>
              </div>

              <div>
                <label className={c.label}>Job Type *</label>
                <div className="mt-1 grid grid-cols-2 gap-1 md:grid-cols-4">
                  {jobTypes.map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() =>
                        setJob((prev) =>
                          prev ? { ...prev, jobType: type } : prev
                        )
                      }
                      className={`h-11 rounded-[12px] text-sm leading-[18px] outline-none ${
                        job.jobType === type
                          ? "border border-[#5c53fe] bg-[#232327] font-medium text-white"
                          : "bg-[#1e1e21] text-[#a0a0ab]"
                      }`}
                    >
                      {type}
                    </button>
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
                <div className="flex min-w-0 items-center gap-[10px]">
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-[#232327]">
                    <Globe className="size-5 text-[#c3c0ff]" />
                  </span>
                  <div>
                    <p className="text-sm leading-[18px] font-medium text-white">
                      Remote Work Allowed (isRemote)
                    </p>
                    <p className="mt-[2px] text-[13px] leading-5 text-[#a0a0ab]">
                      Enable worldwide or distributed candidate applications
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    setJob((prev) =>
                      prev ? { ...prev, isRemote: !prev.isRemote } : prev
                    )
                  }
                  className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${
                    job.isRemote ? "bg-[#5c53fe]" : "bg-[#1f1f1f]"
                  }`}
                  aria-label="Toggle remote work"
                  aria-pressed={job.isRemote}
                >
                  <span
                    className={`absolute left-0.5 top-0.5 size-5 rounded-full bg-white transition-transform duration-200 ${
                      job.isRemote ? "translate-x-5" : "translate-x-0"
                    }`}
                  />
                </button>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label htmlFor="location" className={c.label}>
                    Job Location (location)
                  </label>
                  <div className="relative mt-1">
                    <MapPin className="pointer-events-none absolute top-1/2 left-4 h-5 w-4 -translate-y-1/2 text-[#a0a0ab]" />
                    <input
                      id="location"
                      name="location"
                      value={job.location}
                      onChange={handleChange}
                      className={`${inputClass} pr-4 pl-10`}
                      required
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="deadline" className={c.label}>
                    Application Deadline (deadline)
                  </label>
                  <div className="relative mt-1 [color-scheme:dark]">
                    <Calendar className="pointer-events-none absolute top-1/2 left-[15px] h-5 w-[18px] -translate-y-1/2 text-[#a0a0ab]" />
                    <input
                      id="deadline"
                      name="deadline"
                      type="date"
                      value={job.deadline}
                      onChange={handleChange}
                      className={`${inputClass} pr-4 pl-10`}
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                <div>
                  <label htmlFor="minSalary" className={c.label}>
                    Min Salary / Rate
                  </label>
                  <div className="relative mt-1">
                    <DollarSign className="pointer-events-none absolute top-1/2 left-[15px] size-[18px] -translate-y-1/2 text-[#a0a0ab]" />
                    <input
                      id="minSalary"
                      name="minSalary"
                      type="number"
                      min="0"
                      value={job.minSalary}
                      onChange={handleChange}
                      className={`${inputClass} pr-4 pl-9`}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="maxSalary" className={c.label}>
                    Max Salary / Rate
                  </label>
                  <div className="relative mt-1">
                    <DollarSign className="pointer-events-none absolute top-1/2 left-[15px] size-[18px] -translate-y-1/2 text-[#a0a0ab]" />
                    <input
                      id="maxSalary"
                      name="maxSalary"
                      type="number"
                      min="0"
                      value={job.maxSalary}
                      onChange={handleChange}
                      className={`${inputClass} pr-4 pl-9`}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="salaryFrequency" className={c.label}>
                    Frequency
                  </label>
                  <div className="relative mt-1">
                    <select
                      id="salaryFrequency"
                      name="salaryFrequency"
                      value={job.salaryFrequency}
                      onChange={handleChange}
                      className={`${inputClass} appearance-none pr-8 pl-4`}
                      required
                    >
                      <option value="" disabled hidden>
                        Select frequency
                      </option>
                      {salaryFrequencies.map((freq) => (
                        <option key={freq} value={freq} className="bg-[#1e1e21] text-white">
                          {freq}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="pointer-events-none absolute top-1/2 right-3 h-3 w-3 -translate-y-1/2 text-[#a0a0ab]" />
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
                <label htmlFor="responsibilities" className={c.label}>
                  Key Responsibilities *
                </label>
                <textarea
                  id="responsibilities"
                  name="responsibilities"
                  value={job.responsibilities}
                  onChange={handleChange}
                  className={`${inputClass} mt-1 h-[98px] px-4 py-4 leading-[22px]`}
                  required
                />
              </div>

              <div>
                <label htmlFor="qualifications" className={c.label}>
                  Qualifications &amp; Requirements *
                </label>
                <textarea
                  id="qualifications"
                  name="qualifications"
                  value={job.qualifications}
                  onChange={handleChange}
                  className={`${inputClass} mt-1 h-[98px] px-4 py-4 leading-[22px]`}
                  required
                />
              </div>
            </div>
          </section>

          <button
            type="submit"
            className="inline-flex h-11 items-center gap-1 rounded-[12px] bg-[#5c53fe] px-6 text-sm leading-5 font-medium text-white shadow-[0_4px_6px_-4px_rgba(92,83,254,0.25),0_10px_15px_-3px_rgba(92,83,254,0.25)] active:translate-y-px outline-none"
          >
            Save Changes
            <Send className="size-4 text-white" strokeWidth={2} />
          </button>
        </form>
      </div>
    </div>
  )
}

export default EditJobPage
