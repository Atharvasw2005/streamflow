import { Routes, Route } from "react-router-dom";

import Home from "./components/Home";
import Login from "./features/auth/Login";
import Registration from "./features/auth/Registration";
import ProtectedRoute from "./features/auth/ProtectedRoute";

function App() {
  return (
    <Routes>
      {/* Protected */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />

      <Route path="/login" element={<Login />} />

      <Route path="/registration" element={<Registration />} />
    </Routes>
  );
}

export default App;
