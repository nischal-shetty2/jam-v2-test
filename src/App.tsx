import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import JamLanding from "./components/JamLanding";
import LoginPage from "./components/Login";
// import Dashboard from "./components/Dashboard";
import CreateWallet from "./components/CreateWallet";
import { Layout } from "./components/layout/Layout";
import { getSession } from "./lib/session";
import { Toaster } from "./components/ui/sonner";

// Check if user is authenticated
const isAuthenticated = () => {
  const session = getSession();
  return session !== null;
};

// Protected Route component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  return isAuthenticated() ? <>{children}</> : <Navigate to="/login" replace />;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={
            isAuthenticated() ? <Navigate to="/" replace /> : <LoginPage />
          }
        />
        <Route
          path="/create-wallet"
          element={
            isAuthenticated() ? <Navigate to="/" replace /> : <CreateWallet />
          }
        />
        {/* <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Layout>
                <Dashboard />
              </Layout>
            </ProtectedRoute>
          }
        /> */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Layout>
                <JamLanding />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
      <Toaster />
    </Router>
  );
}

export default App;
