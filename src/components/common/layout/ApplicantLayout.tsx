import { ApplicantPage } from "@/components/guard/ApplicantPage";
import { UserIcon } from "@heroicons/react/16/solid";

type TApplicantLayout = {
  children: React.ReactNode;
};

const ApplicantLayout = ({ children }: TApplicantLayout) => {
  return (
    <ApplicantPage>
      <div className="min-h-screen">
        {/* Header */}
        <header className="bg-neutral-10 border-b border-neutral-10 shadow-[0_1px_2px_0_rgba(0,0,0,0.12)] px-6 py-4">
          <div className="max-w-7xl mx-auto flex justify-end">
            {/* <div className="text-2xl font-bold text-teal-600">JobPortal</div> */}
            <button className="w-7 h-7 rounded-full flex items-center justify-center border border-neutral-40">
              <UserIcon className="w-5 h-5 text-neutral-90" />
            </button>
          </div>
        </header>

        <div className="max-w-7xl mx-auto px-6 py-8">{children}</div>
      </div>
    </ApplicantPage>
  );
};

export default ApplicantLayout;
