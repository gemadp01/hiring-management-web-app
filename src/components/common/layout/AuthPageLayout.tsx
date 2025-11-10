import { Link, useLocation } from "react-router";

type TAuthPageLayout = {
  headTitle: string;
  headDesc: string;
  headLink: string;
  children: React.ReactNode;
  footButton: React.ReactNode;
};

function AuthPageLayout({
  headTitle,
  headDesc,
  headLink,
  children,
  footButton,
}: TAuthPageLayout) {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-[rgba(250,250,250,1)] flex items-center justify-center">
      <div className="w-full max-w-[500px]">
        {/* Logo */}

        <div className="mb-4">
          <img
            src="/public/Logo Rakamin.png"
            alt="Rakamin Logo Type"
            className="w-[145px] "
          />
        </div>

        {/* Card */}
        <div className="bg-neutral-10 shadow-md p-10">
          <h2 className="text-heading-s-bold text-neutral-90 mb-2">
            {headTitle}
          </h2>

          <p className="text-m-regular mb-4">
            {headDesc}{" "}
            <Link
              to={
                location.pathname.startsWith("/login") ? "/register" : "/login"
              }
              className="text-primary-main"
            >
              {headLink}
            </Link>
          </p>

          {children}

          {/* Divider */}
          <div className="flex items-center my-4">
            <div className="flex-1 border-t border-neutral-60"></div>
            <span className="px-4 text-sm text-neutral-60">or</span>
            <div className="flex-1 border-t border-neutral-60"></div>
          </div>

          {/* Google Button */}
          {footButton}
        </div>
      </div>
    </div>
  );
}

export default AuthPageLayout;
