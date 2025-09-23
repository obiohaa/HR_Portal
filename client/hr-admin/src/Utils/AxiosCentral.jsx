import { axiosFetch } from "./axiosFetch";

// axiosFetch.js
axiosFetch.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      window.location.href = "/login"; // auto-logout on session expiration
    }
    return Promise.reject(err);
  }
);
