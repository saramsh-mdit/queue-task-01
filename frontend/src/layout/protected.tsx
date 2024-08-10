import { PropsWithChildren, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";

const ProtectedLayout = ({ children }: PropsWithChildren) => {
  const { value } = useContext(AuthContext);
  const navigation = useNavigate();

  if (value.isChecking)
    return <div className="mt-16 text-center">Authenticating...</div>;
  if (!value.isAuthorized && !value.isChecking) navigation("/login");
  return <>{children}</>;
};

export default ProtectedLayout;
