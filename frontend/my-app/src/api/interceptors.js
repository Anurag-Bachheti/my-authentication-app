import api from "./axios";

let isRefreshing = false;
let failedQueue = [];
let hasLoggedOut = false;

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
      const originalRequest = error?.config;
      if (!originalRequest) {
        return Promise.reject(error);
      }

      // 🚫 Never intercept refresh endpoint
      if (originalRequest.url?.includes("/auth/refresh")) {
        return Promise.reject(error);
      }

      if (error.response?.status === 401 && !originalRequest._retry) {

        // If already logged out, do nothing
        if (hasLoggedOut) {
          return Promise.reject(error);
        }

        if (hasExpired) {
          return Promise.reject(error);
        }

        // If refresh already in progress, queue request
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
            throw new Error("No refresh token");
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

          if (!hasLoggedOut) {
            hasLoggedOut = true;
            setSessionExpired(true);
            alert("Session expired. Please login again to continue.");
            navigate("/dashboard");
          }

          return Promise.reject(refreshErr);

        } finally {
          isRefreshing = false;
        }
      }

      return Promise.reject(error);
    }
  );
};
