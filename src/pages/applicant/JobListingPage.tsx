import { Button } from "@/components/common/Button";
import { EmptyState } from "@/components/common/EmptyState";
import ApplicantLayout from "@/components/common/layout/ApplicantLayout";
import { Tag } from "@/components/common/Tag";
import { supabase } from "@/supabase-client";
import type { TJob } from "@/types/jobType";
import { BanknotesIcon, MapPinIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";

const JobListingPage = () => {
  const [jobsData, setJobsData] = useState<TJob[]>([]);
  const [selectedJob, setSelectedJob] = useState(0);

  const currentJob = jobsData[selectedJob];

  const fetchJobs = async () => {
    const { data, error } = await supabase
      .from("jobs")
      .select("*")
      .order("created_at", { ascending: true });

    if (error) {
      console.log("Error fetching jobs:", error);
      return;
    }

    setJobsData(data);
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  return (
    <ApplicantLayout>
      {jobsData.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Sidebar - Job List */}
          <div className="lg:col-span-1 space-y-4">
            {jobsData.map((job, index) => (
              <button
                key={job.id}
                onClick={() => setSelectedJob(index)}
                className={`w-full text-left p-3 rounded-lg border-2 transition-all ${
                  selectedJob === index
                    ? "border-primary-hover bg-primary-surface"
                    : "border-neutral-40 bg-neutral-10 hover:border-primary-hover hover:bg-primary-surface"
                }`}
              >
                <div className="flex items-start gap-4 border-b border-dashed border-neutral-40 mb-2">
                  <div className="w-12 h-12 rounded-lg flex items-center justify-center shrink-0">
                    <img src="/public/Logo.png" alt="Logo Rakamin" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-l-bold text-neutral-90">{job.title}</h3>
                    <p className="text-m-regular text-neutral-90 mb-2">
                      Rakamin
                    </p>
                  </div>
                </div>
                <div className="flex items-center text-s-regular text-neutral-80 mb-2">
                  <MapPinIcon className="w-4 h-4 mr-1" />
                  <span>Jakarta Selatan</span>
                </div>

                <div className="flex items-center text-s-regular text-neutral-80">
                  <BanknotesIcon className="w-4 h-4 mr-1" />
                  <span>{job.salary_range.display_text}</span>
                </div>
              </button>
            ))}
          </div>

          {/* Main Content - Job Details */}
          <div className="lg:col-span-2">
            <div className="bg-neutral-10 rounded-lg border border-neutral-40">
              {/* Job Header */}
              <div className="p-6">
                <div className="flex items-start justify-between pb-4 border-b border-neutral-40">
                  <div className="flex items-start gap-5">
                    <div className="w-12 h-12 rounded-lg flex items-center justify-center shrink-0">
                      <img src="/public/Logo.png" alt="Logo Rakamin " />
                    </div>
                    <div>
                      <Tag variant="filledSuccess">{currentJob.job_type}</Tag>
                      <h1 className="text-l-bold text-neutral-90">
                        {currentJob.title}
                      </h1>
                      <p className="text-m-regular text-neutral-70">Rakamin</p>
                    </div>
                  </div>
                  <Button variant="secondary">Apply</Button>
                </div>
              </div>

              {/* Job Description */}
              <div className="px-6 pb-6">
                <h2 className="text-l-bold text-neutral-90">Job Details</h2>
                <p className="text-m-regular text-neutral-70">
                  {currentJob.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <EmptyState
          img="/public/Empty State.png"
          headTitle="No job openings available"
          desc="We're sorry, but there are currently no job openings available."
        />
      )}
    </ApplicantLayout>
  );
};

export default JobListingPage;
