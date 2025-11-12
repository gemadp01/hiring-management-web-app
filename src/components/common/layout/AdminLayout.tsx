import { UserIcon } from "@heroicons/react/16/solid";

type TAdminLayoutProps = {
  headTitle: React.ReactNode;
  children: React.ReactNode;
};

function AdminLayout({ headTitle, children }: TAdminLayoutProps) {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-neutral-10 border-b border-neutral-40 px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          {headTitle}
          <button className="w-7 h-7 rounded-full flex items-center justify-center border border-neutral-40">
            <UserIcon className="w-5 h-5 text-neutral-90" />
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">{children}</main>
    </div>
  );
}

export default AdminLayout;
