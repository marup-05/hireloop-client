import Link from "next/link"

// Rendered when notFound() fires inside /browse-jobs/[id] — an invalid
// MongoDB id or a job that no longer exists. Dark-styled to match the site.
export default function JobNotFound() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-[#08080a] px-4">
      <div className="w-full max-w-[520px] border border-white/[0.07] bg-[#141418] p-[33px] text-center shadow-[0_1px_2px_0_rgba(0,0,0,0.35),inset_0_1px_0_0_rgba(255,255,255,0.04)]">
        <h1 className="text-[22px] leading-[28px] font-semibold tracking-[-0.4px] text-[#ededef]">
          Job not found
        </h1>
        <p className="mt-3 text-[13px] leading-5 text-[#a0a0ab]">
          This job doesn&apos;t exist or is no longer available.
        </p>
        <Link
          href="/browse-jobs"
          className="mt-6 inline-flex h-10 items-center rounded-[8px] bg-white px-5 text-sm font-semibold text-[#2f3131] outline-none active:translate-y-px"
        >
          Back to Browse Jobs
        </Link>
      </div>
    </div>
  )
}
