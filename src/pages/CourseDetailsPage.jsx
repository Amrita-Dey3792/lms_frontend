import React, { useState } from 'react';

export const CourseDetailsPage = () => {
  const course = {
    title: 'React Basics',
    description: 'Learn React from scratch with hands-on examples and real-world projects.',
    instructor: 'Jane Doe',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80',
    modules: [
      {
        id: 1,
        title: 'Introduction',
        lessons: [
          { id: 1, title: 'What is React?', completed: true },
          { id: 2, title: 'JSX Basics', completed: false },
        ],
      },
      {
        id: 2,
        title: 'Advanced Topics',
        lessons: [
          { id: 3, title: 'Hooks', completed: false },
          { id: 4, title: 'Context API', completed: false },
        ],
      },
    ],
  };

  // Use state to track lessons completion dynamically
  const [modules, setModules] = useState(course.modules);

  // Toggle lesson completion state
  const toggleLessonCompletion = (moduleId, lessonId) => {
    setModules(prevModules =>
      prevModules.map(module =>
        module.id === moduleId
          ? {
              ...module,
              lessons: module.lessons.map(lesson =>
                lesson.id === lessonId ? { ...lesson, completed: !lesson.completed } : lesson
              ),
            }
          : module
      )
    );
  };

  return (
    <div className="max-w-4xl mx-auto p-6 mt-10 bg-white shadow rounded">
      {/* Course Image */}
      {course.image && (
        <img
          src={course.image}
          alt={`${course.title} cover`}
          className="w-full h-64 object-cover rounded mb-6"
        />
      )}

      <h1 className="text-3xl font-bold mb-4">{course.title}</h1>
      <p className="mb-4 text-gray-700">{course.description}</p>
      <p className="mb-8 text-gray-500">Instructor: {course.instructor}</p>

      {modules.map(module => (
        <div key={module.id} className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">{module.title}</h2>
          <ul>
            {module.lessons.map(lesson => (
              <li
                key={lesson.id}
                className={`flex items-center mb-3 cursor-pointer ${
                  lesson.completed ? 'line-through text-gray-400' : ''
                }`}
                onClick={() => toggleLessonCompletion(module.id, lesson.id)}
              >
                <input
                  type="checkbox"
                  checked={lesson.completed}
                  readOnly
                  className="mr-4 cursor-pointer"
                />
                <span>{lesson.title}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};
