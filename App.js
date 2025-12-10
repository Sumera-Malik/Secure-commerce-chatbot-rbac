import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate
} from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import ChatPage from "./pages/ChatPage";
import AdminPage from "./pages/AdminPage";
import ProtectedRoute from "./components/ProtectedRoute";
import "./App.css";

function Layout() {
  const { isAuthed, role, logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <>
      <header className="topbar">
        <div className="logo">SecureCommerce Chatbot</div>
        <nav>
          <Link to="/">Home</Link>
          {isAuthed && <Link to="/chat">Chat</Link>}
          {isAuthed && role === "admin" && <Link to="/admin">Admin</Link>}
          {!isAuthed && <Link to="/login">Login</Link>}
          {!isAuthed && <Link to="/register">Register</Link>}
          {isAuthed && (
            <>
              <span className="linklike">
                {user?.name} ({role})
              </span>
              <button className="linklike" onClick={handleLogout}>
                Logout
              </button>
            </>
          )}
        </nav>
      </header>

      <main className="main">
        <div className="page">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route
              path="/chat"
              element={
                <ProtectedRoute>
                  <ChatPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin"
              element={
                <ProtectedRoute roles={["admin"]}>
                  <AdminPage />
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
      </main>
    </>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Layout />
      </Router>
    </AuthProvider>
  );
}
