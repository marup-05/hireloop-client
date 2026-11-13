
"use client"

import Image from "next/image"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"

import { Button, buttonVariants } from "@/components/ui/button"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

import { MenuIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { authClient } from "@/lib/auth-client"

function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname.startsWith(href)
}

function Logo() {
  return (
    <Link
      href="/"
      aria-label="HireLoop home"
      className="flex shrink-0 items-center"
    >
      <Image
        src="/images/logo.png"
        alt="HireLoop"
        width={154}
        height={44}
        preload
        className="h-10 w-auto"
      />
    </Link>
  )
}

function NavLinks({ className }: { className?: string }) {
  const pathname = usePathname()
  const { data: session } = authClient.useSession()

  const navLinks = [
    { href: "/browse-jobs", label: "Browse Jobs" },
    { href: "/company", label: "Company" },
    { href: "/pricing", label: "Pricing" },
    ...(session?.user
      ? [
          {
            href: `/dashboard/${session.user.role || "seeker"}`,
            label: "Dashboard",
          },
        ]
      : []),
  ]

  return (
    <nav aria-label="Main navigation" className={className}>
      <ul className="flex items-center gap-7">
        {navLinks.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              aria-current={isActive(pathname, link.href) ? "page" : undefined}
              className={cn(
                "text-sm transition-colors",
                isActive(pathname, link.href)
                  ? "font-medium text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}

function AuthButtons({ mobile = false }: { mobile?: boolean }) {
  const router = useRouter()
  const { data: session, isPending } = authClient.useSession()

  const handleSignOut = async () => {
    try {
      const { error } = await authClient.signOut()

      if (error) {
        console.error("Sign Out Error:", error.message)
        return
      }

      router.refresh()
    } catch (err) {
      console.error("Sign Out Error:", err)
    }
  }

  if (isPending) {
    return null
  }

  if (session?.user) {
    return (
      <div
        className={
          mobile
            ? "flex flex-col gap-3"
            : "flex items-center gap-3"
        }
      >
        <p className="text-sm font-medium text-foreground">
          Welcome, <span className="text-primary">{session.user.name}</span>
        </p>

        {mobile ? (
          <SheetClose
            render={
              <Button
                variant="outline"
                size="lg"
                className="w-full"
                onClick={handleSignOut}
              />
            }
          >
            Sign Out
          </SheetClose>
        ) : (
          <Button
            variant="outline"
            size="lg"
            className="h-10"
            onClick={handleSignOut}
          >
            Sign Out
          </Button>
        )}
      </div>
    )
  }

  return (
    <div
      className={
        mobile
          ? "flex flex-col gap-3"
          : "flex items-center gap-3"
      }
    >
      {mobile ? (
        <>
          <SheetClose
            render={
              <Link
                href="/sign-in"
                className={cn(
                  buttonVariants({ variant: "ghost", size: "lg" }),
                  "w-full"
                )}
              />
            }
          >
            Sign In
          </SheetClose>

          <Button
            size="lg"
            className="w-full rounded-full"
            render={
              <SheetClose render={<Link href="/sign-up" />} />
            }
          >
            Get Started
          </Button>
        </>
      ) : (
        <>
          <Button
            variant="ghost"
            size="lg"
            className="h-10 text-primary hover:bg-primary/10"
            render={<Link href="/sign-in" />}
          >
            Sign In
          </Button>

          <Button
            size="lg"
            className="h-10 rounded-full px-10 text-[15px]"
            render={<Link href="/sign-up" />}
          >
            Get Started
          </Button>
        </>
      )}
    </div>
  )
}

export function SiteNavbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 w-full max-w-[1220px] items-center justify-between gap-6 px-4 sm:px-6 lg:px-8">
        <Logo />

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-8 md:flex">
          <NavLinks />
          <AuthButtons />
        </div>

        {/* Mobile Navigation */}
        <Sheet>
          <SheetTrigger
            render={
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                aria-label="Open navigation menu"
              />
            }
          >
            <MenuIcon />
          </SheetTrigger>

          <SheetContent className="gap-0">
            <SheetHeader className="border-b py-5">
              <SheetTitle className="sr-only">
                Navigation menu
              </SheetTitle>
              <Logo />
            </SheetHeader>

            <MobileNavLinks />

            <SheetFooter className="border-t">
              <AuthButtons mobile />
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}

function MobileNavLinks() {
  const pathname = usePathname()
  const { data: session } = authClient.useSession()

  const navLinks = [
    { href: "/browse-jobs", label: "Browse Jobs" },
    { href: "/company", label: "Company" },
    { href: "/pricing", label: "Pricing" },
    ...(session?.user
      ? [
          {
            href: `/dashboard/${session.user.role || "seeker"}`,
            label: "Dashboard",
          },
        ]
      : []),
  ]

  return (
    <nav aria-label="Mobile navigation" className="p-4">
      <ul className="flex flex-col gap-1">
        {navLinks.map((link) => (
          <li key={link.href}>
            <SheetClose
              render={<Link href={link.href} />}
              className={cn(
                "flex items-center rounded-md px-3 py-2.5 text-sm transition-colors hover:bg-muted",
                isActive(pathname, link.href)
                  ? "font-medium text-foreground"
                  : "text-muted-foreground"
              )}
            >
              {link.label}
            </SheetClose>
          </li>
        ))}
      </ul>
    </nav>
  )
}
