import { useResult, from, isLoading } from "@triframe/utils-react";
import { getLoggedInUser, UserType } from "api";

export function usePlayerName() {
    const loggedInUser = useResult(getLoggedInUser, {
        select: from(UserType)
          .name()
      });

    return isLoading(loggedInUser) ? loggedInUser : loggedInUser?.name;
}