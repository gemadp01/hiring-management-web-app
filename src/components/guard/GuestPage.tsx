import { useAppSelector } from "@/store/hooks";
import { Navigate } from "react-router";

type TGuestPage = {
  children: React.ReactNode;
};

export const GuestPage = ({ children }: TGuestPage) => {
  const userSelector = useAppSelector((state) => state.user);

  if (userSelector.id) {
    if (userSelector.role === "admin") {
      return <Navigate to="/admin/job-list" />;
    }
    return <Navigate to="/applicant/job-listing" />;
  }

  return children;
};
