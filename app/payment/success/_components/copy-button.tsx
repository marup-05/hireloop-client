
"use client"

import { useState } from "react"
import { Check, Copy } from "lucide-react"

// Copies the transaction id to the clipboard and flips to a check mark
export function CopyButton({ value }: { value: string }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch {
      setCopied(false)
    }
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      aria-label={copied ? "Copied" : "Copy transaction id"}
      className="flex size-8 shrink-0 items-center justify-center rounded-[8px] border border-white/[0.07] bg-[#222228] outline-none"
    >
      {copied ? (
        <Check className="size-4 text-[#22c55e]" strokeWidth={2} />
      ) : (
        <Copy className="size-4 text-[#c4c7c8]" strokeWidth={2} />
      )}
    </button>
  )
}
