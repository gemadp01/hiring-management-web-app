import { userLogin, type TUser } from "@/store/features/user/userSlice";
import { useAppDispatch } from "@/store/hooks";
import { useEffect, useState } from "react";

export const useHydration = () => {
  const dispatch = useAppDispatch();
  const [isHydrated, setIsHydrated] = useState(false);

  const hydrateAuth = async () => {
    try {
      const currentUser = JSON.parse(
        localStorage.getItem("current-user")!
      ) as TUser;

      if (!currentUser) return;

      dispatch(userLogin(currentUser));
    } catch (err) {
      console.log(err);
    } finally {
      setIsHydrated(true);
    }
  };

  useEffect(() => {
    hydrateAuth();
  }, []);

  return isHydrated;
};
