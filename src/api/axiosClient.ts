import axios from "axios";

const axiosClient = axios.create({
  baseURL: "http://localhost:5000/api/auth", // Set your API base URL
  headers: {
    "Content-Type": "application/json",
  },
});

axiosClient.interceptors.request.use(
    (config) => {
      // Example: Attach token to every request
      const token = localStorage.getItem("token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

export default axiosClient;
