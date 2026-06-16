import axios from "axios";

function resolveApiBaseUrl(): string {
  const raw = import.meta.env.VITE_API_URL;
  if (raw) {
    if (raw.startsWith("http://") || raw.startsWith("https://")) {
      return raw.endsWith("/api") ? raw : `${raw.replace(/\/$/, "")}/api`;
    }
    return `https://${raw.replace(/\/$/, "")}/api`;
  }
  return "/api";
}

export const api = axios.create({
  baseURL: resolveApiBaseUrl(),
  timeout: 90_000
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("mimo_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

