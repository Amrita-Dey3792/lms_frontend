  import React, { useEffect, useState } from 'react';
  import { getCategories } from '../../services/categoryService';
  import CourseCard from './CourseCard';

  // Sample courses data simulating the Course model fields
  const sampleCourses = {
    1: [
      {
        id: 101,
        title: "HTML Basics",
        description: "Learn the basics of HTML for web development.",
        category: { name: "Web Design" },
        instructor: { username: "alice" },
        image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=400&q=80", // laptop with code
        created_at: "2025-06-01T10:00:00Z",
      },
      {
        id: 102,
        title: "CSS Layouts",
        description: "Master CSS Grid and Flexbox layouts.",
        category: { name: "Web Design" },
        instructor: { username: "bob" },
        image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=400&q=80", // desktop and code
        created_at: "2025-06-03T12:30:00Z",
      },
    ],
    2: [
      {
        id: 201,
        title: "JavaScript Essentials",
        description: "Understand core JavaScript concepts and syntax.",
        category: { name: "Programming" },
        instructor: { username: "charlie" },
        image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=400&q=80", // js code on screen
        created_at: "2025-05-28T08:45:00Z",
      },
    ],
    3: [
      {
        id: 301,
        title: "Python Intro",
        description: "Introduction to Python programming language.",
        category: { name: "Programming" },
        instructor: { username: "diana" },
        image: "https://images.unsplash.com/photo-1517433456452-f9633a875f6f?auto=format&fit=crop&w=400&q=80", // python code screen
        created_at: "2025-05-30T15:20:00Z",
      },
    ],
    4: [
      {
        id: 401,
        title: "Data Structures",
        description: "Learn data structures for efficient algorithms.",
        category: { name: "Computer Science" },
        instructor: { username: "edward" },
        image: "https://images.unsplash.com/photo-1537432376769-00a8e8cbd04f?auto=format&fit=crop&w=400&q=80", // algorithm and code
        created_at: "2025-06-05T09:10:00Z",
      },
    ],
  };


  export default function CourseCategorySection() {
    const [categories, setCategories] = useState([]);
    const [selectedId, setSelectedId] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      getCategories()
        .then(data => {
          setCategories(data);
          if (data.length) setSelectedId(data[0].id);
        })
        .catch(console.error)
        .finally(() => setLoading(false));
    }, []);

    if (loading) {
      return (
        <section className="py-12 text-center text-gray-500">Loading categories...</section>
      );
    }

    return (
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-10">Explore Courses</h2>

          {/* Category Tabs */}
          <div className="flex flex-wrap justify-center gap-4 mb-10">
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedId(cat.id)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition border
                  ${selectedId === cat.id
                    ? "bg-indigo-600 text-white border-indigo-600"
                    : "bg-white text-gray-700 border-gray-300 hover:bg-indigo-100"}`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Course List */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {(sampleCourses[selectedId] || []).map(course => (
              <CourseCard
                key={course.id}
                course={course}
              />
            ))}
          </div>
        </div>
      </section>
    );
  }
