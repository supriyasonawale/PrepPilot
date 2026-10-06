
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

import Dashboard from "./pages/Dashboard";
import Topics from "./pages/Topics";
import Practice from "./pages/Practice";
import Interview from "./pages/Interview";
import Progress from "./pages/Progress";

import Login from "./pages/Login";
import Register from "./pages/Register";
import VoiceInterview from "./pages/VoiceInterview";

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>

        {/* Public Routes */}

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        {/* Protected Routes */}

        <Route element={<ProtectedRoute />}>

          <Route
            path="/dashboard"
            element={<Dashboard />}
          />

          <Route
            path="/topics"
            element={<Topics />}
          />

          <Route
            path="/practice"
            element={<Practice />}
          />

          <Route
            path="/interview"
            element={<Interview />}
          />

          <Route
            path="/progress"
            element={<Progress />}
          />

        </Route>

        {/* Default */}

        <Route
          path="/"
          element={
            <Navigate
              to="/dashboard"
              replace
            />
          }
        />

        <Route
          path="*"
          element={
            <Navigate
              to="/dashboard"
              replace
            />
          }
        />

        <Route
  path="/voice-interview"
  element={<VoiceInterview />}
/>

      </Routes>
    </BrowserRouter>
  );
};

export default App;
