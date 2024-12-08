import { getMyJobs } from "@/api/apijobs";
import UseFetch from "@/hooks/UseFetch";
import { useUser } from "@clerk/clerk-react";
import { BarLoader } from "react-spinners";
import JobCards from "@/components/JobCards";
import { useEffect } from "react";
const CreatedJobs = () => {
  const { user } = useUser();

  const {
    loading: loadingCreatedJobs,
    data: createdJobs,
    fn: fnCreatedJobs,
  } = UseFetch(getMyJobs, {
    recruiter_id: user.id,
  });

  useEffect(() => {
    fnCreatedJobs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div>
    {loadingCreatedJobs ? (
      <BarLoader className="mt-4" width={"100%"} color="#36d7b7" />
    ) : (
      <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {createdJobs?.length ? (
          createdJobs.map((job) => {
            return (
              <JobCards
                key={job.id}
                job={job}
                onJobAction={fnCreatedJobs}
                isMyJob
              />
            );
          })
        ) : (
          <div>No Jobs Found 😢</div>
        )}
      </div>
    )}
  </div>
  );
};

export default CreatedJobs;
