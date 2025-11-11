import { Button } from "@/components/common/Button";
import InputLayout from "@/components/common/form/InputLayout";
import AdminLayout from "@/components/common/layout/AdminLayout";
import { ProfileRequirement } from "@/components/common/modals/JobModal/ProfileRequirement";
import { ModalBase } from "@/components/common/modals/ModalBase";
import { ModalFooter } from "@/components/common/modals/ModalFooter";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

const JobListPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    jobName: "",
    jobType: "",
    jobDescription: "",
    candidateNeeded: "",
    minSalary: "",
    maxSalary: "",
    profileRequirements: {
      fullName: "mandatory",
      photoProfile: "mandatory",
      gender: "mandatory",
      domicile: "mandatory",
      email: "mandatory",
      phoneNumber: "mandatory",
      linkedinLink: "mandatory",
      dateOfBirth: "mandatory",
    },
  });

  const handleCreateJob = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleRequirementChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      profileRequirements: {
        ...prev.profileRequirements,
        [field]: value,
      },
    }));
  };

  const handlePublish = () => {
    console.log("Publishing job:", formData);
    alert("Job published successfully!");
    setIsModalOpen(false);
  };

  return (
    <>
      <AdminLayout headTitle="Job List">
        <div className="flex gap-6">
          {/* Left Section - Search and Empty State */}
          <div className="flex-1">
            {/* Search Bar */}
            <div className="mb-8">
              <div className="relative">
                <InputLayout type="text" placeholder="Search by job details" />
              </div>
            </div>

            {/* Empty State */}
            <div className="bg-white p-12 text-center">
              {/* Illustration */}
              <div className="mb-4 flex justify-center">
                <img src="/public/Empty State.png" />
              </div>
              {/* Text */}
              <h2 className="text-heading-s-bold text-neutral-90 mb-1">
                No job openings available
              </h2>
              <p className="text-l-regular text-neutral-90 mb-4">
                Create a job opening now and start the candidate process.
              </p>

              {/* Button */}
              <div className="w-full flex justify-center">
                <Button variant="secondary" onClick={handleCreateJob}>
                  Create a new job
                </Button>
              </div>
            </div>
          </div>

          {/* Right Section - CTA Card */}
          <div className="hidden md:block md:w-80">
            <div className="rounded-2xl p-8 text-white shadow-xl sticky top-8 bg-[url('/public/bg-cta-card-admin.jpg')] bg-cover">
              {/* Background */}
              <div className="absolute inset-0 bg-[rgba(0,0,0,0.72)] rounded-2xl"></div>
              <div className="relative mb-6 z-10">
                <h3 className="text-l-bold mb-1 text-neutral-40">
                  Recruit the best candidates
                </h3>
                <p className="text-m-bold text-neutral-10">
                  Create jobs, invite, and hire with ease
                </p>
              </div>

              <div className="relative w-full z-10">
                <Button width="full" onClick={handleCreateJob}>
                  Create a new job
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Modal */}
        {isModalOpen && (
          <ModalBase
            headTitle="Job Opening"
            isOpen={isModalOpen}
            handleCloseModal={handleCloseModal}
            icon={XMarkIcon}
          >
            <div className="flex-1 overflow-y-auto p-6">
              {/* Job Name */}
              <InputLayout
                label="Job Name"
                inputRequired={true}
                type="text"
                placeholder="Ex. Front End Engineer"
              />

              {/* Job Type */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Job Type<span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <select
                    value={formData.jobType}
                    onChange={(e) =>
                      handleInputChange("jobType", e.target.value)
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 appearance-none bg-white"
                  >
                    <option value="">Select job type</option>
                    <option value="full-time">Full Time</option>
                    <option value="part-time">Part Time</option>
                    <option value="contract">Contract</option>
                    <option value="internship">Internship</option>
                  </select>
                </div>
              </div>

              {/* Job Description */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Job Description<span className="text-red-500">*</span>
                </label>
                <textarea
                  placeholder="Ex."
                  value={formData.jobDescription}
                  onChange={(e) =>
                    handleInputChange("jobDescription", e.target.value)
                  }
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 resize-none"
                />
              </div>

              {/* Number of Candidate Needed */}
              <InputLayout
                label="Number of Candidate Needed"
                inputRequired={true}
                type="number"
                placeholder="Ex. 2"
              />

              {/* Job Salary */}
              <div className="mb-4">
                <label className="block text-s-regular mb-4 text-neutral-90">
                  Job Salary
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <InputLayout
                    label="Minimum Estimated Salary"
                    type="number"
                    placeholder="7.000.000"
                    inputIconSupport="Rp"
                  />
                  <InputLayout
                    label="Maximum Estimated Salary"
                    type="number"
                    placeholder="8.000.000"
                    inputIconSupport="Rp"
                  />
                </div>
              </div>

              {/* Minimum Profile Information Required */}
              <div className="rounded-lg border border-neutral-30 m-4 p-4 bg-neutral-10">
                <h3 className="text-m-bold mb-4">
                  Minimum Profile Information Required
                </h3>

                <ProfileRequirement
                  profilRequirements={formData.profileRequirements}
                  handleRequirementChange={handleRequirementChange}
                />
              </div>
            </div>

            {/* Modal Footer */}
            <ModalFooter>
              <Button onClick={handlePublish}>Publish Job</Button>
            </ModalFooter>
          </ModalBase>
        )}
      </AdminLayout>
    </>
  );
};

export default JobListPage;
