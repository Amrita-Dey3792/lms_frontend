import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import { BookOpenIcon } from "@heroicons/react/24/solid";
import {
  TagIcon,
  UserCircleIcon,
  ClockIcon,
  PlayCircleIcon,
  ArrowRightIcon,
} from "@heroicons/react/24/outline";
import { useParams } from "react-router-dom";
import Discussions from "../components/CourseDetailsPage/Discussions";

const CourseDetails = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeLessonId, setActiveLessonId] = useState(null);
  const token = localStorage.getItem("access_token");

  useEffect(() => {
  fetch(`http://localhost:8000/api/courses/${id}/`, {
    headers: { Authorization: `Bearer ${token}` },
  })
    .then((res) => {
      if (res.status === 403 || res.status === 401) {
        // User is not enrolled or unauthorized
        throw new Error("You must be enrolled in this course to view the details.");
      }
      if (!res.ok) throw new Error("Failed to fetch course details");
      return res.json();
    })
    .then((data) => {
      setCourse(data);
      setLoading(false);
    })
    .catch((err) => {
      setError(err.message);
      setLoading(false);
    });
}, [id, token]);


  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="loader border-4 border-indigo-600 border-t-transparent rounded-full w-14 h-14 animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-600 text-center p-6 font-semibold">{error}</div>
    );
  }

  if (!course) return null;


  return (
    <div className="max-w-screen-xl mx-auto px-4 py-12 space-y-12">
      {/* Course Header */}
      <div className="flex flex-col md:flex-row items-center md:items-start gap-12 bg-gradient-to-r from-indigo-50 to-white rounded-xl shadow-md p-4 md:p-8">
        {course.image && (
          <img
            src={course.image}
            alt={course.title}
            className="w-full md:w-80 h-64 object-cover rounded-xl shadow-sm hover:scale-105 transition-transform duration-300"
          />
        )}

        <div className="flex-1 space-y-6">
          <h1 className="text-3xl md:text-5xl font-extrabold text-indigo-700 drop-shadow-md">
            {course.title}
          </h1>
          <p className="text-base md:text-lg text-gray-700 leading-relaxed">
            {course.description}
          </p>

          <div className="flex flex-wrap gap-5 mt-4">
            <div className="flex items-center gap-2 bg-indigo-100 text-indigo-700 px-4 py-2 rounded-lg text-sm font-medium shadow-sm">
              <TagIcon className="w-5 h-5" />
              <span>{course.category?.name || "N/A"}</span>
            </div>

            <div className="flex items-center gap-2 bg-purple-100 text-purple-700 px-4 py-2 rounded-lg text-sm font-medium shadow-sm">
              <UserCircleIcon className="w-5 h-5" />
              <span>{course.instructor || "N/A"}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Modules & Lessons */}
      <section aria-labelledby="course-content-heading">
        <h2
          id="course-content-heading"
          className="flex items-center text-3xl font-semibold mb-6 text-indigo-600 border-b-2 border-indigo-400 pb-2 tracking-wide gap-2"
        >
          <BookOpenIcon className="w-8 h-8 text-indigo-500" />
          Course Content
        </h2>

        {course.modules?.length ? (
          <div className="space-y-10">
            {course.modules.map((module) => (
              <div
                key={module.id}
                className="bg-gradient-to-r from-indigo-50 via-white to-indigo-50 rounded-xl shadow-sm p-4 md:p-8 hover:shadow-md transition-shadow duration-500 border border-indigo-200"
              >
                {/* Module Header */}
                <div className="flex items-center gap-3 mb-6">
                  <div className="bg-indigo-600 p-3 rounded-full shadow-sm text-white">
                    <ClockIcon className="h-6 w-6" />
                  </div>
                  <h3 className="text-2xl font-semibold text-indigo-700 tracking-tight">
                    {module.title}
                  </h3>
                </div>

                {/* Lessons */}
                {module.lessons?.length ? (
                  <ul className="divide-y divide-indigo-200 rounded-md border border-indigo-100 shadow-sm bg-white">
                    {module.lessons.map((lesson) => (
                      <li
                        key={lesson.id}
                        className="flex flex-col gap-2 px-6 py-3 hover:bg-indigo-50 transition-colors cursor-pointer rounded-md"
                      >
                        <div
                          className="flex items-center justify-between text-indigo-600 font-medium text-base"
                          onClick={() =>
                            setActiveLessonId(
                              activeLessonId === lesson.id ? null : lesson.id
                            )
                          }
                        >
                          <div className="flex items-center gap-3">
                            <ArrowRightIcon className="h-6 w-6" />
                            <span>{lesson.title}</span>
                          </div>

                          {lesson.video_url && (
                            <div className="flex items-center gap-1 text-indigo-700 font-semibold text-sm">
                              <PlayCircleIcon className="w-5 h-5" />
                              <span>
                                {activeLessonId === lesson.id
                                  ? "Hide Video"
                                  : "Watch"}
                              </span>
                            </div>
                          )}
                        </div>

                        {/* Inline video player */}
                        {activeLessonId === lesson.id && lesson.video_url && (
                          <div className="mt-2 rounded overflow-hidden shadow-sm">
                            <ReactPlayer
                              url={lesson.video_url}
                              controls={true}
                              width="100%"
                              height="600px"
                            />
                          </div>
                        )}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="italic text-gray-500">
                    No lessons available in this module.
                  </p>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p className="italic text-gray-500 text-center text-lg">
            No modules available for this course.
          </p>
        )}
      </section>

      <Discussions courseId={course.id} />
    </div>
  );
};

export default CourseDetails;
