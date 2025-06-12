import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import DashboardCourseCard from "../components/Dashboard/CourseCardDashboard";

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
    <div className="max-w-screen-xl mx-auto p-6">
      <div className="flex justify-between items-center flex-wrap">
        <h2 className="text-3xl font-bold mb-6">My Enrolled Courses</h2>

     <div className="mb-6 space-x-2">
  {['all', 'completed', 'inprogress'].map(f => (
    <button
      key={f}
      onClick={() => setFilter(f)}
      className={`btn btn-sm rounded-full ${
        filter === f ? 'btn-primary' : 'btn-outline'
      }`}
    >
      {f === 'all' ? 'All' : f === 'completed' ? 'Completed' : 'In Progress'}
    </button>
  ))}
</div>
      </div>


      {/* Courses List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredEnrollments.length === 0 ? (
          <p className="text-gray-600 col-span-full">
            No courses available for this filter.
          </p>
        ) : (
          filteredEnrollments.map((enroll) => (
            // আপনার CourseCard-এ enroll.course, enroll.completed, progress প্রপস হিসেবে পাস করুন
            <div
              key={enroll.id}
              onClick={() => navigate(`/courses/${enroll.course.id}`)}
              className="cursor-pointer"
            >
              <DashboardCourseCard
                course={enroll.course}
                enrollment={enroll}
                // আপনি চাইলে আরও প্রপস পাঠাতে পারেন
              />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default UserDashboard;
