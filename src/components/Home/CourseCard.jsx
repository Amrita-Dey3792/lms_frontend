import { ArrowRightIcon, BookOpenIcon, UserCircleIcon } from '@heroicons/react/24/solid';
import { useNavigate } from 'react-router-dom';

export default function CourseCard({ course }) {
  const navigate = useNavigate();

  return (
    <div className="bg-[#FDFDFD] rounded-xl border border-[#E5E5E5] shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col overflow-hidden">
      <img
        src={course.image || 'https://via.placeholder.com/400x200?text=Course+Image'}
        alt={course.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-5 flex flex-col flex-grow">
        <h3 className="flex items-center text-2xl font-semibold text-[#14213D] mb-3 gap-2">
          {course.title}
        </h3>

        <p className="text-[#1E1E1E] flex-grow mb-5">
          {course.description?.slice(0, 120)}...
        </p>

        <div className="flex justify-between flex-wrap gap-2 mb-5">
          <div className="badge badge-soft badge-primary">{course.category?.name || 'Category'}</div>
          <div className="badge badge-soft badge-success">{course.instructor || 'Instructor'}</div>
        </div>

        <button
          onClick={() => navigate(`/courses/${course.id}`)}
          className="bg-gray-200 hover:bg-gray-300  font-semibold py-2 rounded-lg transition flex items-center justify-center gap-2"
        >
          
          View Details <ArrowRightIcon className='w-5 h-5' />
        </button>
      </div>
    </div>
  );
}
