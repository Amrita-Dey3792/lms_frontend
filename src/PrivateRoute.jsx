import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./contexts/AuthContext";

const PrivateRoute = () => {
  const { user, loading } = useContext(AuthContext);  // assume your AuthContext provides a 'loading' state

  if (loading) {
    // Show a loader/spinner while auth status is being determined
    return <div style={{ textAlign: "center", marginTop: "2rem" }}>Loading...</div>;
  }

  return user ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
