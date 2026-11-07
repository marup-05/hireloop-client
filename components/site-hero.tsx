
import Image from "next/image"
import {
  BriefcaseBusiness,
  ChartNoAxesColumn,
  Search,
  Star,
  UsersRound,
} from "lucide-react"

const trendingPositions = [
  "Product Designer",
  "AI Engineering",
  "DevOps Engineer",
]

const stats = [
  { value: "50K", label: "Active Jobs", icon: BriefcaseBusiness },
  { value: "12K", label: "Companies", icon: ChartNoAxesColumn },
  { value: "2M", label: "Job Seekers", icon: UsersRound },
  { value: "97%", label: "Satisfaction Rate", icon: Star },
]

export function SiteHero() {
  return (
    <section className="relative isolate min-h-[1050px] overflow-hidden bg-[#050505] text-white">

      {/* Full Hero Background Image */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-0 flex justify-center">
        <Image
          src="/images/globe.png"
          alt=""
          width={1440}
          height={1882}
          priority
          sizes="100vw"
          className="h-auto w-full max-w-[1440px] select-none object-contain"
        />
      </div>

      {/* Background Overlay */}
      <div className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-b from-[#050505]/10 via-transparent to-[#050505]/70" />

      {/* Purple Glow */}
      <div className="pointer-events-none absolute left-1/2 top-[350px] z-[1] h-[450px] w-[850px] -translate-x-1/2 rounded-full bg-[#4235ff]/15 blur-[140px]" />

      {/* Hero Content */}
      <div className="relative z-10 mx-auto flex w-full max-w-[1100px] flex-col items-center px-4 pt-16 text-center sm:px-6 sm:pt-[70px]">

        {/* Badge */}
        <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/30 px-4 py-1.5 text-[10px] tracking-[1.5px] text-white/70 backdrop-blur-md">
          <BriefcaseBusiness className="size-3.5 text-orange-400" />
          <span className="font-semibold text-white">50,000+</span>
          <span>NEW JOBS THIS MONTH</span>
        </div>

        {/* Heading */}
        <h1 className="mt-6 text-3xl font-semibold tracking-tight text-white sm:text-4xl md:text-[46px]">
          Find Your Dream Job Today
        </h1>

        {/* Description */}
        <p className="mt-3 max-w-[530px] text-xs leading-6 text-white/60 sm:text-sm">
          HireLoop connects top talent with world-class companies.
          Browse thousands of curated opportunities and land your
          next role — faster.
        </p>

        {/* Search Form */}
        <form
          action="/jobs"
          className="mt-6 flex h-[54px] w-full max-w-[570px] items-center rounded-xl border border-white/10 bg-[#111111]/80 p-1.5 shadow-[0_10px_40px_rgba(0,0,0,0.4)] backdrop-blur-xl"
        >
          <div className="flex min-w-0 flex-1 items-center gap-2 px-2 sm:px-3">
            <Search className="size-4 shrink-0 text-white/60" />
            <input
              type="search"
              name="query"
              placeholder="Job title, skill or company"
              aria-label="Job title, skill or company"
              className="h-full w-full min-w-0 bg-transparent text-xs text-white outline-none placeholder:text-white/40 sm:text-sm"
            />
          </div>

          <div className="h-7 w-px bg-white/10" />

          <div className="hidden min-w-0 flex-1 items-center gap-2 px-3 sm:flex">
            <span className="text-white/60">◎</span>
            <input
              type="search"
              name="location"
              placeholder="Location or Remote"
              aria-label="Location or Remote"
              className="h-full w-full min-w-0 bg-transparent text-xs text-white outline-none placeholder:text-white/40 sm:text-sm"
            />
          </div>

          <button
            type="submit"
            aria-label="Search jobs"
            className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-[#624BFF] text-white transition-all hover:bg-[#7865ff] hover:shadow-[0_0_20px_rgba(98,75,255,0.5)]"
          >
            <Search className="size-4" />
          </button>
        </form>

        {/* Trending Positions */}
        <div className="mt-3 flex flex-wrap items-center justify-center gap-2 text-[10px] text-white/50">
          <span>Trending Position</span>

          {trendingPositions.map((position) => (
            <a
              key={position}
              href={`/jobs?query=${encodeURIComponent(position)}`}
              className="rounded-full border border-white/10 bg-black/30 px-3 py-1.5 text-white/75 backdrop-blur-md transition-colors hover:border-[#624BFF]/50 hover:bg-[#624BFF]/20 hover:text-white"
            >
              {position}
            </a>
          ))}
        </div>

        {/* Globe Text */}
        <div className="mt-[190px] max-w-[400px] px-4 text-center sm:mt-[210px]">
          <p className="text-lg font-medium leading-7 text-white/80 sm:text-xl">
            Assisting over{" "}
            <span className="font-semibold text-white">15,000</span> job seekers
            <br className="hidden sm:block" />
            find their dream positions.
          </p>
        </div>

        {/* Statistics Cards */}
        <div className="mt-20 grid w-full max-w-[590px] grid-cols-2 gap-2.5 sm:mt-24 sm:grid-cols-4 sm:gap-3">

          {stats.map((stat) => {
            const Icon = stat.icon

            return (
              <div
                key={stat.label}
                className="flex min-h-[112px] flex-col justify-between rounded-xl border border-white/[0.08] bg-[#090909]/90 p-3 shadow-[0_10px_35px_rgba(0,0,0,0.4)] backdrop-blur-xl transition-transform duration-300 hover:-translate-y-1 sm:min-h-[114px] sm:p-3.5"
              >
                <Icon className="size-3.5 text-white/80" />

                <div>
                  <h3 className="text-[25px] font-semibold tracking-tight text-white sm:text-[27px]">
                    {stat.value}
                  </h3>
                  <p className="mt-0.5 whitespace-nowrap text-[9px] text-white/65">
                    {stat.label}
                  </p>
                </div>
              </div>
            )
          })}

        </div>
      </div>
    </section>
  )
}
