import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import DashboardCourseCard from "../components/Dashboard/CourseCardDashboard";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import { div } from "framer-motion/client";

const UserDashboard = () => {
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("all"); // all | completed | inprogress
  const navigate = useNavigate();

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

  // Filter enrollments by status
  const filteredEnrollments = enrollments.filter((enroll) => {
    if (filter === "completed") return enroll.completed === true;
    if (filter === "inprogress") return enroll.completed === false;
    return true;
  });

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="loader border-4 border-blue-500 border-t-transparent rounded-full w-12 h-12 animate-spin"></div>
      </div>
    );

  if (error)
    return (
      <div className="text-red-600 text-center mt-10">
        <p>{error}</p>
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-3 md:p-6">
      <div className="max-w-screen-xl mx-auto p-6">
      {/* Back Button */}
        <button
          onClick={() => window.history.back()}
          className="flex items-center text-indigo-600 hover:text-indigo-800 font-semibold gap-2 transition"
        >
          <ArrowLeftIcon className="w-5 h-5" />
          Back
        </button>
      <div className="flex justify-between items-center flex-wrap my-10">

        <h2 className="text-3xl font-bold mb-6 text-grey-900">
          My Enrolled Courses
        </h2>

        <div className="mb-6 space-x-2">
          {["all", "completed", "inprogress"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`btn btn-sm rounded-full ${
                filter === f ? "btn-primary" : "btn-outline"
              }`}
            >
              {f === "all"
                ? "All"
                : f === "completed"
                ? "Completed"
                : "In Progress"}
            </button>
          ))}
        </div>
      </div>

      {/* Courses List */}
      <div className="grid grid-cols-1  xl:grid-cols-2 gap-6">
        {filteredEnrollments.length === 0 ? (
          <p className="text-gray-600 col-span-full">
            No courses available for this filter.
          </p>
        ) : (
          filteredEnrollments.map((enroll) => (
            <div
              key={enroll.id}
              onClick={() => navigate(`/courses/${enroll.course.id}`)}
              className="cursor-pointer"
            >
              <DashboardCourseCard course={enroll.course} enrollment={enroll} />
            </div>
          ))
        )}
      </div>
    </div>
    </div>
  );
};

export default UserDashboard;
