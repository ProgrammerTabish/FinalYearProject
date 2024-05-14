import { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import AdminDashBoard from "./pages/AdminDashBoard";
import CitizenDashBoard from "./pages/CitizenDashBoard";
import VanDashBoard from "./pages/VanDashBoard";
import WelcomePage from "./pages/WelcomePage";

function App() {
  // State to track user session
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check if the user is in the session
    const storedUser = JSON.parse(sessionStorage.getItem("user"));
    // Update the user state
    setUser(storedUser);
  }, []);
  console.log(JSON.parse(sessionStorage.getItem("user")));
  return (
    <>
      <Router>
        <Routes>
          {/* Redirect to WelcomePage if no user in session */}
          <Route
            path="/"
            element={
              user ? (
                // Render the appropriate dashboard based on user role
                user.title === "admin" ? (
                  <Navigate to="/admin-dashboard" />
                ) : user.title === "citizen" ? (
                  <Navigate to="/citizen-dashboard" />
                ) : user.title === "van" ? (
                  <Navigate to="/van-dashboard" />
                ) : (
                  // Default redirect if user has a session but no recognized role
                  <Navigate to="/welcome" />
                )
              ) : (
                // Redirect to WelcomePage if no user in session
                <Navigate to="/welcome" />
              )
            }
          />

          <Route path="/citizen-dashboard" element={<CitizenDashBoard />} />
          <Route path="/van-dashboard" element={<VanDashBoard />} />
          <Route path="/admin-dashboard" element={<AdminDashBoard />} />
          <Route path="/welcome" element={<WelcomePage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
