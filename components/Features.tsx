
import {
  Search,
  ChartNoAxesCombined,
  Building2,
  Bookmark,
  MousePointerClick,
  FileText,
  Hexagon,
  TrendingUp,
} from "lucide-react";

const features = [
  {
    icon: Search,
    title: "Smart Search",
    description: "Find your ideal job with advanced filters.",
  },
  {
    icon: ChartNoAxesCombined,
    title: "Salary Insights",
    description: "Get real salary data to negotiate confidently.",
  },
  {
    icon: Building2,
    title: "Top Companies",
    description: "Apply to vetted companies that are hiring.",
  },
  {
    icon: Bookmark,
    title: "Saved Jobs",
    description: "Manage apps & favorites on your dashboard.",
  },
  {
    icon: MousePointerClick,
    title: "One-Click Apply",
    description: "Simplify your job applications for an easier process!",
  },
  {
    icon: FileText,
    title: "Resume Builder",
    description: "Create professional resumes with modern templates.",
  },
  {
    icon: Hexagon,
    title: "Skill-Based Matching",
    description: "Discover jobs that match your skills and experience.",
  },
  {
    icon: TrendingUp,
    title: "Career Growth Resources",
    description: "Boost your career with quick interview tips.",
  },
];

export default function Features() {
  return (
    <section className="bg-[#151515] px-5 py-20 text-white sm:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="mb-14 text-center">
          <div className="mb-3 flex items-center justify-center gap-2 text-[10px] uppercase tracking-widest text-gray-400">
            <span className="h-1 w-1 bg-violet-500" />
            Features Job
            <span className="h-1 w-1 bg-violet-500" />
          </div>

          <h2 className="text-3xl font-medium leading-tight tracking-tight sm:text-4xl">
            Everything you need
            <br />
            to succeed
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-x-7 gap-y-7 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.title}
                className="flex items-start gap-3"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-[#292929] bg-gradient-to-br from-black to-[#202020]">
                  <Icon
                    size={17}
                    strokeWidth={1.7}
                    className="text-fuchsia-300"
                  />
                </div>

                <div>
                  <h3 className="mb-1 text-[11px] font-medium text-white">
                    {feature.title}
                  </h3>

                  <p className="max-w-[190px] text-[10px] leading-[1.7] text-gray-400">
                    {feature.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
