
"use client";

import { useState } from "react";
import {
  Crown,
  ChartNoAxesColumnIncreasing,
  Zap,
  Plus,
  ArrowRight,
} from "lucide-react";

const plans = [
  {
    name: "Starter",
    icon: Crown,
    monthly: 0,
    yearly: 0,
    features: [
      "Daily AI match brief (top 5)",
      "Verified salary bands",
      "Company insight dashboards",
      "1-click apply, unlimited",
    ],
  },
  {
    name: "Growth",
    icon: ChartNoAxesColumnIncreasing,
    monthly: 17,
    yearly: 12.75,
    features: [
      "Daily AI match brief (top 5)",
      "Verified salary bands",
      "Company insight dashboards",
      "1-click apply, unlimited",
    ],
    popular: true,
  },
  {
    name: "Premium",
    icon: Zap,
    monthly: 99,
    yearly: 74.25,
    features: [
      "Everything in Pro",
      "Multi-profile career portfolios",
      "Shared talent rooms",
      "Recruiter view (read-only)",
    ],
  },
];

export default function Pricing() {
  const [billing, setBilling] = useState<"monthly" | "yearly">("monthly");

  return (
    <section className="bg-black px-5 py-20 text-white sm:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 text-center">
          <div className="mb-3 flex items-center justify-center gap-2 text-[10px] uppercase tracking-widest text-gray-400">
            <span className="h-1 w-1 bg-violet-500" />
            Pricing
            <span className="h-1 w-1 bg-violet-500" />
          </div>

          <h2 className="text-3xl font-medium leading-tight tracking-tight sm:text-4xl">
            Pay for the leverage,
            <br />
            not the listings
          </h2>
        </div>

        {/* Billing Toggle */}
        <div className="mb-10 flex justify-center">
          <div className="flex items-center gap-1 rounded-full border border-[#303030] bg-[#202020] p-1">
            <button
              onClick={() => setBilling("monthly")}
              className={`rounded-full px-3 py-1.5 text-[10px] transition ${
                billing === "monthly"
                  ? "bg-white text-black"
                  : "text-gray-300 hover:text-white"
              }`}
            >
              Monthly
            </button>

            <button
              onClick={() => setBilling("yearly")}
              className={`rounded-full px-3 py-1.5 text-[10px] transition ${
                billing === "yearly"
                  ? "bg-white text-black"
                  : "text-gray-300 hover:text-white"
              }`}
            >
              Yearly
            </button>

            <span className="rounded-full bg-fuchsia-600 px-2 py-1 text-[9px] font-semibold text-white">
              25%
            </span>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 items-stretch gap-4 md:grid-cols-3">
          {plans.map((plan) => {
            const Icon = plan.icon;
            const price =
              billing === "monthly" ? plan.monthly : plan.yearly;

            return (
              <div
                key={plan.name}
                className={`flex min-h-[230px] flex-col rounded-xl border p-3 transition-all duration-300 ${
                  plan.popular
                    ? "border-[#3b3b3b] bg-[#171717] shadow-[0_0_25px_rgba(255,255,255,0.08)]"
                    : "border-[#252525] bg-black"
                }`}
              >
                <div className="mb-4 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="flex h-7 w-7 items-center justify-center rounded-md border border-[#292929] bg-[#111]">
                      <Icon size={14} className="text-fuchsia-300" />
                    </div>

                    <h3 className="text-sm text-gray-200">
                      {plan.name}
                    </h3>
                  </div>

                  <div className="flex items-baseline gap-0.5">
                    <span className="text-2xl font-semibold tracking-tight">
                      ${price}
                    </span>
                    <span className="text-[8px] text-gray-400">
                      /month
                    </span>
                  </div>
                </div>

                <p className="mb-3 text-[10px] text-white">
                  Start building your insights hub:
                </p>

                <div className="flex flex-col gap-2">
                  {plan.features.map((feature) => (
                    <div
                      key={feature}
                      className="flex items-center gap-2"
                    >
                      <span className="flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-[3px] bg-[#292929]">
                        <Plus size={11} className="text-gray-300" />
                      </span>

                      <span className="text-[10px] text-gray-400">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>

                <button
                  className={`mt-auto flex w-full items-center justify-between rounded-md px-3 py-2.5 text-[10px] font-medium transition ${
                    plan.popular
                      ? "mt-8 bg-white text-black hover:bg-gray-200"
                      : "mt-8 bg-[#292929] text-white hover:bg-[#383838]"
                  }`}
                >
                  Choose This Plan
                  <ArrowRight size={12} />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
