
"use client"

import { applyToJob, getMyApplicationsCount } from "@/lib/api/applications"
import { getUserPremiumById } from "@/lib/api/user"
import { useSession } from "@/lib/auth-client"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

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
    }

    if (user.role === "seeker") {

      // Check if user is premium
      const premiumResult = await getUserPremiumById(user.id)

      console.log("Premium Status:", premiumResult)

      // Get user's total application count
      const countResult = await getMyApplicationsCount(user.id)

      console.log("User ID:", user.id)
      console.log("Application Count:", countResult)

      // Free users can apply for maximum 2 jobs
      if (!premiumResult.premium && countResult >= 2) {
        toast.error("You have reached your free application limit. Please upgrade to Premium.")
        router.push("/payment")
        return
      }

      // Application data
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

      // Submit application
      const result = await applyToJob(application)

      if (result.insertedId) {
        console.log("Application submitted successfully")
        toast.success("Application submitted successfully!")
        router.push("/browse-jobs")
      }

    } else {
      console.log("User is not a job seeker")
      toast.error("Only job seekers can apply for jobs")
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
