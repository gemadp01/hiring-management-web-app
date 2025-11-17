import { useAppSelector } from "@/store/hooks";
import { Navigate } from "react-router";

type TAdminPage = {
  children: React.ReactNode;
};

export const AdminPage = ({ children }: TAdminPage) => {
  const userSelector = useAppSelector((state) => state.user);

  if (userSelector.role !== "admin") {
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
