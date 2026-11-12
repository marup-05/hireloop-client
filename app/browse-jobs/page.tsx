import { SiteNavbar } from "@/components/site-navbar"
import { getJobs } from "@/lib/api/jobs"
import BrowseJobsView from "./view"

// Browse Jobs page — "Public / Browse Jobs" Figma frame.
// The URL query is read server-side and passed straight to the API; the UI
// keeps its selections local (no query is set on filter clicks — wiring
// added later).
export default async function BrowseJobPage({
  searchParams,
}: {
  searchParams: Promise<{
    [key: string]: string | string[] | undefined;
  }>;
}) {
  const search = await searchParams;

  const urlSearch = new URLSearchParams();

  Object.entries(search).forEach(([key, value]) => {
    if (typeof value === "string") {
      urlSearch.set(key, value);
    }
  });

  const query = urlSearch.toString();

  console.log('search params:', query);
  const jobs = await getJobs(query)

  return (
    <div className="min-h-screen w-full bg-[#08080a]">
      <SiteNavbar />
      <main>
        <BrowseJobsView jobs={jobs} />
      </main>
    </div>
  );
}
