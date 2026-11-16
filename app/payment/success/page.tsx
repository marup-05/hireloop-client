
import Link from "next/link"
import { redirect } from "next/navigation"
import {
  CheckCircle2,
  CreditCard,
  ReceiptText,
  XCircle,
} from "lucide-react"
import { SiteNavbar } from "@/components/site-navbar"
import { getSession } from "@/lib/core/server"
import { checkoutVerify } from "@/lib/actions/payments"
import { stripe } from "@/lib/stripe"
import { CopyButton } from "./_components/copy-button"

const cardClass =
  "border border-white/[0.07] bg-[#141418] shadow-[0_1px_2px_0_rgba(0,0,0,0.35),inset_0_1px_0_0_rgba(255,255,255,0.04)]"

// 2990 → "$29.90" (Stripe amounts are in the currency's smallest unit)
const fmtAmount = (amount: number | null, currency: string | null) => {
  if (amount === null || amount === undefined) return "—"

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: (currency ?? "usd").toUpperCase(),
  }).format(amount / 100)
}

const fmtDate = (unixSeconds: number) =>
  new Date(unixSeconds * 1000).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  })

// Receipt row (label left, value right)
const ReceiptRow = ({ label, value }: { label: string; value: string }) => (
  <div className="flex items-center justify-between gap-4">
    <span className="shrink-0 text-[13px] leading-5 text-[#a0a0ab]">
      {label}
    </span>

    <span className="truncate text-[13px] leading-5 font-medium text-[#ededef]">
      {value}
    </span>
  </div>
)

// Full-screen state card (shared by success / failure / error)
const StateCard = ({ children }: { children: React.ReactNode }) => (
  <div className="mx-auto w-full max-w-[560px] px-4 pt-10 pb-16 sm:px-6 lg:px-8">
    <section className={`p-[25px] sm:p-[33px] ${cardClass}`}>{children}</section>
  </div>
)

// "Paid" pill — same style as the status pills across the app
const PaidPill = () => (
  <span className="inline-flex h-[22px] items-center border border-[#22c55e]/30 bg-[#22c55e]/15 px-[11px] text-[12px] leading-4 font-medium text-[#22c55e]">
    Paid
  </span>
)

