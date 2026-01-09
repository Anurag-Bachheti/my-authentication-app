import { useEffect, useState } from "react";
import api from "../api/axios";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [editing, setEditing] = useState(false);
  const { updateUser } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    api.get("/user/profile").then(res => setProfile(res.data));
  }, []);

  const saveProfile = async () => {
    const res = await api.put("/user/profile", profile);
    setProfile(res.data);
    updateUser(res.data);
    setEditing(false);
  };

  if (!profile) return <p>Loading...</p>;

  return (
    <div className="profile-card">
      <h2>Edit Profile</h2>

      {/* PHOTO */}
      <img
        src={profile.photo || "https://via.placeholder.com/120"}
        alt="profile"
        width="120"
      />

      <br></br>

      {/* NAME */}
      <input
        value={profile.name}
        disabled={!editing}
        maxLength={20}
        onChange={e => setProfile({ ...profile, name: e.target.value })}
      />

      {/* EMAIL (READ ONLY) */}
      <input value={profile.email} disabled />

      {/* PHONE */}
      <input
        placeholder="Phone number"
        value={profile.phone || ""}
        disabled={!editing}
        maxLength={10}
        onChange={e => setProfile({ ...profile, phone: e.target.value })}
      />

      {/* ADDRESS */}
      <textarea
        placeholder="Address"
        value={profile.address || ""}
        disabled={!editing}
        maxLength={100}
        onChange={e => setProfile({ ...profile, address: e.target.value })}
      />

      {!editing ? (
        <button onClick={() => setEditing(true)}>Edit</button>
      ) : (
        <button onClick={saveProfile}>Save</button>
      )}

      <button onClick={()=> navigate("/dashboard")}>Back To Dashboard</button>
    </div>
  )
}

export default Profile;