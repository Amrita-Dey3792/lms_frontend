import React from "react";

const DashboardCourseCard = ({ course, enrollment, onClick }) => {

  return (
    <div
      onClick={onClick}
      className="cursor-pointer bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 p-6 flex flex-col md:flex-row items-center gap-6"
    >
      <img
        src={course.image}
        alt={course.title}
        className="w-40 h-28 object-cover rounded-lg flex-shrink-0"
      />

      <div className="flex-grow">
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">{course.title}</h2>
        <p className="text-sm text-gray-600 mb-1">Instructor: <span className="font-medium">{course.instructor}</span></p>
        <p className="text-sm text-gray-500 mb-4 line-clamp-2">{course.description}</p>

        <div className="flex items-center space-x-4">
          <div>
            <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
              enrollment.completed ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
            }`}>
              {enrollment.completed ? "Completed" : "In Progress"}
            </span>
          </div>
          <progress
            className="w-48 h-4 rounded-lg overflow-hidden progress progress-success"
            value={course.progress || 0}
            max="100"
          />
          <span className="text-sm text-gray-700">{course.progress || 0}%</span>
        </div>
      </div>
    </div>
  );
};

export default DashboardCourseCard;
