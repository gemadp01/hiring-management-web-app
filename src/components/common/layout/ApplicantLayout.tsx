import { UserDropdown } from "@/components/common/UserDropdown";
import { ApplicantPage } from "@/components/guard/ApplicantPage";
import { userLogout } from "@/store/features/user/userSlice";
import { useAppDispatch } from "@/store/hooks";
import { supabase } from "@/supabase-client";
import { Link, useNavigate } from "react-router";

type TApplicantLayout = {
  children: React.ReactNode;
};

const ApplicantLayout = ({ children }: TApplicantLayout) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleLogOut = async () => {
    localStorage.removeItem("current-user");
    await supabase.auth.signOut();
    dispatch(userLogout());
    navigate("/login");
  };

  return (
    <ApplicantPage>
      <div className="min-h-screen">
        {/* Header */}
        <header className="bg-neutral-10 border-b border-neutral-10 shadow-[0_1px_2px_0_rgba(0,0,0,0.12)] px-6 py-4">
          <div className="max-w-7xl mx-auto flex justify-end">
            {/* <div className="text-2xl font-bold text-teal-600">JobPortal</div> */}
            <UserDropdown onLogout={handleLogOut}>
              <Link
                to="/applicant/job-listing"
                className="text-l-bold cursor-pointer hover:opacity-80"
              >
                Job List
              </Link>
            </UserDropdown>
          </div>
        </header>

        <div className="max-w-7xl mx-auto px-6 py-8">{children}</div>
      </div>
    </ApplicantPage>
  );
};

export default ApplicantLayout;
