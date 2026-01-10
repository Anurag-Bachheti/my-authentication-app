import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export const DisabledOnExpire = ({ children }) => {
  const { sessionExpired } = useContext(AuthContext);

  return (
    <div
      style={{
        pointerEvents: sessionExpired ? "none" : "auto",
        opacity: sessionExpired ? 0.5 : 1
      }}
    >
      {children}
    </div>
  );
};
