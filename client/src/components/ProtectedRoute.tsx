import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Loading } from "./ui/Loading";

export function ProtectedRoute({ adminOnly = false }: { adminOnly?: boolean }) {
  const { token, loading, isAdmin } = useAuth();

  if (loading) return <Loading />;
  if (!token) return <Navigate to="/login" replace />;
  if (adminOnly && !isAdmin) return <Navigate to="/" replace />;
  return <Outlet />;
}

