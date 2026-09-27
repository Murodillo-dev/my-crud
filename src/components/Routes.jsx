import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../firebase/useAuth";

const Loader = () => (
  <div className="w-full min-h-screen flex justify-center items-center">
    <span className="loading loading-spinner loading-lg"></span>
  </div>
);

// Faqat tizimga kirgan foydalanuvchilar uchun
export const ProtectedRoute = () => {
  const { user, loading } = useAuth();
  if (loading) return <Loader />;
  return user ? <Outlet /> : <Navigate to="/" replace />;
};

// Faqat tizimga kirmaganlar uchun (login, signup, forgot)
export const PublicRoute = () => {
  const { user, loading } = useAuth();
  if (loading) return <Loader />;
  return user ? <Navigate to="/crud" replace /> : <Outlet />;
};
