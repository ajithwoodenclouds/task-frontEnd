import { Navigate } from "react-router-dom";
import { ReactNode } from "react";

interface PrivateRouterProps {
  children: ReactNode;
  isAuthenticated: Boolean;
}

const PrivateRouter = ({ children, isAuthenticated }: PrivateRouterProps) => {
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

export default PrivateRouter;
