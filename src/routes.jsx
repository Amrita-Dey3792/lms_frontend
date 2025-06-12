import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import UserProfilePage from "./pages/UserProfilePage";
import SignupPage from "./pages/SignupPage";
import PrivateRoute from "./PrivateRoute";
import Dashboard from "./pages/Dashboard";
import CourseDetails from "./pages/CourseDetailsPage";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="course" element={<Home />} />
        
        <Route element={<PrivateRoute />}>
          <Route path="courses/:id" element={<CourseDetails />} />
        </Route>
        <Route element={<PrivateRoute />}>
          <Route path="profile" element={<UserProfilePage />} />
        </Route>
        <Route element={<PrivateRoute />}>
          <Route path="dashboard" element={<Dashboard />} />
        </Route>
      </Route>

      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />

      <Route path="*" element={<LoginPage />} />
    </Routes>
  );
}
