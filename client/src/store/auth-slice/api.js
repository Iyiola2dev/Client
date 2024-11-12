
import axios from "axios";
// import { useHistory } from "react-router-dom"; // if using react-router-dom for navigation

// Create an instance of axios
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

      // Redirect to the login page
      window.location.href = "/therapy"; // Or use `history.push('/login')` if using `react-router`
    }
    return Promise.reject(error);
  }
);

export default api;
