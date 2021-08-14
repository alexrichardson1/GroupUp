import { dummyUser } from "api";
import { createContext } from "react";

interface UserContextT {
  email: string;
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

/*
export type ThemeContextType = {
    theme: Theme;
    setTheme: (Theme: Theme) => void;
}

export const ThemeContext = createContext<ThemeContextType>({ 
  theme: Theme.Dark, 
  setTheme: theme => console.warn('no theme provider')});
  
export const useTheme = () => useContext(ThemeContext);
*/
