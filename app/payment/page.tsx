
import { Lock, ShieldCheck } from "lucide-react"
import { SiteNavbar } from "@/components/site-navbar"

const plan = {
  name: "HireLoop Pro",
  cycle: "Monthly",
  price: 29,
  features: [
    "Unlimited job applications",
    "Priority profile visibility",
    "Application status tracking",
  ],
}

const fmtPrice = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
})

const SummaryRow = ({
  label,
  value,
  strong,
}: {
  label: string
  value: string
  strong?: boolean
}) => (
  <div className="flex items-center justify-between gap-4">
    <span className="text-[13px] leading-5 text-[#a0a0ab]">
      {label}
    </span>

    <span
      className={
        strong
          ? "text-base leading-6 font-semibold text-[#ededef]"
          : "truncate text-[13px] leading-5 font-medium text-[#ededef]"
      }
    >
      {value}
    </span>
  </div>
)

const PaymentPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ canceled?: string }>
}) => {
  const { canceled } = await searchParams

  if (canceled) {
    console.log(
      "Order canceled -- continue to shop around and check out when you're ready."
    )
  }

  return (
    <div className="min-h-screen w-full bg-[#08080a]">
      <SiteNavbar />

      <main>
        <div className="mx-auto w-full max-w-[520px] px-4 pt-10 pb-16 sm:px-6 lg:px-8">

          {/* Heading */}
          <div className="text-center">
            <h1 className="text-[32px] leading-[40px] font-semibold tracking-[-0.8px] text-[#ededef]">
              Complete your payment
            </h1>

            <p className="mt-3 text-[13px] leading-5 text-[#a0a0ab]">
              Review your plan details below, then continue to our secure
              checkout.
            </p>
          </div>

          {/* Payment Summary Card */}
          <section className="mt-8 border border-white/[0.07] bg-[#141418] p-[25px] shadow-[0_1px_2px_0_rgba(0,0,0,0.35),inset_0_1px_0_0_rgba(255,255,255,0.04)]">

            <h2 className="text-[22px] leading-[28px] font-semibold tracking-[-0.4px] text-[#ededef]">
              Payment Summary
            </h2>

            {/* Plan */}
            <div className="mt-6 flex items-start justify-between gap-4">
              <div className="min-w-0">
                <p className="truncate text-base leading-6 font-semibold text-[#ededef]">
                  {plan.name}
                </p>

                <p className="mt-1 text-[13px] leading-5 text-[#a0a0ab]">
                  Billed {plan.cycle.toLowerCase()}
                </p>
              </div>

              <span className="shrink-0 text-base leading-6 font-semibold text-[#ededef]">
                {fmtPrice.format(plan.price)}
              </span>
            </div>

            {/* What's Included */}
            <ul className="mt-5 space-y-2.5 border border-white/[0.07] bg-[#1a1a1f] p-4">
              {plan.features.map((feature) => (
                <li
                  key={feature}
                  className="flex items-center gap-2.5 text-[13px] leading-5 text-[#c4c7c8]"
                >
                  <ShieldCheck
                    className="size-4 shrink-0 text-[#22c55e]"
                    strokeWidth={2}
                  />
                  {feature}
                </li>
              ))}
            </ul>

            {/* Totals */}
            <div className="mt-6 space-y-3 border-t border-white/[0.07] pt-6">
              <SummaryRow
                label={`Subscription (${plan.cycle})`}
                value={fmtPrice.format(plan.price)}
              />

              <SummaryRow
                label="Taxes & fees"
                value="$0.00"
              />

              <div className="flex items-center justify-between gap-4">
                <span className="text-base leading-6 font-semibold text-[#ededef]">
                  Total due today
                </span>

                <span className="text-[22px] leading-[28px] font-semibold tracking-[-0.4px] text-[#ededef]">
                  {fmtPrice.format(plan.price)}
                </span>
              </div>
            </div>

            {/* Stripe Checkout Form */}
            <div className="mt-6">
              <form action="/api/checkout_sessions" method="POST">
                <section>
                  <button
                    type="submit"
                    role="link"
                    className="w-full bg-[#5c53fe] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#4c43e8]"
                  >
                    Checkout ${plan.price}
                  </button>
                </section>
              </form>
            </div>

            {/* Secure Checkout Note */}
            <p className="mt-4 flex items-center justify-center gap-2 text-[12px] leading-4 text-[#6e6e78]">
              <Lock
                className="size-3.5 shrink-0"
                strokeWidth={2}
              />
              You&apos;ll be redirected to Stripe&apos;s secure checkout to
              complete your payment.
            </p>

          </section>
        </div>
      </main>
    </div>
  )
}

export default PaymentPage
