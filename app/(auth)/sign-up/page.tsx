
"use client"

import { useState, type FormEvent } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  Eye,
  EyeOff,
  BriefcaseBusiness,
  Loader2,
  UserRound,
  Building2,
  ShieldCheck,
} from "lucide-react"

import { authClient } from "@/lib/auth-client"

type UserRole = "seeker" | "recruiter" | "admin"

const roles = [
  {
    value: "seeker",
    label: "Job Seeker",
    description: "Find jobs",
    icon: UserRound,
  },
  {
    value: "recruiter",
    label: "Recruiter",
    description: "Hire talent",
    icon: Building2,
  },
  {
    value: "admin",
    label: "Admin",
    description: "Manage platform",
    icon: ShieldCheck,
  },
] as const

const SignUpPage = () => {
  const router = useRouter()

  const [selectedRole, setSelectedRole] = useState<UserRole>("seeker")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    setError("")

    const formData = new FormData(event.currentTarget)

    const name = formData.get("name") as string
    const email = formData.get("email") as string
    const password = formData.get("password") as string
    const confirmPassword = formData.get("confirmPassword") as string

    if (password !== confirmPassword) {
      setError("Passwords do not match.")
      return
    }

    try {
      setIsLoading(true)

      const { data, error } = await authClient.signUp.email({
        name,
        email,
        password,
        role: selectedRole,
        callbackURL: "/",
      })

      if (error) {
        setError(error.message || "Something went wrong. Please try again.")
        return
      }

      if (data) {
        router.push("/")
        router.refresh()
      }
    } catch (err) {
      console.error("Sign Up Error:", err)
      setError("Something went wrong. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#050505] px-4 py-12 text-white">

      {/* Background Glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#624BFF]/15 blur-[140px]" />

      <div className="relative z-10 w-full max-w-[440px]">

        {/* Logo */}
        <Link href="/" className="mb-8 flex items-center justify-center gap-2">
          <BriefcaseBusiness className="size-7 text-[#7865ff]" />
          <span className="text-2xl font-bold tracking-tight">
            Hire<span className="text-[#7865ff]">Loop</span>
          </span>
        </Link>

        {/* Form Card */}
        <div className="rounded-2xl border border-white/10 bg-[#0d0d0d]/90 p-6 shadow-2xl backdrop-blur-xl sm:p-9">

          {/* Heading */}
          <div className="mb-6 text-center">
            <h1 className="text-2xl font-semibold">
              Create an Account
            </h1>

            <p className="mt-2 text-sm text-white/50">
              Join HireLoop and discover your next opportunity.
            </p>
          </div>

          {/* Role Selection */}
          <div className="mb-7">
            <p className="mb-3 text-sm font-medium text-white/80">
              Choose your account type
            </p>

            <div className="grid grid-cols-3 gap-2">
              {roles.map((role) => {
                const Icon = role.icon
                const isSelected = selectedRole === role.value

                return (
                  <button
                    key={role.value}
                    type="button"
                    onClick={() => {
                      setSelectedRole(role.value)
                      setError("")
                    }}
                    aria-pressed={isSelected}
                    className={`flex min-w-0 flex-col items-center justify-center gap-2 rounded-xl border px-2 py-4 text-center transition-all ${
                      isSelected
                        ? "border-[#624BFF] bg-[#624BFF]/15 text-white shadow-[0_0_15px_rgba(98,75,255,0.12)]"
                        : "border-white/10 bg-white/[0.03] text-white/50 hover:border-white/30 hover:bg-white/[0.06] hover:text-white"
                    }`}
                  >
                    <Icon
                      className={`size-5 ${
                        isSelected ? "text-[#897aff]" : ""
                      }`}
                    />

                    <span className="text-xs font-semibold sm:text-sm">
                      {role.label}
                    </span>

                    <span className="text-[10px] text-white/40 sm:text-xs">
                      {role.description}
                    </span>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Signup Form */}
          <form onSubmit={handleSubmit} className="space-y-5">

            {/* Full Name */}
            <div className="space-y-2">
              <label
                htmlFor="name"
                className="text-sm font-medium text-white/80"
              >
                Full Name
              </label>

              <input
                id="name"
                name="name"
                type="text"
                placeholder="Enter your full name"
                autoComplete="name"
                required
                className="h-12 w-full rounded-lg border border-white/10 bg-white/[0.04] px-4 text-sm outline-none transition-colors placeholder:text-white/30 focus:border-[#624BFF]"
              />
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="text-sm font-medium text-white/80"
              >
                Email Address
              </label>

              <input
                id="email"
                name="email"
                type="email"
                placeholder="you@example.com"
                autoComplete="email"
                required
                className="h-12 w-full rounded-lg border border-white/10 bg-white/[0.04] px-4 text-sm outline-none transition-colors placeholder:text-white/30 focus:border-[#624BFF]"
              />
            </div>

            {/* Password */}
            <div className="space-y-2">
              <label
                htmlFor="password"
                className="text-sm font-medium text-white/80"
              >
                Password
              </label>

              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a password"
                  autoComplete="new-password"
                  minLength={8}
                  required
                  className="h-12 w-full rounded-lg border border-white/10 bg-white/[0.04] px-4 pr-12 text-sm outline-none transition-colors placeholder:text-white/30 focus:border-[#624BFF]"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white"
                >
                  {showPassword ? (
                    <EyeOff className="size-4" />
                  ) : (
                    <Eye className="size-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div className="space-y-2">
              <label
                htmlFor="confirmPassword"
                className="text-sm font-medium text-white/80"
              >
                Confirm Password
              </label>

              <div className="relative">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm your password"
                  autoComplete="new-password"
                  minLength={8}
                  required
                  className="h-12 w-full rounded-lg border border-white/10 bg-white/[0.04] px-4 pr-12 text-sm outline-none transition-colors placeholder:text-white/30 focus:border-[#624BFF]"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowConfirmPassword(!showConfirmPassword)
                  }
                  aria-label={
                    showConfirmPassword ? "Hide password" : "Show password"
                  }
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="size-4" />
                  ) : (
                    <Eye className="size-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <p className="rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
                {error}
              </p>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading}
              className="flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-[#624BFF] text-sm font-semibold text-white transition-all hover:bg-[#7865ff] hover:shadow-[0_0_20px_rgba(98,75,255,0.3)] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isLoading ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  Creating Account...
                </>
              ) : (
                "Create Account"
              )}
            </button>
          </form>

          {/* Sign In Toggle */}
          <p className="mt-7 text-center text-sm text-white/50">
            Already have an account?{" "}
            <Link
              href="/sign-in"
              className="font-semibold text-[#897aff] transition-colors hover:text-white"
            >
              Sign In
            </Link>
          </p>
        </div>

        {/* Copyright */}
        <p className="mt-6 text-center text-xs text-white/30">
          © 2026 HireLoop. All rights reserved.
        </p>
      </div>
    </main>
  )
}

export default SignUpPage
