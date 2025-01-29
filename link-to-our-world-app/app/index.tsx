import { useResult, isLoading, from } from "@triframe/utils-react";
import { getLoggedInUser, UserType } from "api";
import { Redirect } from "expo-router";

export default function App() {
    const loggedInUser = useResult(getLoggedInUser, {
      select: from(UserType)
        .email()
    });
    console.log(loggedInUser)
    if (isLoading(loggedInUser)) return null;
    if (loggedInUser) return <Redirect href="/landing" />
    return <Redirect href="/login" />
}
