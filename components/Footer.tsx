
import Image from "next/image";
import Link from "next/link";

const FacebookIcon = () => (
  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
    <path d="M13.5 21v-8.2h2.8l.4-3.2h-3.2V7.55c0-.93.26-1.56 1.6-1.56h1.7V3.12A22 22 0 0 0 14.3 3c-2.48 0-4.18 1.51-4.18 4.29V9.6H7.3v3.2h2.82V21h3.38Z" />
  </svg>
);

const PinterestIcon = () => (
  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
    <path d="M12 2a10 10 0 0 0-3.64 19.31c-.03-.78-.01-1.72.19-2.57l1.37-5.8s-.34-.68-.34-1.68c0-1.57.91-2.75 2.04-2.75.96 0 1.43.72 1.43 1.58 0 .96-.61 2.4-.92 3.73-.26 1.11.56 2.02 1.65 2.02 1.98 0 3.32-2.54 3.32-5.55 0-2.29-1.54-4.01-4.35-4.01-3.17 0-5.15 2.37-5.15 5.02 0 .91.27 1.55.7 2.05.2.23.23.32.16.58l-.22.89c-.07.28-.28.38-.52.28-1.46-.6-2.14-2.2-2.14-4 0-2.98 2.51-6.56 7.49-6.56 4.01 0 6.65 2.9 6.65 6.02 0 4.12-2.29 7.2-5.66 7.2-1.13 0-2.19-.61-2.55-1.3l-.74 2.94c-.22.86-.66 1.72-1.06 2.39A10 10 0 1 0 12 2Z" />
  </svg>
);

const LinkedInIcon = () => (
  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
    <path d="M5.2 3.5a2 2 0 1 0 0 4 2 2 0 0 0 0-4ZM3.5 9h3.4v11.5H3.5V9Zm5.5 0h3.25v1.57h.05c.45-.85 1.55-1.75 3.2-1.75 3.42 0 4.05 2.25 4.05 5.18v6.5h-3.4v-5.76c0-1.38-.03-3.16-1.93-3.16-1.93 0-2.22 1.5-2.22 3.06v5.86H9V9Z" />
  </svg>
);

