import AppLayout from "@/layouts/AppLayout";
import JobListing from "@/pages/JobListing";
import JobPage from "@/pages/JobPage";

import Landing from "@/pages/Landing";
import MyJobs from "@/pages/MyJobs";
import OnBoarding from "@/pages/OnBoarding";
import PostJobs from "@/pages/PostJobs";
import SavedJobs from "@/pages/SavedJobs";
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <Landing />,
      },
      {
        path: "/onboarding",
        element: <OnBoarding />,
      },
      {
        path: "/joblisting",
        element: <JobListing />,
      },
      {
        path: "/post-job",
        element: <PostJobs />,
      },
      {
        path: "/job/:id",
        element: <JobPage />,
      },
      {
        path: "/job",
        element: <JobListing />,
      },
      {
        path: "/saved-jobs",
        element: <SavedJobs />,
      },
      {
        path: "/my-jobs",
        element: <MyJobs />,
      },
    ],
  },
]);

export default router;
