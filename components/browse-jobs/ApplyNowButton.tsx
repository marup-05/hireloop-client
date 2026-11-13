"use client"

import { applyToJob } from "@/lib/api/applications"
import { useSession } from "@/lib/auth-client"
import { useRouter } from "next/navigation"

type ApplyNowButtonProps = {
  jobId: string
  jobTitle: string
  companyName: string
  jobType: string
  isRemote: boolean
}

export function ApplyNowButton({
  jobId,
  jobTitle,
  companyName,
  jobType,
  isRemote,
}: ApplyNowButtonProps) {
  const { data: session } = useSession()
  const router = useRouter()
  const user = session?.user

  const handleApply = async() => {
    if (!user) {
      router.push(`/sign-in?redirectTo=/browse-jobs/${jobId}`)
      return
    } else if (user.role === "seeker") {
      const application = {
        jobId,
        userId: user.id,
        email: user.email,
        jobTitle,
        companyName,
        jobType,
        workplace: isRemote ? "Remote" : "On-site",
        appliedAt: new Date().toISOString(),
        status: "Applied" as const,
      }
      const result = await applyToJob(application)
      if(result.insertedId) {
        console.log('Application submitted successfully');
        router.push('/browse-jobs')
      }
    }
    else{
        console.log('user is not a job seeker');
    }
  }

  return (
    <button
      type="button"
      onClick={handleApply}
      className="h-[47px] w-[115px] bg-[#fafafa] text-base leading-6 font-medium text-[#0b0b0c] shadow-[0_1px_2px_0_rgba(0,0,0,0.35)] outline-none active:translate-y-px"
    >
      Apply Now
    </button>
  )
}
