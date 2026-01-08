import api from "./axios";

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach(prom => {
    if (error) prom.reject(error);
    else prom.resolve(token);
  });
  failedQueue = [];
};

export const setupInterceptors = (getAuth, setAuthToken, logout) => {
  api.interceptors.response.use(
    response => response,
    async error => {

      // 🔐 SAFETY CHECK (THIS FIXES YOUR CRASH)
      const originalRequest = error?.config;
      if (!originalRequest) {
        return Promise.reject(error);
      }

      // ❌ do NOT intercept refresh endpoint itself
      if (originalRequest.url?.includes("/auth/refresh")) {
        return Promise.reject(error);
      }

      if (error.response?.status === 401 && !originalRequest._retry) {

        if (isRefreshing) {
          return new Promise((resolve, reject) => {
            failedQueue.push({ resolve, reject });
          }).then(token => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return api(originalRequest);
          });
        }

        originalRequest._retry = true;
        isRefreshing = true;

        try {
          const refreshToken = localStorage.getItem("refreshToken");
          if (!refreshToken) {
            logout();
            return Promise.reject(error);
          }

          const res = await api.post("/auth/refresh", { refreshToken });

          const newAccessToken = res.data.accessToken;

          // store token
          setAuthToken(newAccessToken);
          localStorage.setItem("token", newAccessToken);

          api.defaults.headers.common.Authorization =
            `Bearer ${newAccessToken}`;
          originalRequest.headers.Authorization =
            `Bearer ${newAccessToken}`;

          processQueue(null, newAccessToken);
          return api(originalRequest);

        } catch (refreshErr) {
          processQueue(refreshErr, null);
          logout();
          return Promise.reject(refreshErr);
        } finally {
          isRefreshing = false;
        }
      }

      return Promise.reject(error);
    }
  );
};
