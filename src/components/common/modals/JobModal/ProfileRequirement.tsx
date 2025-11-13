const profilRequirements: Record<string, string> = {
  fullName: "mandatory",
  photoProfile: "mandatory",
  gender: "mandatory",
  domicile: "mandatory",
  email: "mandatory",
  phoneNumber: "mandatory",
  linkedinLink: "mandatory",
  dateOfBirth: "mandatory",
};
export const ProfileRequirement = () => {
  return (
    <>
      {Object.entries(profilRequirements).map(([key, value]) => {
        const labels: Record<string, string> = {
          fullName: "Full name",
          photoProfile: "Photo Profile",
          gender: "Gender",
          domicile: "Domicile",
          email: "Email",
          phoneNumber: "Phone number",
          linkedinLink: "LinkedIn link",
          dateOfBirth: "Date of birth",
        };

        return (
          <div
            key={key}
            className="mx-6 flex items-center justify-between py-3 border-b border-neutral-30"
          >
            <span className="text-m-regular text-neutral-90">
              {labels[key]}
            </span>
            <div className="flex gap-2">
              <input
                type="radio"
                value=""
                className={`px-4 py-1 rounded-full text-sm font-medium transition-all ${
                  value === "mandatory"
                    ? "bg-teal-500 text-white border-2 border-teal-500"
                    : "bg-white text-teal-600 border-2 border-teal-500"
                }`}
              >
                Mandatory
              </input>
              <input
                className={`px-4 py-1 rounded-full text-sm font-medium transition-all ${
                  value === "optional"
                    ? "bg-gray-300 text-gray-700 border-2 border-gray-300"
                    : "bg-white text-gray-500 border-2 border-gray-300"
                }`}
              >
                Optional
              </input>
              <input
                className={`px-4 py-1 rounded-full text-sm font-medium transition-all ${
                  value === "off"
                    ? "bg-gray-300 text-gray-700 border-2 border-gray-300"
                    : "bg-white text-gray-500 border-2 border-gray-300"
                }`}
              >
                Off
              </input>
            </div>
          </div>
        );
      })}
    </>
  );
};
