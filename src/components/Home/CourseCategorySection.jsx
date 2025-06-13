import React, { useEffect, useState } from "react";
import { getCategories, getCoursesByCategory } from "../../services/courseCategoryService";
import CourseCard from "./CourseCard";

export default function CourseCategorySection() {
  const [categories, setCategories] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [courses, setCourses] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [loadingCourses, setLoadingCourses] = useState(false);
  const [error, setError] = useState(null);

  // Load categories on mount
  useEffect(() => {
    setLoadingCategories(true);
    getCategories()
      .then((data) => {
        setCategories(data);
        if (data.length) setSelectedId(data[0].id);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to load categories.");
      })
      .finally(() => setLoadingCategories(false));
  }, []);

  // Load courses whenever selectedId changes
  useEffect(() => {
    if (!selectedId) return;

    setLoadingCourses(true);
    setError(null);

    getCoursesByCategory(selectedId)
      .then((data) => {
        setCourses(data);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to load courses.");
      })
      .finally(() => setLoadingCourses(false));
  }, [selectedId]);

  if (loadingCategories) {
    return (
      <section className="py-12 text-center text-gray-500">Loading categories...</section>
    );
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-screen-xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-gray-700 mb-10">Explore Courses</h2>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-10">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedId(cat.id)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition border
                ${
                  selectedId === cat.id
                    ? "bg-[#3E64FF] text-white"
                    : "bg-white text-gray-700 border-gray-300 hover:bg-indigo-100"
                }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Error message */}
        {error && (
          <p className="text-center text-red-600 mb-4">{error}</p>
        )}

        {/* Courses Loading */}
        {loadingCourses ? (
          <p className="text-center text-gray-500">Loading courses...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {courses.length > 0 ? (
              courses.map((course) => <CourseCard key={course.id} course={course} />)
            ) : (
              <p className="text-center col-span-full text-gray-600">
                No courses found for this category.
              </p>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