export default async function CheckoutSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string }>
}) {
  const { session_id } = await searchParams

  // No checkout session in the URL — nothing to verify, go back to payment
  if (!session_id) {
    return redirect("/payment")
  }

  let session: Awaited<
    ReturnType<typeof stripe.checkout.sessions.retrieve>
  > | null = null
  let failed = false

  try {
    session = await stripe.checkout.sessions.retrieve(session_id, {
      expand: ["line_items", "payment_intent"],
    })
  } catch {
    // Invalid / unknown session id (e.g. a stale or hand-edited URL)
    failed = true
  }

  if (failed || !session) {
    return (
      <div className="min-h-screen w-full bg-[#08080a]">
        <SiteNavbar />
        <main>
          <StateCard>
            <span className="mx-auto flex size-14 items-center justify-center rounded-full border border-[#f59e0b]/30 bg-[#f59e0b]/15">
              <ReceiptText className="size-7 text-[#f59e0b]" strokeWidth={2} />
            </span>

            <h1 className="mt-5 text-center text-[22px] leading-[28px] font-semibold tracking-[-0.4px] text-[#ededef]">
              We couldn&apos;t verify this payment
            </h1>

            <p className="mt-3 text-center text-[13px] leading-5 text-[#a0a0ab]">
              This checkout session is no longer valid. If you were charged,
              please start the payment again or contact support with your
              receipt.
            </p>

            <div className="mt-6 flex items-center justify-center gap-3">
              <Link
                href="/payment"
                className="inline-flex h-10 items-center bg-white px-5 text-sm font-semibold text-[#2f3131] shadow-[0_1px_2px_0_rgba(0,0,0,0.35)] outline-none active:translate-y-px"
              >
                Back to payment
              </Link>

              <Link
                href="/browse-jobs"
                className="inline-flex h-10 items-center border border-white/[0.07] bg-[#1a1a1f] px-5 text-sm font-medium text-[#ededef] outline-none active:translate-y-px"
              >
                Browse Jobs
              </Link>
            </div>
          </StateCard>
        </main>
      </div>
    )
  }

  // Checkout still in progress — send the user back to the site
  if (session.status === "open") {
    return redirect("/")
  }

  // Checkout finished but the payment didn't go through
  if (session.status !== "complete" || session.payment_status !== "paid") {
    return (
      <div className="min-h-screen w-full bg-[#08080a]">
        <SiteNavbar />
        <main>
          <StateCard>
            <span className="mx-auto flex size-14 items-center justify-center rounded-full border border-[#f59e0b]/30 bg-[#f59e0b]/15">
              <XCircle className="size-7 text-[#f59e0b]" strokeWidth={2} />
            </span>

            <h1 className="mt-5 text-center text-[22px] leading-[28px] font-semibold tracking-[-0.4px] text-[#ededef]">
              Payment not completed
            </h1>

            <p className="mt-3 text-center text-[13px] leading-5 text-[#a0a0ab]">
              Your checkout session ended before the payment went through. No
              charge was made — you can try again whenever you&apos;re ready.
            </p>

            <div className="mt-6 flex justify-center">
              <Link
                href="/payment"
                className="inline-flex h-10 items-center bg-white px-5 text-sm font-semibold text-[#2f3131] shadow-[0_1px_2px_0_rgba(0,0,0,0.35)] outline-none active:translate-y-px"
              >
                Try again
              </Link>
            </div>
          </StateCard>
        </main>
      </div>
    )
  }

  // Payment confirmed — let the backend record/verify the transaction
  await checkoutVerify(session_id)

  // Expanded Stripe objects
  const paymentIntent =
    typeof session.payment_intent === "object" && session.payment_intent !== null
      ? session.payment_intent
      : null

  const transactionId = paymentIntent?.id ?? null
  const planName =
    session.line_items?.data?.[0]?.description ?? "HireLoop Pro"

  // Role-aware CTA destination
  const userSession = await getSession()
  const dashboardHref = userSession?.user?.role
    ? `/dashboard/${userSession.user.role}`
    : "/browse-jobs"

  return (
    <div className="min-h-screen w-full bg-[#08080a]">
      <SiteNavbar />

      <main>
        <StateCard>
          {/* Success icon + heading */}
          <div className="text-center">
            <span className="mx-auto flex size-14 items-center justify-center rounded-full border border-[#22c55e]/30 bg-[#22c55e]/15">
              <CheckCircle2 className="size-7 text-[#22c55e]" strokeWidth={2} />
            </span>

            <h1 className="mt-5 text-[32px] leading-[40px] font-semibold tracking-[-0.8px] text-[#ededef]">
              Payment successful
            </h1>

            <p className="mt-3 text-[13px] leading-5 text-[#a0a0ab]">
              Thank you for your purchase! A confirmation email will be sent
              {session.customer_email ? ` to ${session.customer_email}` : ""}.
            </p>
          </div>

          {/* Receipt */}
          <div className="mt-8">
            <h2 className="text-[22px] leading-[28px] font-semibold tracking-[-0.4px] text-[#ededef]">
              Receipt
            </h2>

            <div className="mt-6 space-y-4">
              <ReceiptRow label="Plan" value={planName} />
              <ReceiptRow
                label="Amount paid"
                value={fmtAmount(session.amount_total, session.currency)}
              />
              <ReceiptRow
                label="Payment method"
                value={
                  session.payment_method_types?.[0]
                    ? session.payment_method_types[0].charAt(0).toUpperCase() +
                      session.payment_method_types[0].slice(1)
                    : "—"
                }
              />
              <ReceiptRow
                label="Payment date"
                value={fmtDate(session.created)}
              />
              <ReceiptRow
                label="Billing email"
                value={session.customer_email ?? "—"}
              />

              {/* Status */}
              <div className="flex items-center justify-between gap-4">
                <span className="shrink-0 text-[13px] leading-5 text-[#a0a0ab]">
                  Payment status
                </span>

                <PaidPill />
              </div>
            </div>

            {/* Transaction ID — the Stripe payment_intent id */}
            {transactionId && (
              <div className="mt-6 border border-white/[0.07] bg-[#1a1a1f] p-4">
                <div className="flex items-center gap-2">
                  <CreditCard
                    className="size-4 shrink-0 text-[#6e6e78]"
                    strokeWidth={2}
                  />
                  <span className="text-[13px] leading-5 text-[#a0a0ab]">
                    Transaction ID
                  </span>
                </div>

                <div className="mt-2 flex items-center justify-between gap-3">
                  <code className="truncate font-mono text-[13px] leading-5 text-[#ededef]">
                    {transactionId}
                  </code>

                  <CopyButton value={transactionId} />
                </div>
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href={dashboardHref}
              className="inline-flex h-[47px] flex-1 items-center justify-center bg-white text-base leading-6 font-medium text-[#0b0b0c] shadow-[0_1px_2px_0_rgba(0,0,0,0.35)] outline-none active:translate-y-px"
            >
              Go to Dashboard
            </Link>

            <Link
              href="/browse-jobs"
              className="inline-flex h-[47px] flex-1 items-center justify-center border border-white/[0.07] bg-[#1a1a1f] text-base leading-6 font-medium text-[#ededef] outline-none active:translate-y-px"
            >
              Browse Jobs
            </Link>
          </div>
        </StateCard>
      </main>
    </div>
  )
}
