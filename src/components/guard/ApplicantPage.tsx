import { useAppSelector } from "@/store/hooks";
import { Navigate } from "react-router";

type TApplicantPage = {
  children: React.ReactNode;
};

export const ApplicantPage = ({ children }: TApplicantPage) => {
  const userSelector = useAppSelector((state) => state.user);

  if (userSelector.role !== "user") {
    return <Navigate to="/login" />;
  }

  if (userSelector.token_expires) {
    const exp = userSelector.token_expires * 1000;
    if (Date.now() >= exp) {
      localStorage.removeItem("current-user");
      return <Navigate to="/login" />;
    }
  }

  return children;
};
