import { Button } from "@/components/ui/button";
import { Helmet } from "react-helmet";

import { Link } from "react-router-dom";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import React, { Suspense } from "react";

const LandingCarousel = React.lazy(() =>
  import("@/components/LandingCarousel")
);
const FaqAccordian = React.lazy(() => import("@/components/FaqAccordian"));

const Landing = () => {
  return (
    <main className="flex flex-col gap-10  sm:gap-20 py-10 sm:py-20 px-4 xl:px-0">
      <Helmet>
        <link rel="preload" as="image" href="/banner.webp" />
      </Helmet>
      <section className="text-center ">
        <h1 className="flex flex-col items-center justify-center gradient-title text-4xl font-extrabold sm:text-6xl lg:text-8xl tracking-tighter py-4">
          {" "}
          Find your Dream Job and{" "}
          <span className=" flex  gap-2 sm:gap-6  items-center">
            get hired{" "}
            <img
              src="/logo.webp"
              className="h-14 sm:h-24 lg:h-32"
              alt="logo"
              loading="lazy"
            />
          </span>
        </h1>
        <p className="text-gray-300 sm:mt-4 text-xs sm:text-xl">
          Explore thousands of job listings or find the perfect candidate
        </p>
      </section>
      <div className="flex  gap-6  justify-center">
        <Link to="/jobs">
          <Button variant="blue" className="sm:w-52">
            Find jobs
          </Button>
        </Link>
        <Link to="/post-job">
          <Button className="sm:w-52" variant="destructive">
            Post a job
          </Button>
        </Link>
      </div>

      <LandingCarousel />

      {/* banner */}
      <div className="px-2 xl:px-0">
        <img
          src="/banner.webp"
          className="w-full"
          loading="lazy"
          alt="banner"
        />
      </div>
      <section className="grid grid-cols-1 md:grid-cols-2 gap-4 px-2 xl:px-0">
        <Card>
          <CardHeader>
            <CardTitle className="font-bold">For Job Seeekers</CardTitle>
          </CardHeader>
          <CardContent>
            Search and apply for jobs, track applications, and more.
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="font-bold">For Employers</CardTitle>
          </CardHeader>
          <CardContent>
            Post jobs, manage applications, and find the best candidates.
          </CardContent>
        </Card>
      </section>
      <Suspense fallback={<div>loading.....</div>}>
        <FaqAccordian />
      </Suspense>
    </main>
  );
};

export default Landing;
