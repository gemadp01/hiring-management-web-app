import { Button } from "@/components/common/Button";
import { CallToActionCard } from "@/components/common/CallToActionCard";
import { EmptyState } from "@/components/common/EmptyState";
import InputLayout from "@/components/common/form/InputLayout";
import AdminLayout from "@/components/common/layout/AdminLayout";
import { ModalBase } from "@/components/common/modals/ModalBase";
import { ModalFooter } from "@/components/common/modals/ModalFooter";
import { Tag } from "@/components/common/Tag";
import { Toast } from "@/components/common/Toast";
import { supabase } from "@/supabase-client";
import type { TJob } from "@/types/jobType";
import { formatPrice } from "@/utils/formatPrice";
import {
  ExclamationTriangleIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { useCallback, useEffect, useState } from "react";
import { useForm, type FieldValues } from "react-hook-form";
import { Link } from "react-router";

// type ProfileForm = {
//   // --- Informasi pekerjaan ---
//   title: string;
//   job_type: string;
//   description: string;
//   candidate_needed: string;
//   min_salary: string;
//   max_salary: string;
//   started_on: string;
//   status: string;

//   // --- Profile requirements ---
//   full_name: "mandatory" | "optional" | "off";
//   photo_profile: "mandatory" | "optional" | "off";
//   gender: "mandatory" | "optional" | "off";
//   domicile: "mandatory" | "optional" | "off";
//   email: "mandatory" | "optional" | "off";
//   phone_number: "mandatory" | "optional" | "off";
//   linkedin_link: "mandatory" | "optional" | "off";
//   date_of_birth: "mandatory" | "optional" | "off";
// };

// const profilLabels: Record<string, string> = {
//   full_name: "Full name",
//   photo_profile: "Photo Profile",
//   gender: "Gender",
//   domicile: "Domicile",
//   email: "Email",
//   phone_number: "Phone number",
//   linkedin_link: "LinkedIn link",
//   date_of_birth: "Date of birth",
// };

const JobListPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    // reset,
  } = useForm({
    mode: "onSubmit",
    reValidateMode: "onChange",
  });
  const [toast, setToast] = useState(false);
  const [errorServer, setErrorServer] = useState<string | null>(null);
  const [jobs, setJobs] = useState<TJob[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredJobs = jobs.filter((job) =>
    job.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCreateJob = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  const fetchJobs = async () => {
    const { data, error } = await supabase
      .from("jobs")
      .select("*")
      .order("created_at", { ascending: true });

    if (error) {
      console.log("Error fetching jobs:", error);
      return;
    }

    setJobs(data);
  };

  const handlePublish = async (data: FieldValues) => {
    const { error } = await supabase
      .from("jobs")
      .insert([
        {
          title: data.title,
          slug: `${data.title.replace(/\s+/g, "-").toLowerCase()}`,
          job_type: data.job_type,
          description: data.description,
          candidate_needed: data.candidate_needed,
          started_on: data.started_on,
          status: data.status,
          // kolom JSONB
          salary_range: {
            currency: "IDR",
            max_salary: data.max_salary,
            min_salary: data.min_salary,
            display_text: `${formatPrice(data.min_salary)} - ${formatPrice(
              data.max_salary
            )}`,
          },
          list_card: {
            badge: data.status,
            started_on_text: `started on ${data.started_on}`,
            cta: "Manage Job",
          },
        },
      ])
      .single();

    if (error) {
      console.log("Error adding job:", error);
      setErrorServer(error.message);
      return;
    }

    setIsModalOpen(false);
    setToast(true);
    // reset();
  };

  useEffect(() => {
    fetchJobs();
  }, [toast]);

  return (
    <>
      {toast && (
        <Toast
          message="Job created successfully!"
          onClose={() => setToast(false)}
        />
      )}
      <AdminLayout headTitle={<h1 className="text-l-bold">Job List</h1>}>
        <div className="flex gap-6">
          {/* Left Section - Search and Empty State */}
          <div className="flex-1">
            {/* Search Bar */}
            <div className="mb-8">
              <div className="relative">
                <InputLayout
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  type="text"
                  placeholder="Search by job details"
                />
              </div>
            </div>

            {/* Job Cards */}
            {jobs.length > 0 ? (
              <div className="space-y-4">
                {filteredJobs.map((job) => (
                  <div
                    key={job.id}
                    className="bg-neutral-10 rounded-2xl shadow-[0_4px_8px_0_rgba(0,0,0,0.1)] p-6 "
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <Tag
                            variant={
                              job.status === "Active"
                                ? "outlineSuccess"
                                : job.status === "Inactive"
                                ? "outlineDanger"
                                : "outlineSecondary"
                            }
                            size="md"
                          >
                            {job.status}
                          </Tag>
                          <span className="rounded-sm border border-neutral-40 py-1 px-4 text-m-regular text-neutral-90">
                            started on {job.started_on}
                          </span>
                        </div>

                        <h3 className="text-l-bold mb-2">{job.title}</h3>

                        <div className="flex justify-between items-center">
                          <p className="text-l-regular text-neutral-80">
                            {job.salary_range.display_text}
                          </p>
                          <Link
                            to={`/admin/manage-job/${job.slug}`}
                            className="px-4 py-1 text-s-bold bg-primary-main text-neutral-10 flex items-center justify-center rounded-[8px] font-bold shadow-[0_1px_2px_0_rgba(0,0,0,0.12)]"
                          >
                            {job.list_card.cta}
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <EmptyState
                img="/public/Empty State.png"
                headTitle="No job openings available"
                desc="Create a job opening now and start the candidate process."
              >
                <div className="w-full flex justify-center">
                  <Button
                    size="lg"
                    variant="secondary"
                    onClick={handleCreateJob}
                  >
                    Create a new job
                  </Button>
                </div>
              </EmptyState>
            )}
          </div>

          {/* Right Section - CTA Card */}
          <div className="hidden md:block md:w-80">
            <CallToActionCard
              headTitle="Recruit the best candidates"
              desc="Create jobs, invite, and hire with ease"
              img="/public/bg-cta-card-admin.jpg"
            >
              <Button width="full" onClick={handleCreateJob}>
                Create a new job
              </Button>
            </CallToActionCard>
          </div>
        </div>

        {/* Modal */}

        <ModalBase
          headTitle="Job Opening"
          isOpen={isModalOpen}
          handleCloseModal={handleCloseModal}
          icon={XMarkIcon}
        >
          {errorServer && (
            <div className="flex justify-center items-center">
              <ExclamationTriangleIcon className="w-5 h-5 text-danger-main mr-2" />
              <p className="text-center text-danger-main">{errorServer}</p>
            </div>
          )}
          <form onSubmit={handleSubmit(handlePublish)}>
            <div className="flex-1 overflow-y-auto p-6">
              {/* Job Name */}
              <div className="mb-4">
                <label className="block mb-2 text-s-regular text-neutral-90">
                  Job Name
                  <span className="text-danger-main">*</span>
                </label>

                <div className="relative flex items-center mb-2 border-2 border-neutral-40 rounded-lg bg-neutral-10">
                  <input
                    type="text"
                    {...register("title")}
                    placeholder="Ex. Front End Engineer"
                    className="w-full py-2 px-4
                      bg-transparent focus:outline-none placeholder-neutral-60"
                  />
                </div>

                {/* Helper Message and Counter */}
                {/* {errors.title && (
                    <div
                      className={`flex items-center justify-between mt-2 text-s-regular ${
                        errors.title ? "text-danger-main" : "text-neutral-70"
                      }`}
                    >
                      <span className="flex items-center">
                        {errors.title.message}
                      </span>
                    </div>
                  )} */}
              </div>

              {/* Job Type */}
              <div className="mb-4">
                <label className="block mb-2 text-s-regular text-neutral-90">
                  Job Type<span className="text-danger-main">*</span>
                </label>
                <div className="relative">
                  <select
                    {...register("job_type")}
                    className="w-full py-2 px-4
                      focus:outline-none  border-2 border-neutral-40 rounded-lg bg-neutral-10"
                    defaultValue=""
                  >
                    <option value="" disabled>
                      Select job type
                    </option>
                    <option value="Full-time">Full Time</option>
                    <option value="Part-time">Part Time</option>
                    <option value="Contract">Contract</option>
                    <option value="Internship">Internship</option>
                    <option value="Freelance">Freelance</option>
                  </select>
                </div>
              </div>

              {/* Job Description */}
              <div className="mb-4">
                <label className="block mb-2 text-s-regular text-neutral-90">
                  Job Description<span className="text-danger-main">*</span>
                </label>
                <textarea
                  placeholder="Ex."
                  {...register("description")}
                  rows={4}
                  className="w-full py-2 px-4
                      focus:outline-none  border-2 border-neutral-40 rounded-lg bg-neutral-10"
                />
              </div>

              {/* Number of Candidate Needed */}
              <div className="mb-4">
                <label className="block mb-2 text-s-regular text-neutral-90">
                  Number of Candidate Needed
                  <span className="text-danger-main">*</span>
                </label>

                <div className="relative flex items-center mb-2 border-2 border-neutral-40 rounded-lg bg-neutral-10">
                  <input
                    type="number"
                    {...register("candidate_needed")}
                    placeholder="Ex. 2"
                    className="w-full py-2 px-4
                      bg-transparent focus:outline-none placeholder-neutral-60"
                  />
                </div>

                {/* Helper Message and Counter */}
                {/* <div
                    className={`flex items-center justify-between mt-2 text-s-regular ${
                      errorMessage ? "text-danger-main" : "text-neutral-70"
                    }`}
                  >
                    <span className="flex items-center">helper message</span>
                  </div> */}
              </div>

              {/* Job Salary */}
              <div className="mb-4">
                <label className="block text-s-regular mb-4 text-neutral-90">
                  Job Salary
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <div className="mb-4">
                    <label className="block mb-2 text-s-regular text-neutral-90">
                      Minimum Estimated Salary
                      <span className="text-danger-main">*</span>
                    </label>

                    <div className="relative flex items-center mb-2 border-2 border-neutral-40 rounded-lg bg-neutral-10">
                      <div className="flex items-center justify-center pl-4 py-3 font-bold">
                        Rp
                      </div>
                      <input
                        type="number"
                        {...register("min_salary")}
                        placeholder="7.000.000"
                        className="w-full py-2 px-4
                      bg-transparent focus:outline-none placeholder-neutral-60"
                      />
                    </div>

                    {/* Helper Message and Counter */}
                    {/* <div
                    className={`flex items-center justify-between mt-2 text-s-regular ${
                      errorMessage ? "text-danger-main" : "text-neutral-70"
                    }`}
                  >
                    <span className="flex items-center">helper message</span>
                  </div> */}
                  </div>

                  <div className="mb-4">
                    <label className="block mb-2 text-s-regular text-neutral-90">
                      Maximum Estimated Salary
                      <span className="text-danger-main">*</span>
                    </label>

                    <div className="relative flex items-center mb-2 border-2 border-neutral-40 rounded-lg bg-neutral-10">
                      <div className="flex items-center justify-center pl-4 py-3 font-bold">
                        Rp
                      </div>
                      <input
                        type="number"
                        {...register("max_salary")}
                        placeholder="8.000.000"
                        className="w-full py-2 px-4
                      bg-transparent focus:outline-none placeholder-neutral-60"
                      />
                    </div>

                    {/* Helper Message and Counter */}
                    {/* <div
                    className={`flex items-center justify-between mt-2 text-s-regular ${
                      errorMessage ? "text-danger-main" : "text-neutral-70"
                    }`}
                  >
                    <span className="flex items-center">helper message</span>
                  </div> */}
                  </div>
                </div>
              </div>

              {/* Started on */}
              <div className="mb-4">
                <label className="block mb-2 text-s-regular text-neutral-90">
                  Started on
                  <span className="text-danger-main">*</span>
                </label>

                <div className="relative flex items-center mb-2 border-2 border-neutral-40 rounded-lg bg-neutral-10">
                  <input
                    type="date"
                    {...register("started_on")}
                    className="w-full py-2 px-4
                      bg-transparent focus:outline-none placeholder-neutral-60"
                  />
                </div>

                {/* Helper Message and Counter */}
                {/* <div
                    className={`flex items-center justify-between mt-2 text-s-regular ${
                      errorMessage ? "text-danger-main" : "text-neutral-70"
                    }`}
                  >
                    <span className="flex items-center">helper message</span>
                  </div> */}
              </div>

              {/* Job Type */}
              <div className="mb-4">
                <label className="block mb-2 text-s-regular text-neutral-90">
                  Job Status<span className="text-danger-main">*</span>
                </label>
                <div className="relative">
                  <select
                    {...register("status")}
                    className="w-full py-2 px-4
                      focus:outline-none  border-2 border-neutral-40 rounded-lg bg-neutral-10"
                    defaultValue=""
                  >
                    <option value="" disabled>
                      Select job status
                    </option>
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                    <option value="Draft">Draft</option>
                  </select>
                </div>
              </div>

              {/* Minimum Profile Information Required */}
              {/* <div className="rounded-lg border border-neutral-30 m-4 p-4 bg-neutral-10">
                  <h3 className="text-m-bold mb-4">
                    Minimum Profile Information Required
                  </h3>

                  {Object.keys(profilLabels).map((key) => {
                    const fieldKey = key as keyof ProfileForm;
                    const currentValue = watch(fieldKey);

                    return (
                      <div
                        key={key}
                        className="mx-6 flex items-center justify-between py-3 border-b border-neutral-30"
                      >
                        <span className="text-m-regular text-neutral-90">
                          {profilLabels[key]}
                        </span>
                        <div className="flex gap-2">
                          <label className="flex items-center cursor-pointer">
                            <input
                              type="radio"
                              {...register(key as never)}
                              value="mandatory"
                              className="sr-only"
                            />
                            <span
                              className={`px-4 py-1 rounded-full text-sm font-medium transition-all ${
                                currentValue === "mandatory"
                                  ? "bg-teal-500 text-white border-2 border-teal-500"
                                  : "bg-white text-teal-600 border-2 border-teal-500"
                              }`}
                            >
                              Mandatory
                            </span>
                          </label>

                          <label className="flex items-center cursor-pointer">
                            <input
                              type="radio"
                              {...register(key as never)}
                              value="optional"
                              className="sr-only"
                            />
                            <span
                              className={`px-4 py-1 rounded-full text-sm font-medium transition-all ${
                                currentValue === "optional"
                                  ? "bg-gray-300 text-gray-700 border-2 border-gray-300"
                                  : "bg-white text-gray-500 border-2 border-gray-300"
                              }`}
                            >
                              Optional
                            </span>
                          </label>

                          <label className="flex items-center cursor-pointer">
                            <input
                              type="radio"
                              {...register(key as never)}
                              value="off"
                              className="sr-only"
                            />
                            <span
                              className={`px-4 py-1 rounded-full text-sm font-medium transition-all ${
                                currentValue === "off"
                                  ? "bg-gray-300 text-gray-700 border-2 border-gray-300"
                                  : "bg-white text-gray-500 border-2 border-gray-300"
                              }`}
                            >
                              Off
                            </span>
                          </label>
                        </div>
                      </div>
                    );
                  })}
                </div> */}
            </div>

            {/* Modal Footer */}
            <ModalFooter>
              <Button disabled={isSubmitting}>Publish Job</Button>
            </ModalFooter>
          </form>
        </ModalBase>
      </AdminLayout>
    </>
  );
};

export default JobListPage;
