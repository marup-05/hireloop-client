// Loading skeleton for the seeker Saved Jobs page — mirrors the dark board
// layout (top bar, heading, card grid).
export default function Loading() {
  const block = "animate-pulse border border-white/[0.07] bg-[#141418]"

  return (
    <div className="min-h-screen w-full bg-[#0e0e11]">
      <div className="h-14 border-b border-white/[0.07]" />

      <div className="px-4 pt-6 pb-16 sm:px-8">
        <div className={`h-16 max-w-[420px] ${block}`} />

        <div className="mt-6 grid items-start gap-3 md:grid-cols-2">
          {[0, 1, 2, 3, 4, 5].map((index) => (
            <div key={index} className={`h-[180px] ${block}`} />
          ))}
        </div>
      </div>
    </div>
  )
}
