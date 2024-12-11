import {  lazy } from "react";
import ProtectedRoute from "@/auth/ProtectedRoute";
import AppLayout from "@/layouts/AppLayout";

// Lazy load the components
const Landing = lazy(() => import("@/pages/Landing"));
const OnBoarding = lazy(() => import("@/pages/OnBoarding"));
const JobListing = lazy(() => import("@/pages/JobListing"));
const JobPage = lazy(() => import("@/pages/JobPage"));
const PostJobs = lazy(() => import("@/pages/PostJobs"));
const SavedJobs = lazy(() => import("@/pages/SavedJobs"));
const MyJobs = lazy(() => import("@/pages/MyJobs"));

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

        element: (
          <ProtectedRoute>
            <OnBoarding />
          </ProtectedRoute>
        ),
      },
      {
        path: "/joblisting",
        element: (
          <ProtectedRoute>
            <JobListing />
          </ProtectedRoute>
        ),
      },
      {
        path: "/post-job",
        element: (
          <ProtectedRoute>
            <PostJobs />
          </ProtectedRoute>
        ),
      },
      {
        path: "/job/:id",
        element: (
          <ProtectedRoute>
            <JobPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "/jobs",
        element: (
          <ProtectedRoute>
            <JobListing />
          </ProtectedRoute>
        ),
      },
      {
        path: "/saved-jobs",
        element: (
          <ProtectedRoute>
            <SavedJobs />
          </ProtectedRoute>
        ),
      },
      {
        path: "/my-jobs",
        element: (
          <ProtectedRoute>
            <MyJobs />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

export default router;
