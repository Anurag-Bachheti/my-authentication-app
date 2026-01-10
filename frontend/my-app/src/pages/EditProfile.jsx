import { useEffect, useState } from "react";
import api from "../api/axios";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export const EditProfile = () => {
  const [profile, setProfile] = useState(null);
  const [editing, setEditing] = useState(false);
  const { updateUser } = useContext(AuthContext);
  const [photoFile, setPhotoFile] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    api.get("/user/profile").then(res => setProfile(res.data));
  }, []);

  const saveProfile = async () => {
    let updatedProfile = profile;

    // Upload photo if selected
    if (photoFile) {
      const formData = new FormData();
      formData.append("photo", photoFile);

      const photoRes = await api.post(
        "/user/profile/photo",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      updatedProfile = photoRes.data;
    }

    // Update text fields
    const res = await api.put("/user/profile", updatedProfile);

    setProfile(res.data);
    updateUser(res.data);
    setEditing(false);
  };


  if (!profile) return <p>Loading...</p>;

  return (
    <div className="profile-card">
      <h2>Edit Profile</h2>

      {/* PROFILE PHOTO */}
      {profile.photo ? (
        <img
          src={`http://localhost:5000${profile.photo}`}
          alt="profile"
          width="60"
          height="60"
          style={{
            borderRadius: "50%",
            objectFit: "cover",
            marginBottom: "10px",
          }}
        />
      ) : (
        <div
          style={{
            width: "60px",
            height: "60px",
            borderRadius: "50%",
            background: "#ddd",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "40px",
            marginBottom: "10px",
          }}
        >
          👤
        </div>
      )}

      {/* FILE UPLOAD */}
      <input
        type="file"
        accept="image/*"
        disabled={!editing}
        onChange={(e) => setPhotoFile(e.target.files[0])}
      />
      <br />
      <br />
      {/* NAME */}
      <label>Name: </label>
      <input
        value={profile.name}
        disabled={!editing}
        maxLength={20}
        onChange={e => setProfile({ ...profile, name: e.target.value })}
      />
      <br />
      <br />

      {/* EMAIL (READ ONLY) */}
      <label>Email: </label>
      <input value={profile.email} disabled />

      <br />
      <br />
      {/* PHONE */}
      <label>Phone: </label>
      <input
        placeholder="Phone number"
        value={profile.phone || ""}
        disabled={!editing}
        maxLength={10}
        onChange={e => setProfile({ ...profile, phone: e.target.value })}
      />

      <br />
      <br />
      {/* ADDRESS */}
      <label>Address: </label>
      <textarea
        placeholder="Address"
        value={profile.address || ""}
        disabled={!editing}
        maxLength={100}
        onChange={e => setProfile({ ...profile, address: e.target.value })}
      />

      <br />
      <br />
      {!editing ? (
        <button onClick={() => setEditing(true)} style={{backgroundColor:"blue", color:"white"}}>Edit Fields</button>
      ) : (
        <button onClick={saveProfile}>Save</button>
      )}

      <br />
      <br />
      <br />
      <br />
      <button onClick={() => navigate("/dashboard")}>Back To Dashboard</button>
    </div>
  )
}

export default EditProfile;