// secure-chatbot-ui/src/api/authApi.js
import client from "./axiosClient";

export const register = (payload) => client.post("/auth/register", payload);
export const login = (payload) => client.post("/auth/login", payload);
export const verifyOtp = (payload) => client.post("/auth/verify-otp", payload);

// logout endpoint to support backend token revocation
export const logoutApi = () => client.post("/auth/logout");
