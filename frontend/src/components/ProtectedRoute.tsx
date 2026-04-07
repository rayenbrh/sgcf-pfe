import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

const AuthLoading = () => (
  <div className="flex h-screen w-screen items-center justify-center">
    <div className="h-8 w-8 animate-spin rounded-full border-4 border-brand-blue border-t-transparent" />
  </div>
);

interface ProtectedRouteProps {
  allowedRoles?: Array<'admin' | 'manager' | 'employe' | 'client'>;
}

const ProtectedRoute = ({ allowedRoles }: ProtectedRouteProps) => {
  const { isAuthenticated, isLoading, user } = useAuth();

  if (isLoading) return <AuthLoading />;

  if (!isAuthenticated) return <Navigate to="/login" replace />;

  if (allowedRoles && user && !allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
