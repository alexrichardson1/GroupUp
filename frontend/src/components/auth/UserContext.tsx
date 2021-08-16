import { dummyUser } from "common/api";
import { createContext } from "react";

interface UserContextT {
  email: string;
  // name of user
  user: string;
  setEmail: (email: string) => void;
  setUser: (user: string) => void;
}

export const UserContext = createContext<UserContextT>({
  email: dummyUser.email,
  user: dummyUser.fullname,
  setEmail: (_email) => console.warn("No email"),
  setUser: (_user) => console.warn("No user."),
});
