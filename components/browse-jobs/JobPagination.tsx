"use client"

import { ChevronLeft, ChevronRight } from "lucide-react"

// Pagination from the "Public / Browse Jobs" Figma frame:
// 32x32 r8 buttons, active page = white. Click handlers are intentionally
// empty so the paging logic can be wired later.
export function JobPagination({
  totalPages = 5,
  current = 1,
}: {
  totalPages?: number
  current?: number
}) {
  return (
    <nav aria-label="Pagination" className="flex items-center justify-center gap-1.5">
      <button
        type="button"
        aria-label="Previous page"
        onClick={() => {}}
        className="flex size-8 items-center justify-center rounded-[8px] border border-white/[0.07] text-[#a1a4aa] outline-none hover:bg-white/5"
      >
        <ChevronLeft className="size-4" strokeWidth={2} />
      </button>

      {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
        <button
          key={page}
          type="button"
          aria-current={page === current ? "page" : undefined}
          onClick={() => {}}
          className={`flex size-8 items-center justify-center rounded-[8px] text-sm font-medium outline-none ${
            page === current
              ? "bg-white text-[#2f3131]"
              : "border border-white/[0.07] text-[#ededef] hover:bg-white/5"
          }`}
        >
          {page}
        </button>
      ))}

      <button
        type="button"
        aria-label="Next page"
        onClick={() => {}}
        className="flex size-8 items-center justify-center rounded-[8px] border border-white/[0.07] text-[#a1a4aa] outline-none hover:bg-white/5"
      >
        <ChevronRight className="size-4" strokeWidth={2} />
      </button>
    </nav>
  )
}
