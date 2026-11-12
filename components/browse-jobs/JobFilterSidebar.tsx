
"use client"

import { Check } from "lucide-react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"

export type FilterOption = {
  label: string
  value: string
  count: number
}

export type FilterGroup = {
  title: string
  options: FilterOption[]
}

const fmtCount = (count: number) =>
  count >= 1000
    ? `${(count / 1000).toFixed(1).replace(/\.0$/, "")}k`
    : String(count)

export function JobFilterSidebar({
  groups,
  onSave,
}: {
  groups: FilterGroup[]
  onSave?: () => void
}) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const handleRadioChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = event.target

    const params = new URLSearchParams(searchParams.toString())

    params.set(name, value)

    console.log("Selected filters:", Object.fromEntries(params.entries()))

    router.push(`${pathname}?${params.toString()}`)
  }

  return (
    <aside className="border border-white/[0.07] bg-[#141418] p-[25px] shadow-[0_1px_2px_0_rgba(0,0,0,0.35),inset_0_1px_0_0_rgba(255,255,255,0.04)]">
      <h3 className="text-[22px] leading-[28px] font-semibold tracking-[-0.4px] text-[#ededef]">
        Filters
      </h3>

      {groups.map((group) => {
        const inputName =
          group.title === "Job Type"
            ? "jobType"
            : group.title === "Job Category"
              ? "category"
              : group.title

        return (
          <section key={group.title} className="mt-6">
            <h4 className="text-base leading-[27px] font-semibold text-[#ededef]">
              {group.title}
            </h4>

            <div className="mt-6 space-y-1">
              {group.options.map((option) => {
                const checked =
                  searchParams.get(inputName) === option.value

                return (
                  <label
                    key={option.value}
                    className="flex h-7 w-full cursor-pointer items-center gap-3"
                  >
                    <input
                      type="radio"
                      name={inputName}
                      value={option.value}
                      checked={checked}
                      onChange={handleRadioChange}
                      className="sr-only"
                    />

                    <span
                      className={`flex size-5 shrink-0 items-center justify-center rounded-[4px] border border-white/[0.07] ${
                        checked ? "bg-white" : "bg-[#1a1a1f]"
                      }`}
                    >
                      {checked && (
                        <Check
                          className="size-3.5 text-[#141418]"
                          strokeWidth={3}
                        />
                      )}
                    </span>

                    <span className="min-w-0 flex-1 truncate text-[13px] leading-5 font-medium text-[#a0a0ab]">
                      {option.label}
                    </span>

                    <span className="shrink-0 text-xs leading-5 text-[#6e6e78]">
                      {fmtCount(option.count)}
                    </span>
                  </label>
                )
              })}
            </div>
          </section>
        )
      })}

      <button
        type="button"
        onClick={onSave}
        className="mt-6 h-10 w-full rounded-[8px] bg-white text-base font-semibold text-[#2f3131] outline-none active:translate-y-px"
      >
        Save
      </button>
    </aside>
  )
}
