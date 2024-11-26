import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/clerk-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BarLoader } from "react-spinners";

const OnBoarding = () => {
  const navigate = useNavigate();
  const { user, isLoaded } = useUser();
  const handleRoleSelection = async (role) => {
    console.log(role);

    await user
      .update({
        unsafeMetadata: { role },
      })
      .then(() => {
        navigate(role === "recruiter" ? "/post-job" : "/jobs");
      });
  };

  useEffect(() => {
    if (user?.unsafeMetadata?.role) {
      navigate(
        user?.unsafeMetadata?.role === "recruiter" ? "/post-job" : "/jobs"
      );
    }
  }, [user]);

  if (!isLoaded) {
    return <BarLoader className="mb-4" width="100%" color="#36d7b7" />;
  } else {
    return (
      <div className="flex flex-col items-center justify-center mt-32 ">
        <h2 className="gradient-title font-extrabold text-7xl sm:text-8xl tracking-tighter">
          Iam a.......
        </h2>
        <div className="mt-16 flex  justify-center  gap-6  md:px-40 w-full ">
          <Button
            onClick={() => handleRoleSelection("candidate")}
            size="xl"
            variant="blue"
            className="h-36 text-2xl"
          >
            Canditate
          </Button>
          <Button
            onClick={() => handleRoleSelection("recruiter")}
            size="xl"
            variant="destructive"
            className="h-36 text-2xl"
          >
            Recruiter
          </Button>
        </div>
      </div>
    );
  }
};

export default OnBoarding;
