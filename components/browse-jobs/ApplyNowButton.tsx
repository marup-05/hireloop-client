
"use client"

import { applyToJob, getMyApplicationsCount } from "@/lib/api/applications"
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

  const handleApply = async () => {
    if (!user) {
      router.push(`/sign-in?redirectTo=/browse-jobs/${jobId}`)
      return
    } else if (user.role === "seeker") {

      // Check user's total application count
      const countResult = await getMyApplicationsCount(user.id)

      // Show application count in console
      console.log("User ID:", user.id)
      console.log("Application Count:", countResult)

      // Redirect to payment if application count is 6 or more
      if (countResult >= 6) {
        router.push("/payment")
        return
      }

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

      if (result.insertedId) {
        console.log("Application submitted successfully")
        router.push("/browse-jobs")
      }

    } else {
      console.log("user is not a job seeker")
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
