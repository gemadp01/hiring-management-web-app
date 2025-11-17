import React, { useState } from "react";
import { UserIcon, ArrowLeftIcon } from "@heroicons/react/24/solid";

type TUserDropdownProps = {
  children: React.ReactNode;
  onLogout: () => void;
};

export const UserDropdown = ({ children, onLogout }: TUserDropdownProps) => {
  const [openDropdown, setOpenDropdown] = useState(false);

  return (
    <div className="relative">
      {/* Button to toggle dropdown */}
      <button
        onClick={() => setOpenDropdown((prev) => !prev)}
        className="cursor-pointer w-7 h-7 rounded-full flex items-center justify-center border border-neutral-40"
      >
        <UserIcon className="w-5 h-5 text-neutral-90" />
      </button>

      {/* Dropdown */}
      <div
        className={`${
          openDropdown ? "flex flex-col" : "hidden"
        } text-center gap-2 z-10 bg-neutral-10 shadow-[0_4px_8px_0_rgba(0,0,0,0.1)] px-4 py-1 rounded-sm absolute right-0 top-10`}
      >
        {children}

        <button
          onClick={onLogout}
          className="cursor-pointer text-danger-main bg-danger-surface border-t border-neutral-40 rounded-sm flex items-center gap-2 py-1 px-2 hover:opacity-80"
        >
          <ArrowLeftIcon className="w-5 h-5" />
          Logout
        </button>
      </div>
    </div>
  );
};
