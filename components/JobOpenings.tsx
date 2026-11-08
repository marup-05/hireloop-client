
import { ArrowRight, MapPin, BriefcaseBusiness, Euro } from "lucide-react";

const jobs = [
  { id: 1, title: "Frontend Developer", location: "New York, USA", type: "Hybrid", salary: "€25–€40/hour" },
  { id: 2, title: "Frontend Developer", location: "New York, USA", type: "Hybrid", salary: "€25–€40/hour" },
  { id: 3, title: "Frontend Developer", location: "New York, USA", type: "Hybrid", salary: "€25–€40/hour" },
  { id: 4, title: "Frontend Developer", location: "New York, USA", type: "Hybrid", salary: "€25–€40/hour" },
  { id: 5, title: "Frontend Developer", location: "New York, USA", type: "Hybrid", salary: "€25–€40/hour" },
  { id: 6, title: "Frontend Developer", location: "New York, USA", type: "Hybrid", salary: "€25–€40/hour" },
];

export default function JobOpenings() {
  return (
    <section className="bg-black px-5 py-20 text-white sm:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 text-center">
          <div className="mb-3 flex items-center justify-center gap-2 text-[10px] uppercase tracking-widest text-gray-400">
            <span className="h-1 w-1 bg-violet-500" />
            Smart Job Discovery
            <span className="h-1 w-1 bg-violet-500" />
          </div>

          <h2 className="text-3xl font-medium leading-tight tracking-tight sm:text-4xl">
            The roles you&apos;d never
            <br />
            find by searching
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {jobs.map((job) => (
            <div
              key={job.id}
              className="flex min-h-[185px] flex-col rounded-xl border border-[#202020] bg-[#161616] p-4 transition-all duration-300 hover:border-violet-500/40 hover:bg-[#1b1b1b] sm:p-5"
            >
              <h3 className="mb-2 text-lg font-medium tracking-tight">
                {job.title}
              </h3>

              <p className="mb-4 max-w-[290px] text-[11px] leading-[1.7] text-gray-400">
                Showcase your commitment to diversity and inclusion by highlighting initiatives.
              </p>

              <div className="mb-2 flex flex-wrap gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-[#242424] px-2.5 py-1 text-[9px] text-gray-200">
                  <MapPin size={10} className="text-fuchsia-300" />
                  {job.location}
                </span>

                <span className="inline-flex items-center gap-1.5 rounded-full bg-[#242424] px-2.5 py-1 text-[9px] text-gray-200">
                  <BriefcaseBusiness size={10} className="text-fuchsia-300" />
                  {job.type}
                </span>
              </div>

              <div>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-[#242424] px-2.5 py-1 text-[9px] text-gray-200">
                  <Euro size={10} className="text-fuchsia-300" />
                  {job.salary}
                </span>
              </div>

              <a
                href="#"
                className="mt-auto inline-flex w-fit items-center gap-2 pt-6 text-[10px] text-white transition-colors hover:text-violet-300"
              >
                Apply Now
                <ArrowRight size={12} />
              </a>
            </div>
          ))}
        </div>

        <div className="mt-7 flex justify-center">
          <a
            href="#"
            className="rounded-md bg-white px-5 py-2.5 text-[10px] font-medium text-black transition hover:bg-gray-200"
          >
            View all job open
          </a>
        </div>
      </div>
    </section>
  );
}
