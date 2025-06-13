import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../contexts/AuthContext";
import DashboardCourseCard from "../components/Dashboard/CourseCardDashboard";
import { useNavigate } from "react-router-dom";
import { ArrowLeftIcon, CheckIcon } from "@heroicons/react/24/solid";

const UserProfilePage = () => {
  const { user: authUser, login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    username: "",
    email: "",
    password: "",
    profile_pic: "",
  });

  const [courses, setCourses] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (authUser) {
      setFormData({
        first_name: authUser.first_name || "",
        last_name: authUser.last_name || "",
        username: authUser.username || "",
        email: authUser.email || "",
        password: "",
        profile_pic: authUser.profile_pic || null,
      });
      setCourses(authUser.courses || []);
    }
  }, [authUser]);

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      setError("You are not logged in");
      setLoading(false);
      return;
    }

    fetch("http://localhost:8000/api/enrollments/", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch enrollments");
        return res.json();
      })
      .then((data) => {
        setEnrollments(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    setError("");

    const form = new FormData();
    form.append("image", file);

    try {
      const apiKey = "2bca849f6f65e90a8e64dfaef112667f";
      const res = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
        method: "POST",
        body: form,
      });

      const data = await res.json();
      if (data.success) {
        setFormData((prev) => ({ ...prev, profile_pic: data.data.url }));
      } else {
        setError("Image upload failed");
      }
    } catch (err) {
      console.log(err);
      setError("Image upload error");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");

    const token = localStorage.getItem("access_token");
    if (!token) {
      setError("You are not logged in.");
      setSaving(false);
      return;
    }

    const payload = {
      first_name: formData.first_name,
      last_name: formData.last_name,
      username: formData.username,
      email: formData.email,
      profile_pic: formData.profile_pic,
    };

    if (formData.password.trim()) {
      payload.password = formData.password;
    }

    try {
      const res = await fetch(
        `http://localhost:8000/api/users/${authUser.id}/`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          method: "PATCH",
          body: JSON.stringify(payload),
        }
      );

      if (res.status === 401)
        throw new Error("Unauthorized. Please login again.");
      if (res.status === 400) {
        const data = await res.json();
        const messages = Object.values(data).flat().join(" ");
        throw new Error(messages || "Validation error.");
      }
      if (!res.ok) throw new Error("Failed to update profile.");

      const updatedUser = await res.json();
      login({ ...authUser, ...updatedUser }, token);
      alert("Profile updated successfully.");
      setFormData((prev) => ({ ...prev, password: "" }));
    } catch (err) {
      console.log(err);
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-3 md:p-6">
      <div className="max-w-screen-xl mx-auto space-y-10">
        {/* Back Button */}
        <button
          onClick={() => window.history.back()}
          className="flex items-center text-indigo-600 hover:text-indigo-800 font-semibold gap-2 transition"
        >
          <ArrowLeftIcon className="w-5 h-5" />
          Back
        </button>
        <div className="bg-white rounded-2xl shadow-lg p-8 flex flex-col md:flex-row items-center gap-6">
          {formData.profile_pic ? (
            <img
              src={formData.profile_pic}
              alt="Profile"
              className="w-28 h-28 rounded-full border-4 border-blue-200 object-cover"
            />
          ) : (
            <div className="w-28 h-28 rounded-full border-4 border-blue-200 bg-gray-300 flex items-center justify-center text-gray-500">
              No Image
            </div>
          )}
          <div className="text-center md:text-left">
            <h2 className="text-3xl font-bold text-gray-800">
              {formData.first_name} {formData.last_name}
            </h2>
            <p className="text-gray-500">@{formData.username}</p>
            <p className="text-gray-600">{formData.email}</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-md p-4 md:p-8">
          <h3 className="text-3xl font-semibold text-[#3E64FF] mb-6">
            Enrolled Courses
          </h3>
          {enrollments.length === 0 ? (
            <p className="text-gray-500">No courses enrolled yet.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-6">
              {enrollments.map((enroll) => (
                <DashboardCourseCard
                  course={enroll.course}
                  enrollment={enroll}
                  onClick={() => navigate(`/courses/${enroll.course.id}`)}
                />
              ))}
            </div>
          )}
        </div>

        <div className="bg-white rounded-2xl shadow-md p-4 md:p-8">
          <h3 className="text-2xl md:text-3xl font-semibold text-[#3E64FF] mb-6">
            Edit Profile
          </h3>
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-5"
          >
            <input
              type="text"
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
              placeholder="First Name"
              className="input-field"
              required
            />
            <input
              type="text"
              name="last_name"
              value={formData.last_name}
              onChange={handleChange}
              placeholder="Last Name"
              className="input-field"
              required
            />
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Username"
              className="input-field"
              required
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              className="input-field"
              required
            />
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="New Password"
              className="input-field md:col-span-2"
            />

            <div className="md:col-span-2">
              <label className="block mb-2 font-semibold text-gray-700">
                Upload Profile Picture
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                disabled={uploading}
                className="w-full input-field"
              />
              {uploading && (
                <div className="flex items-center mt-2 gap-2 text-blue-600">
                  <div className="loader"></div>
                  Uploading image...
                </div>
              )}
            </div>

            {error && (
              <p className="text-red-600 md:col-span-2 font-semibold mt-2">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={saving}
              className="bg-[#3E64FF] ml-auto text-white py-3 px-6 rounded-lg w-fit hover:bg-blue-500 transition md:col-span-2 flex justify-center items-center gap-2"
            >
              {saving && <div className="loader"></div>}
              {saving ? "Saving..." : "Save Changes"}
            
            </button>
          </form>
        </div>
      </div>

      <style jsx>{`
        .input-field {
          padding: 0.75rem;
          border: 1px solid #d1d5db;
          border-radius: 0.5rem;
          width: 100%;
          outline: none;
          transition: border 0.2s;
        }
        .input-field:focus {
          border-color: #3b82f6;
          box-shadow: 0 0 0 1px #3b82f6;
        }
        .loader {
          border: 3px solid #e0e0e0;
          border-top: 3px solid #3b82f6;
          border-radius: 50%;
          width: 18px;
          height: 18px;
          animation: spin 0.6s linear infinite;
        }
        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
};

export default UserProfilePage;
