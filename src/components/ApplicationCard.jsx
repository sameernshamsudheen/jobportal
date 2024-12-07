import { BriefcaseBusiness, Download, SchoolIcon } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { BarLoader } from "react-spinners";
import UseFetch from "@/hooks/UseFetch";
import { updateApplicationStatus } from "@/api/apiApplication";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

const ApplicationCard = ({ application, isCandidate = false }) => {


  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = application?.resume;
    link.target = "_blank";
    link.click();
  };
  const { loading: loadingHiringStatus, fn: fnHiringStatus } = UseFetch(
    updateApplicationStatus,
    {
      job_id: application.job_id,
    }
  );

  const handleStatusChange = (status) => {
    console.log(status, "===status===");

    fnHiringStatus(status).then(() => fnHiringStatus());
  };
  return (
    <Card>
      {loadingHiringStatus && <BarLoader width={"100%"} color="#36d7b7" />}
      <CardHeader>
        <CardTitle className="flex justify-between font-bold">
          {isCandidate
            ? `${application?.job?.title} at ${application?.job?.company?.name}`
            : application?.name}
          <Download
            size={18}
            className="bg-white text-black rounded-full h-8 w-8 p-1.5 cursor-pointer"
            onClick={handleDownload}
          />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col md:flex-row justify-between">
          <div className="flex gap-2 items-center">
            <BriefcaseBusiness size={15} />
            {application?.experiance}years of experiance
          </div>
          <div className="flex gap-2 items-center">
            <SchoolIcon size={15} />
            {application?.education}
          </div>
          <div className="flex gap-2 items-center">
            <SchoolIcon size={15} />
            Skills:{application?.skills}
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        {<span>{new Date(application?.created_at).toLocaleString()}</span>}
        {isCandidate ? (
          <span className="capitalize font-bold">
            Status:{application?.status}
          </span>
        ) : (
          <Select
            onValueChange={handleStatusChange}
            defaultValue={application.status}
          >
            <SelectTrigger className="w-52">
              <SelectValue placeholder="Application Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="applied">Applied</SelectItem>
              <SelectItem value="interviewing">Interviewing</SelectItem>
              <SelectItem value="hired">Hired</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
            </SelectContent>
          </Select>
        )}
      </CardFooter>
    </Card>
  );
};

export default ApplicationCard;
