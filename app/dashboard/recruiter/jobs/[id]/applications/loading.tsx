// Loading skeleton for the recruiter Job Applications page — mirrors the
// final layout (breadcrumb, heading, stat tiles, table).
export default function Loading() {
  const block =
    "animate-pulse rounded-[16px] border border-[#232327] bg-[#151516]"
  const bar = "animate-pulse rounded bg-[#1f1f22]"

  return (
    <div className="min-h-screen w-full bg-[#131314]">
      <div className="mx-auto w-full max-w-[1400px] px-4 pt-8 pb-12 sm:px-6 lg:px-8 lg:pt-12">
        <div className={`h-5 w-64 ${bar}`} />

        <div className={`mt-4 h-10 w-72 ${bar}`} />

        <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {[0, 1, 2, 3].map((index) => (
            <div key={index} className={`h-[86px] ${block}`} />
          ))}
        </div>

        <div className={`mt-6 h-[420px] ${block}`} />
      </div>
    </div>
  )
}
