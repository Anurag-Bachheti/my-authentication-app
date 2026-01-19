import { useEffect, useState } from "react";
import api from "../api/axios";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
// import { DisabledOnExpire } from "./DisabledOnExpire";

export const EditProfile = () => {
  const [profile, setProfile] = useState(null);
  const [editing, setEditing] = useState(false);
  const { updateUser } = useContext(AuthContext);
  const [photoFile, setPhotoFile] = useState(null);
  const navigate = useNavigate();

  const { sessionExpired } = useContext(AuthContext);

  useEffect(() => {
    if (sessionExpired) return;

    const fetchProfile = async () => {
      try {
        await new Promise(res => setTimeout(res, 1000));
        const res = await api.get("/user/profile");
        setProfile(res.data);
      } catch (err) {
        console.error("Profile fetch failed");
      }
    };

    fetchProfile();
  }, [sessionExpired]);

  const saveProfile = async () => {
    // if (!sessionExpired) {
    //   // alert("Your session has expired. Please login again.");
    //   navigate("/dashboard");
    //   return;
    // }

    try {
      let updatedProfile = profile;

      if (photoFile) {
        const formData = new FormData();
        formData.append("photo", photoFile);

        const photoRes = await api.post(
          "/user/profile/photo",
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );

        updatedProfile = photoRes.data;
      }

      // update profile details
      const res = await api.put("/user/profile", {
        name: updatedProfile.name,
        phone: updatedProfile.phone,
        address: updatedProfile.address,
      });

      setProfile(res.data);
      updateUser(res.data);
      setEditing(false);

    } catch (err) {
      // console.error("Failed to update profile");
      if (err.response?.status === 401) {
        alert("Your session has expired. Please login again.");
        setEditing(false);
        navigate("/dashboard");
        return;
      }
      alert("Failed to update profile");
      console.error("Failed to update profile", err);
    }
  };

  useEffect(() => {
    if (sessionExpired) {
      setEditing(false);
    }
  }, [sessionExpired]);

  if (!profile && !sessionExpired) return <p>Loading...</p>;

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
      {/* <DisabledOnExpire> */}
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
        // <button onClick={() => setEditing(true)} style={{ backgroundColor: "blue", color: "white" }}>Edit Fields</button>
        <button
          // disabled={!sessionExpired}
          onClick={() => setEditing(true)}
          style={{
            backgroundColor: sessionExpired ? "gray" : "blue",
            color: "white",
            cursor: sessionExpired ? "not-allowed" : "pointer"
          }}
        >
          Edit Fields
        </button>
      ) : (
        <button onClick={saveProfile}>Save</button>
      )}
      {/* </DisabledOnExpire> */}

      <br />
      <br />
      <br />
      <br />
      <button onClick={() => navigate("/dashboard")}>Back To Dashboard</button>
    </div>
  )
}

export default EditProfile;