import { getSingleJOb, updateHiringStatus } from "@/api/apijobs";
import UseFetch from "@/hooks/UseFetch";
import { useUser } from "@clerk/clerk-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@radix-ui/react-select";
import MDEditor from "@uiw/react-md-editor";
import { Briefcase, DoorClosed, DoorOpen, MapPinIcon } from "lucide-react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { BarLoader } from "react-spinners";

const JobPage = () => {
  const { isLoaded, user } = useUser();
  const { id } = useParams();
  const {
    loading: loadingJobs,
    data: jobs,
    fn: fnJobs,
  } = UseFetch(getSingleJOb, {
    job_id: id,
  });

  const {
    loading: loadingHiringStatus,

    fn: fnHiringStatus,
  } = UseFetch(updateHiringStatus, {
    job_id: id,
  });
  useEffect(() => {
    if (isLoaded) fnJobs();
  }, [isLoaded]);

  const handleStatusChange = (value) => {
    console.log(typeof value);

    const isOpen = value === "open"; // Convert to boolean
    console.log("isOpen:", typeof isOpen);
    fnHiringStatus(isOpen).then(() => fnJobs());
  };
  if (!isLoaded || loadingJobs) {
    return <BarLoader className="mb-4" width={"100%"} color="#36d7b7" />;
  }

  return (
    <div className="flex flex-col gap-8 mt-5">
      <div className="flex flex-col-reverse gap-6 md:flex-row justify-between items-center">
        <h1 className="gradient-title font-extrabold pb-3 text-4xl sm:text-6xl">
          {jobs?.title}
        </h1>
        <img src={jobs?.company?.logo_url} className="h-12" alt={jobs?.title} />
      </div>
      <div className="flex justify-between">
        <div className="flex gap-2">
          <MapPinIcon />
          {jobs?.location}
        </div>
        <div className="flex gap-2">
          <Briefcase /> {jobs?.applications?.length} Applicants
        </div>
        <div className="flex gap-2">
          {jobs?.isOpen ? (
            <>
              <DoorOpen />
              Open
            </>
          ) : (
            <>
              <DoorClosed />
              Closed
            </>
          )}
        </div>
      </div>
      {/* hiringStatus */}
      {jobs?.recruiter_id === user?.id && (
        <Select onValueChange={handleStatusChange}>
          <SelectTrigger
            className={`w-full ${jobs?.isOpen ? "bg-green-950" : "bg-red-950"}`}
          >
            <SelectValue
              placeholder={
                "Hiring Status " + (jobs?.isOpen ? "( Open )" : "( Closed )")
              }
            />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="open">Open</SelectItem>
            <SelectItem value="closed">Closed</SelectItem>
          </SelectContent>
        </Select>
      )}
      <h2 className="text-2xl sm:text-3xl font-bold">About the Job</h2>
      <p className="sm:text-lg">{jobs?.description}</p>
      <h2 className="text-2xl sm:text-3xl font-bold">
        What we are looking for
      </h2>
      <MDEditor.Markdown
        style={{
          backgroundColor: "transparent",
          listStyle: "disc",
          color: "white",
        }}
        className="bg-transparent sm:text-lg"
        source={jobs?.requirements}
      />
      {/* render applications */}
    </div>
  );
};

export default JobPage;
