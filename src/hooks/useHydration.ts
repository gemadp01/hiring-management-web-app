import type { TUser } from "@/store/features/user/userSlice";
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

      dispatch({
        type: "USER_LOGIN",
        payload: {
          id: currentUser.id,
          email: currentUser.email,
          role: currentUser.role,
          token_expires: currentUser.token_expires,
        },
      });
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
