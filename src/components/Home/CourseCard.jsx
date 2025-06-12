import { BookOpenIcon, UserCircleIcon } from '@heroicons/react/24/solid';
import { useNavigate } from 'react-router-dom';

export default function CourseCard({ course }) {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col overflow-hidden">
      <img
        src={course.image || 'https://via.placeholder.com/400x200?text=Course+Image'}
        alt={course.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-5 flex flex-col flex-grow">
        <h3 className="flex items-center text-2xl font-bold text-gray-800 mb-3 gap-2">
          <BookOpenIcon className="w-6 h-6" />
          {course.title}
        </h3>
        <p className="text-gray-600 flex-grow mb-5">{course.description?.slice(0, 120)}...</p>

        <div className="flex justify-between flex-wrap gap-2 mb-5">
          <span className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
            <BookOpenIcon className="w-4 h-4" />
            {course.category?.name || 'Category'}
          </span>
          <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
            <UserCircleIcon className="w-4 h-4" />
            {course.instructor?.username || 'Instructor'}
          </span>
        </div>

        <button
          onClick={() => navigate(`/courses/${course.id}`)}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded-lg transition"
        >
          View Details
        </button>
      </div>
    </div>
  );
}
