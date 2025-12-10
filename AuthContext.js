// secure-chatbot-ui/src/context/AuthContext.js
import { createContext, useContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { logoutApi } from "../api/authApi";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem("accessToken"));
  const [user, setUser] = useState(null);

  // Whenever the token changes, decode it and update user
  useEffect(() => {
    if (!token) {
      setUser(null);
      return;
    }
    try {
      const decoded = jwtDecode(token);
      setUser({
        id: decoded.sub,
        name: decoded.name,
        email: decoded.email,
        role: decoded.role
      });
    } catch (err) {
      console.error("Failed to decode JWT", err);
      setUser(null);
      localStorage.removeItem("accessToken");
      setToken(null);
    }
  }, [token]);

  const login = (newToken) => {
    if (!newToken) return;
    localStorage.setItem("accessToken", newToken);
    setToken(newToken);
  };

  const logout = async () => {
    try {
      // Best-effort call; if it fails, we still clear local state
      await logoutApi();
    } catch {
      // ignore errors on logout
    }
    localStorage.removeItem("accessToken");
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        role: user?.role || null,
        isAuthed: !!user,
        login,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
