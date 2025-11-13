import { Button } from "@/components/common/Button";
import ApplicantLayout from "@/components/common/layout/ApplicantLayout";
import { supabase } from "@/supabase-client";
import { getCities } from "@/utils/getCities";
import { uploadImage } from "@/utils/uploadImage";
import { ArrowLeftIcon, ArrowUpTrayIcon } from "@heroicons/react/16/solid";
import { useEffect, useState } from "react";
import { useForm, type FieldValues } from "react-hook-form";
import { Navigate, useLocation, useNavigate } from "react-router";

const ResumePage = () => {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm({
    mode: "onSubmit",
    reValidateMode: "onChange",
  });
  const navigate = useNavigate();
  const [cities, setCities] = useState<string[]>([]);
  const [preview, setPreview] = useState<string | null>(null);
  const { state } = useLocation();
  const job_id = state?.job_id;
  const job_title = state?.job_title;

  const handleBack = () => {
    navigate("/applicant/job-listing");
  };

  const onSubmit = async (data: FieldValues) => {
    // console.log(data);

    let imageUrl: string | null = null;
    if (data.photo_profile[0]) {
      imageUrl = await uploadImage(data.photo_profile[0]);
    }

    const { error } = await supabase
      .from("candidates")
      .insert({
        job_id: job_id,
        attributes: [
          {
            key: "full_name",
            label: "Full name",
            value: data.full_name,
            order: 1,
          },
          {
            key: "photo_profile",
            label: "Photo Profile",
            value: imageUrl,
            order: 2,
          },
          {
            key: "gender",
            label: "Gender",
            value: data.gender,
            order: 3,
          },
          {
            key: "domicile",
            label: "Domicile",
            value: data.domicile,
            order: 4,
          },
          {
            key: "email",
            label: "Email",
            value: data.email,
            order: 5,
          },
          {
            key: "phone_number",
            label: "Phone number",
            value: data.phone_number,
            order: 6,
          },
          {
            key: "linkedin_link",
            label: "LinkedIn link",
            value: data.linkedin_link,
            order: 7,
          },
          {
            key: "date_of_birth",
            label: "Date of birth",
            value: data.date_of_birth,
            order: 8,
          },
        ],
      })
      .single();

    if (error) {
      console.log("Error adding job:", error);
      return;
    }

    navigate("/applicant/verified");
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file: File | undefined = e.target.files?.[0];
    const allowedTypes = ["image/jpeg", "image/png"];
    if (!file) return;

    if (file.size >= 2000000 || !allowedTypes.includes(file.type)) {
      setPreview("");
      return;
    }

    const newImage = URL.createObjectURL(file);

    setPreview(newImage);
  };

  useEffect(() => {
    getCities("JAWA BARAT").then((res) => setCities(res));
  }, []);

  if (!state) {
    return <Navigate to="/applicant/job-listing" />;
  }

  return (
    <ApplicantLayout>
      <div className="bg-neutral-10 shadow-sm border border-neutral-40 p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Button
              variant="neutral"
              className="cursor-pointer"
              onClick={handleBack}
            >
              <ArrowLeftIcon className="w-5 h-5" />
            </Button>
            <h2 className="text-l-bold">Apply {job_title} at Rakamin</h2>
          </div>
          <div className="flex items-center gap-2 text-s-regular text-neutral-90">
            <span>ℹ️This field required to fill</span>
          </div>
        </div>

        <p className="text-s-bold text-danger-main mb-6">* Required</p>

        <div className="space-y-6">
          <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
            {/* Photo Profile */}
            <div className="mb-4">
              <label className="block text-s-bold text-neutral-90 mb-2">
                Photo Profile
              </label>
              <div className="flex flex-col">
                <div className="w-32 h-32 rounded-full flex items-center justify-center mb-2 overflow-hidden">
                  {preview ? (
                    <img
                      src={preview}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <img src="/public/Avatar.png" alt="Avatar" />
                  )}
                </div>
                <label className="w-fit px-4 py-2 border border-neutral-40 rounded-lg cursor-pointer flex items-center gap-2">
                  <ArrowUpTrayIcon className="w-4 h-4" />
                  <span className="text-m-bold">Take a Picture</span>
                  <input
                    type="file"
                    {...register("photo_profile")}
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      handleImageUpload(e); // preview
                      register("image").onChange(e); // sync dengan RHF
                    }}
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
            <div className="mb-4">
              <label className="block mb-2 text-s-regular text-neutral-90">
                Full name
                <span className="text-danger-main">*</span>
              </label>

              <div className="relative flex items-center mb-2 border-2 border-neutral-40 rounded-lg bg-neutral-10">
                <input
                  type="text"
                  {...register("full_name")}
                  placeholder="Enter your full name"
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

            {/* Date of Birth - ini bisa pake library date picker nanti */}
            <div className="mb-4">
              <label className="block mb-2 text-s-regular text-neutral-90">
                Date of birth
                <span className="text-danger-main">*</span>
              </label>

              <div className="relative flex items-center mb-2 border-2 border-neutral-40 rounded-lg bg-neutral-10">
                <input
                  type="date"
                  {...register("date_of_birth")}
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

            {/* Pronoun */}
            <div className="mb-4">
              <label className="block mb-2 text-s-regular text-neutral-90">
                Pronoun (gender)<span className="text-red-500">*</span>
              </label>
              <div className="flex gap-6">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    {...register("gender")}
                    value="female"
                    className="w-4 h-4 text-teal-500"
                  />
                  <span className="text-sm">She/her (Female)</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    {...register("gender")}
                    value="male"
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
            <div className="mb-4">
              <label className="block mb-2 text-s-regular text-neutral-90">
                Domicile<span className="text-danger-main">*</span>
              </label>
              <div className="relative">
                <select
                  {...register("domicile")}
                  className="w-full py-2 px-4
                      focus:outline-none  border-2 border-neutral-40 rounded-lg bg-neutral-10"
                  defaultValue=""
                >
                  <option value="" disabled>
                    Choose your domicile
                  </option>
                  {cities.map((city) => (
                    <option key={city} value={city}>
                      {city}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Phone Number */}
            <div className="mb-4">
              <label className="block mb-2 text-s-regular text-neutral-90">
                Phone number<span className="text-danger-main">*</span>
              </label>
              <div className="flex gap-2 border-2 border-neutral-40 rounded-lg bg-neutral-10">
                <div className="flex items-center gap-2 px-3 py-3 ">
                  <span className="text-2xl">🇮🇩</span>
                  <span className="text-sm">+62</span>
                </div>
                <input
                  type="tel"
                  {...register("phone_number")}
                  placeholder="81XXXXXXXXX"
                  className="w-full py-2 px-4
                      bg-transparent focus:outline-none placeholder-neutral-60"
                />
              </div>
              {/* {errors.phoneNumber && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.phoneNumber}
                  </p>
                )} */}
            </div>

            {/* Email */}
            <div className="mb-4">
              <label className="block mb-2 text-s-regular text-neutral-90">
                Email
                <span className="text-danger-main">*</span>
              </label>

              <div className="relative flex items-center mb-2 border-2 border-neutral-40 rounded-lg bg-neutral-10">
                <input
                  type="text"
                  {...register("email")}
                  placeholder="Enter your email address"
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

            {/* LinkedIn */}
            <div className="mb-4">
              <label className="block mb-2 text-s-regular text-neutral-90">
                Link LinkedIn
                <span className="text-danger-main">*</span>
              </label>

              <div className="relative flex items-center mb-2 border-2 border-neutral-40 rounded-lg bg-neutral-10">
                <input
                  type="text"
                  {...register("linkedin_link")}
                  placeholder="https://linkedin.com/in/username"
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

            {/* Submit Button */}
            <Button
              size="lg"
              width="full"
              className="cursor-pointer"
              disabled={isSubmitting}
            >
              Submit
            </Button>
          </form>
        </div>
      </div>
    </ApplicantLayout>
  );
};

export default ResumePage;
