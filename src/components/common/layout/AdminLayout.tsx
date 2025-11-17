import { UserDropdown } from "@/components/common/UserDropdown";
import { supabase } from "@/supabase-client";
import { Link, useNavigate } from "react-router";

type TAdminLayoutProps = {
  headTitle: React.ReactNode;
  children: React.ReactNode;
};

function AdminLayout({ headTitle, children }: TAdminLayoutProps) {
  const navigate = useNavigate();

  const handleLogOut = async () => {
    localStorage.removeItem("current-user");
    await supabase.auth.signOut();
    navigate("/login");
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-neutral-10 border-b border-neutral-40 px-6 py-4">
        <div className="relative max-w-7xl mx-auto flex justify-between items-center">
          {headTitle}
          <UserDropdown onLogout={handleLogOut}>
            <Link
              to="/admin/job-list"
              className="text-l-bold cursor-pointer hover:opacity-80"
            >
              Job List
            </Link>
          </UserDropdown>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">{children}</main>
    </div>
  );
}

export default AdminLayout;
