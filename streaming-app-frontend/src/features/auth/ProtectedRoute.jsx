import { Navigate } from "react-router-dom";
import { getAuthToken, getCurrentUserRole } from "./authService";

function ProtectedRoute({ children, allowedRoles = [] }) {
  const token = getAuthToken();

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles.length > 0) {
    const role = getCurrentUserRole();
    if (!allowedRoles.includes(role)) {
      return <Navigate to="/" replace />;
    }
  }

  return children;
}

export default ProtectedRoute;
