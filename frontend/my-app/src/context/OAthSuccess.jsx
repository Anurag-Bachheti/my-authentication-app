import { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";

export const OAuthSuccess = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    const accessToken = params.get("accessToken");
    const refreshToken = params.get("refreshToken");
    const userParam = params.get("user");

    // 🔒 SAFETY CHECK
    if (!accessToken || !userParam) {
      console.info("OAuthSuccess: no OAuth params found, redirecting");
      navigate("/");
      return;
    }

    let user;
    try {
      user = JSON.parse(decodeURIComponent(userParam));
    } catch (err) {
      console.error("Failed to parse user data", err);
      navigate("/");
      return;
    }

    login(user, accessToken, refreshToken);

    // navigate AFTER login
    navigate(user.role === "admin" ? "/admin" : "/dashboard");
  }, [login, navigate]);

  return <p>Logging you in...</p>;
};