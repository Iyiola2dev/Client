import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true,
});

// Add an interceptor to handle expired tokens
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Remove the expired token
      localStorage.removeItem("authToken");

      // Redirect to the login page if the user is not authenticated
      if (window.location.pathname !== "/therapy") {
        window.location.href = "/therapy";
      }
    }
    return Promise.reject(error);
  }
);

export default api;
