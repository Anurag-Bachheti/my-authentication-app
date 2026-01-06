import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Profile = () => {
  const { auth, logout } = useContext(AuthContext);

  return (
    <div>
      <h2>Welcome {auth.user.name} </h2>
      <p>Email: {auth.user.email}</p>
      <p>Role: {auth.user.role}</p>

      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default Profile;
