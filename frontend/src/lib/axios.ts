import axios from "axios";

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});
axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // 1. Xử lý lỗi 401 (Hết hạn token hoặc không có quyền)
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      window.dispatchEvent(new Event("unauthorized"));
    }
    // 2. Xử lý lỗi Server (500+) hoặc Network Error (Server Render ngủ)
    else if (!error.response || error.response?.status >= 500) {
      window.dispatchEvent(new Event("serverDown"));
    }

    return Promise.reject(error);
  },
);

export default axiosClient;
