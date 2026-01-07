import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import Register from "./Register";
import Login from "./Login";

const AuthLanding = () => {

    const [showLogin, setShowLogin] = useState(true);

     return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <div style={{ marginBottom: "20px" }}>
        <button onClick={() => setShowLogin(true)}>
          For Existing User
        </button>

        <button onClick={() => setShowLogin(false)}>
          For New User
        </button>
      </div>

      {showLogin ? <Login /> : <Register />}
    </div>
  );
}

export default AuthLanding;