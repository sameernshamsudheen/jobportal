import { useSession, useUser } from "@clerk/clerk-react";
import { useEffect, useState } from "react";
import { getJobs } from "@/api/apijobs";
import UseFetch from "@/hooks/UseFetch";
import { BarLoader } from "react-spinners";
import JobCards from "@/components/JobCards";

const JobListing = () => {
  const [location, setLocation] = useState("");
  const [company_id, setCompany_id] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const { isLoaded } = useUser();

  const {
    fn: fnjobs,
    data: jobsData,
    loading: loadingJobs,
  } = UseFetch(getJobs, {
    location,
    company_id,
    searchQuery,
  });

  useEffect(() => {
    if (isLoaded) {
      fnjobs();
    }
  }, [isLoaded, location, company_id, searchQuery]);

  if (!isLoaded) {
    return <BarLoader className="mb-4" width="100%" color="#36d7b7" />;
  }

  return (
    <div>
      <h1 className="gradient-title text-6xl text-center font-bold text-7xl">
        Latest Jobs
      </h1>
      {loadingJobs && (
        <BarLoader className="mb-4" width="100%" color="#36d7b7" />
      )}
      {!loadingJobs && (
        <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {jobsData?.length > 0 ? (
            jobsData?.map((job) => {
              return (
                <JobCards
                  savedInit={job?.saved?.length > 0}
                  key={job?.id}
                  job={job}
                />
              );
            })
          ) : (
            <div>no jobs found</div>
          )}
        </div>
      )}
    </div>
  );
};

export default JobListing;