const Footer = () => {
  return (
    <footer className="relative w-full overflow-hidden bg-[#050505] text-white">

      {/* CTA Section */}
      <section className="relative flex min-h-[440px] flex-col items-center justify-center overflow-hidden px-5 pb-12 pt-20 text-center">

        {/* Globe Background */}
        <svg
          className="pointer-events-none absolute left-1/2 top-0 h-[470px] w-[1250px] max-w-none -translate-x-1/2"
          viewBox="0 0 1200 500"
          fill="none"
          preserveAspectRatio="xMidYMin meet"
          aria-hidden="true"
        >
          <defs>
            <radialGradient id="globeGlow" cx="50%" cy="0%" r="75%">
              <stop offset="0%" stopColor="#5145E8" />
              <stop offset="38%" stopColor="#29216E" />
              <stop offset="78%" stopColor="#090817" />
              <stop offset="100%" stopColor="#050505" />
            </radialGradient>

            <clipPath id="globeClip">
              <circle cx="600" cy="550" r="550" />
            </clipPath>

            <linearGradient id="globeFade" x1="600" y1="0" x2="600" y2="500" gradientUnits="userSpaceOnUse">
              <stop stopColor="#A5A0FF" stopOpacity=".55" />
              <stop offset="1" stopColor="#6961D8" stopOpacity=".04" />
            </linearGradient>
          </defs>

          {/* Globe Surface */}
          <circle cx="600" cy="550" r="550" fill="url(#globeGlow)" />

          <g clipPath="url(#globeClip)" stroke="url(#globeFade)" strokeWidth="1">
            {/* Horizontal curved grid lines */}
            <ellipse cx="600" cy="550" rx="540" ry="115" />
            <ellipse cx="600" cy="550" rx="545" ry="210" />
            <ellipse cx="600" cy="550" rx="548" ry="310" />
            <ellipse cx="600" cy="550" rx="550" ry="420" />
            <ellipse cx="600" cy="550" rx="550" ry="550" />

            {/* Vertical curved grid lines */}
            <ellipse cx="600" cy="550" rx="100" ry="550" />
            <ellipse cx="600" cy="550" rx="200" ry="550" />
            <ellipse cx="600" cy="550" rx="300" ry="550" />
            <ellipse cx="600" cy="550" rx="400" ry="550" />
            <ellipse cx="600" cy="550" rx="500" ry="550" />
            <path d="M600 0V500" />
          </g>

          {/* Globe Outer Border */}
          <path
            d="M50 500 A550 550 0 0 1 1150 500"
            stroke="#7770E8"
            strokeOpacity=".35"
          />
        </svg>

        {/* CTA Content */}
        <div className="relative z-10 mx-auto max-w-2xl">
          <h2 className="text-[32px] font-semibold leading-[1.2] tracking-[-1.5px] sm:text-[40px] md:text-[44px]">
            Your next role is
            <br />
            already looking for you
          </h2>

          <p className="mt-3 text-xs leading-6 text-gray-400 sm:text-sm">
            Build a profile in three minutes. The matches start arriving tomorrow morning.
          </p>

          <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/sign-up"
              className="rounded-lg bg-white px-5 py-3 text-[11px] font-medium text-black transition-colors hover:bg-gray-200"
            >
              Create a free account
            </Link>

            <Link
              href="/pricing"
              className="rounded-lg border border-white/15 bg-white/[0.04] px-5 py-3 text-[11px] font-medium text-white transition-colors hover:bg-white/10"
            >
              View pricing
            </Link>
          </div>
        </div>
      </section>

      {/* Footer Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-6 pb-5 pt-2 sm:px-8">
        <div className="grid grid-cols-1 gap-9 sm:grid-cols-2 lg:grid-cols-5">

          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-block">
              <Image
                src="/images/logo.png"
                alt="HireLoop"
                width={110}
                height={35}
                className="h-auto w-[100px] object-contain"
              />
            </Link>

            <p className="mt-3 max-w-[220px] text-[10px] leading-[1.8] text-gray-500">
              The AI-native career platform. Built for people who take their work seriously.
            </p>

            {/* Social Icons */}
            <div className="mt-7 flex items-center gap-2">
              <a
                href="#"
                aria-label="Facebook"
                className="flex h-7 w-7 items-center justify-center rounded-md bg-white/[0.06] text-gray-400 transition hover:bg-[#1877F2] hover:text-white"
              >
                <FacebookIcon />
              </a>

              <a
                href="#"
                aria-label="Pinterest"
                className="flex h-7 w-7 items-center justify-center rounded-md bg-[#30247D] text-white transition hover:bg-[#E60023]"
              >
                <PinterestIcon />
              </a>

              <a
                href="#"
                aria-label="LinkedIn"
                className="flex h-7 w-7 items-center justify-center rounded-md bg-white/[0.06] text-gray-400 transition hover:bg-[#0A66C2] hover:text-white"
              >
                <LinkedInIcon />
              </a>
            </div>
          </div>

          {/* Product */}
          <div>
            <h3 className="mb-4 text-[10px] font-medium text-indigo-500">
              Product
            </h3>
            <ul className="space-y-2.5 text-[10px] text-gray-500">
              <li><Link href="/jobs" className="hover:text-white transition">Job discovery</Link></li>
              <li><Link href="/jobs" className="hover:text-white transition">Worker AI</Link></li>
              <li><Link href="/company" className="hover:text-white transition">Companies</Link></li>
              <li><Link href="/pricing" className="hover:text-white transition">Salary data</Link></li>
            </ul>
          </div>

          {/* Navigations */}
          <div>
            <h3 className="mb-4 text-[10px] font-medium text-indigo-500">
              Navigations
            </h3>
            <ul className="space-y-2.5 text-[10px] text-gray-500">
              <li><Link href="#" className="hover:text-white transition">Help center</Link></li>
              <li><Link href="#" className="hover:text-white transition">Career library</Link></li>
              <li><Link href="#" className="hover:text-white transition">Contact</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="mb-4 text-[10px] font-medium text-indigo-500">
              Resources
            </h3>
            <ul className="space-y-2.5 text-[10px] text-gray-500">
              <li><Link href="#" className="hover:text-white transition">Brand Guideline</Link></li>
              <li><Link href="#" className="hover:text-white transition">Newsroom</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-9 flex flex-col gap-3 border-t border-white/[0.08] pt-4 text-[9px] text-gray-500 sm:flex-row sm:items-center sm:justify-between">
          <p>Copyright 2024 – Programming Hero</p>

          <div className="flex flex-wrap gap-4">
            <Link href="#" className="transition hover:text-white">
              Terms &amp; Policy
            </Link>
            <Link href="#" className="transition hover:text-white">
              Privacy Guideline
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
