import { Button } from "@/components/common/Button";
import { EmptyState } from "@/components/common/EmptyState";
import ApplicantLayout from "@/components/common/layout/ApplicantLayout";
import { Tag } from "@/components/common/Tag";
import { UserIcon } from "@heroicons/react/16/solid";
import {
  ArrowLeftIcon,
  ArrowUpTrayIcon,
  BanknotesIcon,
  MapPinIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";

const JobListingPage = () => {
  const [selectedJob, setSelectedJob] = useState(0);
  const [showApplicationForm, setShowApplicationForm] = useState(false);
  const [isApplied, setIsApplied] = useState(false);

  type Job = {
    id: number;
    title: string;
    company: string;
    location: string;
    salary: string;
    type: string;
    description: string[];
  };

  const jobs: Job[] | null = [
    {
      id: 1,
      title: "UX Designer",
      company: "Rakamin",
      location: "Jakarta Selatan",
      salary: "Rp7.000.000 - Rp15.000.000",
      type: "Full-Time",
      description: [
        "Develop, test, and maintain responsive, high-performance web applications using modern front-end technologies.",
        "Collaborate with UI/UX designers to translate wireframes and prototypes into functional code.",
        "Integrate front-end components with APIs and backend services.",
        "Ensure cross-browser compatibility and optimize applications for maximum speed and scalability.",
        "Write clean, reusable, and maintainable code following best practices and coding standards.",
        "Participate in code reviews, contributing to continuous improvement and knowledge sharing.",
        "Troubleshoot and debug issues to improve usability and overall application quality.",
        "Stay updated with emerging front-end technologies and propose innovative solutions.",
        "Collaborate in Agile/Scrum ceremonies, contributing to sprint planning, estimation, and retrospectives.",
      ],
    },
    // {
    //   id: 2,
    //   title: "Frontend Developer",
    //   company: "Rakamin",
    //   location: "Jakarta Pusat",
    //   salary: "Rp8.000.000 - Rp16.000.000",
    //   type: "Full-Time",
    //   description: [
    //     "Build and maintain scalable web applications using React and TypeScript.",
    //     "Work closely with backend developers to integrate RESTful APIs.",
    //     "Implement responsive designs and ensure mobile compatibility.",
    //     "Optimize application performance and loading times.",
    //     "Write unit tests and ensure code quality through peer reviews.",
    //   ],
    // },
    // {
    //   id: 3,
    //   title: "UI/UX Designer",
    //   company: "Rakamin",
    //   location: "Jakarta Selatan",
    //   salary: "Rp6.500.000 - Rp14.000.000",
    //   type: "Full-Time",
    //   description: [
    //     "Create user-centered designs by understanding business requirements and user feedback.",
    //     "Design user interfaces for web and mobile applications.",
    //     "Conduct user research and evaluate user feedback.",
    //     "Create wireframes, storyboards, user flows, and prototypes.",
    //     "Collaborate with developers to ensure designs are implemented correctly.",
    //   ],
    // },
  ];

  const currentJob = jobs[selectedJob];

  const handleSubmit = () => {};

  const handleApply = () => {
    setShowApplicationForm(true);
  };

  const handleBack = () => {
    setShowApplicationForm(false);
  };

  // Application Form Component
  if (showApplicationForm) {
    return (
      <ApplicantLayout>
        <div className="bg-neutral-10 shadow-sm border border-neutral-40 p-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <Button variant="neutral" onClick={handleBack}>
                <ArrowLeftIcon className="w-5 h-5" />
              </Button>
              <h2 className="text-l-bold">
                Apply Front End at {currentJob.company}
              </h2>
            </div>
            <div className="flex items-center gap-2 text-s-regular text-neutral-90">
              <span>ℹ️This field required to fill</span>
            </div>
          </div>

          <p className="text-s-bold text-danger-main mb-6">* Required</p>

          <div className="space-y-6">
            {/* Photo Profile */}
            <div>
              <label className="block text-s-bold text-neutral-90 mb-2">
                Photo Profile
              </label>
              <div className="flex flex-col">
                <div className="w-32 h-32 rounded-full flex items-center justify-center mb-2 overflow-hidden">
                  {/* {profileImage ? (
                      <img
                        src={profileImage}
                        alt="Profile"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <User className="w-16 h-16 text-blue-600" />
                    )} */}
                  <img src="/public/Avatar.png" alt="Avatar" />
                </div>
                <label className="w-fit px-4 py-2 border border-neutral-40 rounded-lg cursor-pointer flex items-center gap-2">
                  <ArrowUpTrayIcon className="w-4 h-4" />
                  <span className="text-m-bold">Take a Picture</span>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    // onChange={handleImageUpload}
                  />
                </label>
                {/* {errors.profileImage && (
                    <p className="text-red-500 text-xs mt-2">
                      {errors.profileImage}
                    </p>
                  )} */}
              </div>
            </div>

            {/* Full Name */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Full name<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="fullName"
                // value={formData.fullName}
                // onChange={handleInputChange}
                placeholder="Enter your full name"
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 `}
              />
              {/* {errors.fullName && (
                  <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>
                )} */}
            </div>

            {/* Date of Birth */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Date of birth<span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="date"
                  name="dateOfBirth"
                  // value={formData.dateOfBirth}
                  // onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 `}
                />
                {/* <Calendar className="absolute right-3 top-3.5 w-5 h-5 text-gray-400 pointer-events-none" /> */}
              </div>
              {/* {errors.dateOfBirth && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.dateOfBirth}
                  </p>
                )} */}
            </div>

            {/* Pronoun */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Pronoun (gender)<span className="text-red-500">*</span>
              </label>
              <div className="flex gap-6">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="pronoun"
                    value="female"
                    // checked={formData.pronoun === "female"}
                    // onChange={handleInputChange}
                    className="w-4 h-4 text-teal-500"
                  />
                  <span className="text-sm">She/her (Female)</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="pronoun"
                    value="male"
                    // checked={formData.pronoun === "male"}
                    // onChange={handleInputChange}
                    className="w-4 h-4 text-teal-500"
                  />
                  <span className="text-sm">He/him (Male)</span>
                </label>
              </div>
              {/* {errors.pronoun && (
                  <p className="text-red-500 text-xs mt-1">{errors.pronoun}</p>
                )} */}
            </div>

            {/* Domicile */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Domicile<span className="text-red-500">*</span>
              </label>
              <select
                name="domicile"
                // value={formData.domicile}
                // onChange={handleInputChange}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500`}
              >
                <option value="">Choose your domicile</option>
                <option value="Jakarta">Jakarta</option>
                <option value="Bandung">Bandung</option>
                <option value="Surabaya">Surabaya</option>
                <option value="Yogyakarta">Yogyakarta</option>
                <option value="Other">Other</option>
              </select>
              {/* {errors.domicile && (
                  <p className="text-red-500 text-xs mt-1">{errors.domicile}</p>
                )} */}
            </div>

            {/* Phone Number */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Phone number<span className="text-red-500">*</span>
              </label>
              <div className="flex gap-2">
                <div className="flex items-center gap-2 px-3 py-3 border border-gray-300 rounded-lg bg-gray-50">
                  <span className="text-2xl">🇮🇩</span>
                  <span className="text-sm">+62</span>
                </div>
                <input
                  type="tel"
                  name="phoneNumber"
                  // value={formData.phoneNumber}
                  // onChange={handleInputChange}
                  placeholder="81XXXXXXXXX"
                  className={`flex-1 px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500`}
                />
              </div>
              {/* {errors.phoneNumber && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.phoneNumber}
                  </p>
                )} */}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Email<span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                name="email"
                // value={formData.email}
                // onChange={handleInputChange}
                placeholder="Enter your email address"
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500`}
              />
              {/* {errors.email && (
                  <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                )} */}
            </div>

            {/* LinkedIn */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Link Linkedin<span className="text-red-500">*</span>
              </label>
              <input
                type="url"
                name="linkedin"
                // value={formData.linkedin}
                // onChange={handleInputChange}
                placeholder="https://linkedin.com/in/username"
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500`}
              />
              {/* {errors.linkedin && (
                  <p className="text-red-500 text-xs mt-1">{errors.linkedin}</p>
                )} */}
            </div>

            {/* Submit Button */}
            <Button size="lg" width="full" onClick={handleSubmit}>
              {/* {submitted ? "✓ Submitted Successfully!" : "Submit"} */}
              Submit
            </Button>
          </div>
        </div>
      </ApplicantLayout>
    );
  }

  return (
    <ApplicantLayout>
      {jobs.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Sidebar - Job List */}
          <div className="lg:col-span-1 space-y-4">
            {jobs.map((job, index) => (
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
                      {job.company}
                    </p>
                  </div>
                </div>
                <div className="flex items-center text-s-regular text-neutral-80 mb-2">
                  <MapPinIcon className="w-4 h-4 mr-1" />
                  <span>{job.location}</span>
                </div>

                <div className="flex items-center text-s-regular text-neutral-80">
                  <BanknotesIcon className="w-4 h-4 mr-1" />
                  <span>{job.salary}</span>
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
                      <Tag variant="filledSuccess">{currentJob.type}</Tag>
                      <h1 className="text-l-bold text-neutral-90">
                        {currentJob.title}
                      </h1>
                      <p className="text-m-regular text-neutral-70">
                        {currentJob.company}
                      </p>
                    </div>
                  </div>
                  <Button variant="secondary" onClick={handleApply}>
                    {isApplied ? "✓ Applied" : "Apply"}
                  </Button>
                </div>
              </div>

              {/* Job Description */}
              <div className="px-6">
                <ul>
                  {currentJob.description.map((item, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-3 text-m-regular text-neutral-90 "
                    >
                      <span className="w-1.5 h-1.5 bg-neutral-100 rounded-full mt-2 shrink-0 translate-y-0.5"></span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
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
