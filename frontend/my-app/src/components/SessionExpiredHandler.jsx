import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSessionExpired } from "../store/authSlice";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // your context

const SessionExpiredHandler = () => {
  const expired = useSelector((state) => state.auth.sessionExpired);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { logout } = useAuth(); // still using context

  useEffect(() => {
    if (!expired) return;

    alert("Session expired. Please login again.");

    logout(); // context logout
    dispatch(setSessionExpired(false));
    navigate("/login");
  }, [expired, dispatch, logout, navigate]);

  return null;
};

export default SessionExpiredHandler;
