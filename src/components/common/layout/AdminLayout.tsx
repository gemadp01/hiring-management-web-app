import { UserIcon } from "@heroicons/react/16/solid";

type TAdminLayoutProps = {
  headTitle: string | React.ReactNode;
  children: React.ReactNode;
};

function AdminLayout({ headTitle, children }: TAdminLayoutProps) {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-neutral-10 border-b border-neutral-40 px-6 py-4 flex items-center justify-between">
        <h1 className="text-l-bold">{headTitle}</h1>
        <button className="w-7 h-7 rounded-full  flex items-center justify-center border border-neutral-40">
          <UserIcon className="w-5 h-5 text-neutral-90" />
        </button>
      </header>

      {/* Main Content */}
      <main className="mx-auto px-6 py-9">{children}</main>
    </div>
  );
}

export default AdminLayout;
