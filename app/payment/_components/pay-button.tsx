
"use client"

import { useState } from "react"
import { Loader2 } from "lucide-react"
import { toast } from "sonner"

// Pay button for the payment page. It will redirect to Stripe Checkout once
// Stripe is connected — until then it tells the user checkout isn't live yet
// instead of doing nothing silently.
export function PayButton({
  amount,
  label,
}: {
  /** Order total in whole dollars — passed to Stripe later */
  amount: number
  label: string
}) {
  const [pending, setPending] = useState(false)

  const handlePay = async () => {
    if (pending) return

    setPending(true)

    try {
      // Stripe Checkout session creation will be wired here — it returns a
      // hosted checkout URL to redirect the user to
      toast.info("Stripe Checkout isn't connected yet.")
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Something went wrong"
      )
    } finally {
      setPending(false)
    }
  }

  return (
    <button
      type="button"
      onClick={handlePay}
      disabled={pending}
      aria-label={`Pay ${amount} dollars`}
      className="flex h-[47px] w-full items-center justify-center gap-2 bg-[#fafafa] text-base leading-6 font-medium text-[#0b0b0c] shadow-[0_1px_2px_0_rgba(0,0,0,0.35)] outline-none active:translate-y-px disabled:cursor-not-allowed disabled:opacity-70"
    >
      {pending && (
        <Loader2 className="size-4 animate-spin text-[#2f3131]" strokeWidth={2} />
      )}
      {label}
    </button>
  )
}
