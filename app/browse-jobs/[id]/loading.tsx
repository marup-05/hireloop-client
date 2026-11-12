// Loading skeleton for the job details page — mirrors the dark Figma layout
// (header card, 4-tile info grid, main content card, sidebar card).
export default function Loading() {
  const block = "animate-pulse border border-white/[0.07] bg-[#141418]"

  return (
    <div className="min-h-screen w-full bg-[#08080a]">
      <div className="mx-auto w-full max-w-[1240px] px-4 pt-6 pb-16 sm:px-6 lg:px-8">
        <div className={`h-[155px] ${block}`} />

        <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4">
          {[0, 1, 2, 3].map((index) => (
            <div key={index} className={`h-[121px] ${block}`} />
          ))}
        </div>

        <div className="mt-6 grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_397px]">
          <div className={`h-[560px] ${block}`} />
          <div className={`h-[520px] ${block}`} />
        </div>
      </div>
    </div>
  )
}
