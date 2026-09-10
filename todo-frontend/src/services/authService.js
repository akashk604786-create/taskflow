const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3006";

export const register = async (name, email, password) => {
  const response = await fetch(`${API_BASE_URL}/api/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password }),
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || data.errors?.[0] || "Registration failed");
  }
  return data;
};

export const login = async (email, password) => {
  const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || data.errors?.[0] || "Login failed");
  }
  return data;
};

export const saveSession = ({ token, user }) => {
  localStorage.setItem("taskflow_token", token);
  localStorage.setItem("taskflow_user", JSON.stringify(user));
};

export const getToken = () => localStorage.getItem("taskflow_token");

export const getUser = () => {
  const user = localStorage.getItem("taskflow_user");
  return user ? JSON.parse(user) : null;
};

export const logout = () => {
  localStorage.removeItem("taskflow_token");
  localStorage.removeItem("taskflow_user");
};
