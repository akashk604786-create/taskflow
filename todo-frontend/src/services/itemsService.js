import { getToken } from "./authService";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3006";

const authHeaders = () => ({
  "Content-Type": "application/json",
  Authorization: `Bearer ${getToken()}`,
});

const request = async (path, options = {}) => {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers: authHeaders(),
  });

  if (!response.ok) {
    const body = await response.json().catch(() => null);
    throw new Error(body?.message || "Something went wrong. Please try again.");
  }

  return response;
};

const mapServerItemToLocalItem = (serverItem) => ({
  id: serverItem._id,
  name: serverItem.task,
  dueDate: serverItem.date,
  completed: serverItem.completed,
  createdAt: serverItem.createdAt,
  updatedAt: serverItem.updatedAt,
});

export const addItemToServer = async (task, date) => {
  const response = await request("/api/todo", {
    method: "POST",
    body: JSON.stringify({ task, date }),
  });
  return mapServerItemToLocalItem(await response.json());
};

export const getItemsFromServer = async () => {
  const response = await fetch(`${API_BASE_URL}/api/todo`, { headers: authHeaders() });
  const items = await response.json();
  if (!response.ok) return [];
  return items.map(mapServerItemToLocalItem);
};

export const markItemCompletedOnServer = async (id) => {
  const response = await request(`/api/todo/${id}/completed`, { method: "PUT" });
  return mapServerItemToLocalItem(await response.json());
};

export const deleteItemFromServer = async (id) => {
  await request(`/api/todo/${id}`, { method: "DELETE" });
  return id;
};
