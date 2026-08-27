import { Routes, Route, Navigate } from "react-router-dom";

import Home from "./components/Home";
import Login from "./features/auth/Login";
import Registration from "./features/auth/Registration";
import ProtectedRoute from "./features/auth/ProtectedRoute";
import AppLayout from "./components/AppLayout";
import WatchVideoPage from "./pages/WatchVideoPage";
import UploadVideoPage from "./pages/UploadVideoPage";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Registration />} />
      <Route
        path="/registration"
        element={<Navigate to="/register" replace />}
      />

      <Route
        element={
          <ProtectedRoute>
            <AppLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/" element={<Home />} />
        <Route path="/watch/:videoId" element={<WatchVideoPage />} />
        <Route path="/upload" element={<UploadVideoPage />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
