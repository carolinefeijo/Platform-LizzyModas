import type { JSX } from "react";
import { Navigate } from "react-router-dom";

export const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const token = localStorage.getItem("@App:token");

  // Se não houver token, ele nem entra nas rotas do Dashboard
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
};
