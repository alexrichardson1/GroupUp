import { dummyUser } from "api";
import { createContext } from "react";
import { UserT } from "types/types";

interface UserContextT {
  email: string;
  user: UserT;
  setEmail: (email: string) => void;
  setUser: (user: UserT) => void;
}

export const UserContext = createContext<UserContextT>({
  email: dummyUser.email,
  user: dummyUser,
  setEmail: (_email) => console.warn("No email"),
  setUser: (_user) => console.warn("No user."),
});
