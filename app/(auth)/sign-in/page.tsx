"use client"

import { useState, type FormEvent } from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import {
  Eye,
  EyeOff,
  BriefcaseBusiness,
  Loader2,
} from "lucide-react"

import { authClient } from "@/lib/auth-client"

const SignInPage = () => {
  const searchParams = useSearchParams()
  const redirectTo = searchParams.get("redirectTo") ?? "/"
  const router = useRouter()

  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    setError("")

    const formData = new FormData(event.currentTarget)

    const email = formData.get("email") as string
    const password = formData.get("password") as string

    try {
      setIsLoading(true)

      // Better Auth Email Sign In
      const { data, error } = await authClient.signIn.email({
        email,
        password,
        callbackURL: redirectTo, 
      })

      // Handle login error
      if (error) {
        setError(error.message || "Invalid email or password.")
        return
      }

      // Login successful
      if (data) {
        router.push("/")
        router.refresh()
      }

    } catch (err) {
      console.error("Sign In Error:", err)
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

          <div className="mb-7 text-center">
            <h1 className="text-2xl font-semibold">
              Welcome Back
            </h1>

            <p className="mt-2 text-sm text-white/50">
              Sign in to continue your career journey.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">

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

              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="text-sm font-medium text-white/80"
                >
                  Password
                </label>

                <button
                  type="button"
                  className="text-xs text-[#897aff] transition-colors hover:text-white"
                  onClick={() =>
                    alert("Forgot password functionality will be added later.")
                  }
                >
                  Forgot Password?
                </button>
              </div>

              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  autoComplete="current-password"
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
                  Signing In...
                </>
              ) : (
                "Sign In"
              )}
            </button>

          </form>

          {/* Sign Up Toggle */}
          <p className="mt-7 text-center text-sm text-white/50">
            Don't have an account?{" "}

            <Link
              href="/sign-up"
              className="font-semibold text-[#897aff] transition-colors hover:text-white"
            >
              Create Account
            </Link>
          </p>

        </div>

        <p className="mt-6 text-center text-xs text-white/30">
          © 2026 HireLoop. All rights reserved.
        </p>

      </div>
    </main>
  )
}

export default SignInPage
