import { Routes, Route } from "react-router-dom";
import MainLayout from "../components/layout/MainLayout";
import ProtectedRoute from "../components/layout/ProtectedRoute";
import Chat from "../pages/Chat";
import Home from "../pages/Home";
import Settings from "../pages/Settings";
import Safety from "../pages/Safety";
import Events from "../pages/Events";

import Landing from "../pages/Landing";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Discover from "../pages/Discover";
import Profile from "../pages/Profile";

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public */}
      <Route
        path="/"
        element={<Landing />}
      />

      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* Protected */}
      <Route
        path="/discover"
        element={
          <ProtectedRoute>
            <MainLayout>
              <Discover />
            </MainLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />
      <Route
        path="/chat"
        element={
          <ProtectedRoute>
            <MainLayout>
              <Chat />
            </MainLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/home"
        element={
          <ProtectedRoute>
            <MainLayout>
              <Home />
            </MainLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/settings"
        element={
          <ProtectedRoute>
            <MainLayout>
              <Settings />
            </MainLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/safety"
        element={
          <ProtectedRoute>
            <MainLayout>
              <Safety />
            </MainLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/events"
        element={
          <ProtectedRoute>
            <MainLayout>
              <Events />
            </MainLayout>
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}
