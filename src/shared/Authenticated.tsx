import { createContext, useState, useContext, type ReactElement } from "react";
import type { User } from "../models/user/userModel";
import { GetCookie } from "../utils/cookieHelper";

const AuthenticatedContext = createContext<{
  user: User | null;
  setUser: (user: User | null) => void;
} | null>(null);

const AuthenticatedProvider = ({ children }: { children: ReactElement }) => {
  const [user, setUser] = useState<User | null>(null);

  const userInfo = GetCookie("userInfo")
  if(userInfo && !user){
    setUser(JSON.parse(userInfo))
  }

  return (
    <AuthenticatedContext.Provider value={{ user, setUser }}>
      {children}
    </AuthenticatedContext.Provider>
  );
};

export { AuthenticatedProvider, AuthenticatedContext };
