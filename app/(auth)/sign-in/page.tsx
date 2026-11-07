
"use client"

import { useState, type FormEvent } from "react"
import Link from "next/link"
import { Eye, EyeOff, BriefcaseBusiness } from "lucide-react"

const SignInPage = () => {
  const [showPassword, setShowPassword] = useState(false)

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)

    const userData = {
      email: formData.get("email"),
      password: formData.get("password"),
    }

    console.log("Sign In Data:", userData)
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
              <label htmlFor="email" className="text-sm font-medium text-white/80">
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
                <label htmlFor="password" className="text-sm font-medium text-white/80">
                  Password
                </label>

                <button
                  type="button"
                  className="text-xs text-[#897aff] transition-colors hover:text-white"
                  onClick={() => alert("Forgot password functionality will be added later.")}
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

            {/* Submit */}
            <button
              type="submit"
              className="h-12 w-full rounded-lg bg-[#624BFF] text-sm font-semibold text-white transition-all hover:bg-[#7865ff] hover:shadow-[0_0_20px_rgba(98,75,255,0.3)]"
            >
              Sign In
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
