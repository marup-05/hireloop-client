"use client"

import { Search } from "lucide-react"
import { useRouter } from "next/navigation"

export function JobSearchBar() {
  const router = useRouter()

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)
    const data = Object.fromEntries(formData.entries())

    console.log("Form data:", data)

    const searchText = data["search"] as string
    console.log("Search text:", searchText)
    const params = new URLSearchParams()
    params.set("search", searchText)
    console.log("URL params:", params.toString())

    router.push(`/browse-jobs?${params.toString()}`)
  }

  return (
    <form onSubmit={handleSearch} className="flex flex-col gap-6 sm:flex-row">
      <div className="relative min-w-0 flex-1">
        <Search
          className="pointer-events-none absolute top-1/2 left-4 size-[18px] -translate-y-1/2 text-[#8e9192]"
          strokeWidth={2}
        />
        <input
          type="search"
          name="search"
          placeholder="Search by job title, keywords..."
          className="h-[58px] w-full border border-white/[0.07] bg-[#1a1a1f] pr-4 pl-[44px] text-[13px] leading-5 text-[#ededef] outline-none placeholder:text-[#a0a0ab]"
        />
      </div>

      <button
        type="submit"
        className="h-[59px] w-full shrink-0 rounded-[8px] bg-white text-base leading-[27px] font-semibold text-[#2f3131] outline-none active:translate-y-px sm:w-[144px]"
      >
        Search Jobs
      </button>
    </form>
  )
}
