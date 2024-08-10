import React, { PropsWithChildren } from "react";
import { getMe } from "../api/auth";

interface userData {
  isVerified: boolean;
  name: string;
  email: string;
}

type AuthContextType = {
  value: {
    isAuthorized: boolean;
    isChecking: boolean;
    userData?: userData;
  };
  logIn?: (token: string) => void;
  logOut?: () => void;
};

const token = localStorage.getItem("token");

export const AuthContext = React.createContext<AuthContextType>({
  value: {
    isAuthorized: token ? true : false,
    isChecking: token ? false : true,
  },
  logIn: undefined,
  logOut: undefined,
});
export function AuthProvider({ children }: PropsWithChildren) {
  const [isAuthorized, setIsAuthorized] = React.useState(token ? true : false);
  const [isChecking, setIsChecking] = React.useState(token ? false : true);
  const [userData, setUserData] = React.useState<userData>();

  React.useEffect(() => {
    checkToken();
  }, []);

  async function checkToken() {
    try {
      const response = await getMe();
      console.log("first");
      if (response) {
        setUserData(response.data);
        setIsChecking(false);
        setIsAuthorized(true);
      }
    } catch (err) {
      console.log("second");
      console.log(err);
      setIsAuthorized(false);
      setIsChecking(false);
    }
  }

  function logOut() {
    localStorage.removeItem("token");
    setIsAuthorized(false);
    setIsChecking(false);
  }
  function logIn(token: string) {
    localStorage.setItem("token", token);
    setIsAuthorized(true);
    setIsChecking(false);
  }

  return (
    <AuthContext.Provider
      value={{ value: { isAuthorized, isChecking, userData }, logOut, logIn }}
    >
      {children}
    </AuthContext.Provider>
  );
}
