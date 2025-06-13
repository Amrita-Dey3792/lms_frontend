import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import {
  TagIcon,
  UserCircleIcon,
  PlayCircleIcon,
  ArrowRightIcon,
} from "@heroicons/react/24/outline";
import { CheckIcon } from "@heroicons/react/24/solid";
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
    const fetchCourse = async () => {
      try {
        const res = await fetch(`http://localhost:8000/api/courses/${id}/`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.status === 403 || res.status === 401) {
          throw new Error(
            "You must be enrolled in this course to view the details."
          );
        }

        if (!res.ok) throw new Error("Failed to fetch course details");

        const data = await res.json();
        setCourse(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [id, token]);

  const markLessonAsCompleted = async (lessonId) => {
    try {
      const res = await fetch("http://localhost:8000/api/completed-lessons/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          enrollment: course.enrollment_id,
          lesson: lessonId,
        }),
      });

      if (!res.ok) {
        const errData = await res.json();
        console.error("Error completing lesson:", errData);
        return;
      }

      // Update course state locally to reflect completed lesson
      setCourse((prev) => {
        const updatedModules = prev.modules.map((module) => ({
          ...module,
          lessons: module.lessons.map((lesson) =>
            lesson.id === lessonId ? { ...lesson, is_completed: true } : lesson
          ),
        }));

        return { ...prev, modules: updatedModules };
      });

      console.log("Lesson marked as completed successfully");
    } catch (error) {
      console.error("Request failed:", error);
    }
  };

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
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-3 md:p-6">
      <div className="max-w-screen-xl mx-auto space-y-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row gap-10 bg-white rounded-xl shadow-md p-6">
          {course.image && (
            <img
              src={course.image}
              alt={course.title}
              className="w-full md:w-80 h-64 object-cover rounded-lg shadow-sm"
            />
          )}
          <div className="flex-1 space-y-3">
            <h1 className="text-3xl font-bold text-gray-800">{course.title}</h1>
            <p className="text-gray-700">{course.description}</p>
            <div className="flex gap-5 flex-wrap pt-2">
              <div className="badge badge-accent p-4">
                <TagIcon className="w-5 h-5" />
                <span className="ml-2">{course.category?.name || "N/A"}</span>
              </div>
              <div className="badge badge-info p-4">
                <UserCircleIcon className="w-5 h-5" />
                <span className="ml-2">{course.instructor || "N/A"}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Modules and Lessons */}
        <section>
          <h2 className="text-2xl font-bold text-center mb-6">Course Content</h2>
          <div className="divider"></div>

          {course.modules?.length ? (
            <div className="space-y-10">
              {course.modules.map((module, index) => (
                <div
                  key={module.id}
                  className="bg-white rounded-xl shadow-md p-4 md:p-6"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="bg-green-600 text-white p-3 rounded-lg text-center font-semibold">
                      Module
                      <div>{index + 1}</div>
                    </div>
                    <h3 className="text-xl font-semibold">{module.title}</h3>
                  </div>

                  {module.lessons?.length ? (
                    <ul className="divide-y divide-indigo-100 border border-indigo-200 rounded-md">
                      {module.lessons.map((lesson) => (
                        <li
                          key={lesson.id}
                          onClick={() => {
                            if (!lesson.is_completed) {
                              markLessonAsCompleted(lesson.id);
                            }
                            setActiveLessonId((prev) =>
                              prev === lesson.id ? null : lesson.id
                            );
                          }}
                          className="px-4 py-3 hover:bg-indigo-50 cursor-pointer"
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              {lesson.is_completed ? (
                                <CheckIcon className="h-5 w-5 text-green-600" />
                              ) : (
                                <ArrowRightIcon className="h-5 w-5 text-gray-600" />
                              )}
                              <span>{lesson.title}</span>
                            </div>

                            {lesson.video_url && (
                              <div className="flex items-center gap-1 text-indigo-700">
                                <PlayCircleIcon className="w-5 h-5" />
                                <span>
                                  {activeLessonId === lesson.id
                                    ? "Hide Video"
                                    : "Watch"}
                                </span>
                              </div>
                            )}
                          </div>

                          {activeLessonId === lesson.id && lesson.video_url && (
                            <div className="mt-4 rounded overflow-hidden">
                              <ReactPlayer
                                url={lesson.video_url}
                                controls
                                width="100%"
                                height="500px"
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
            <p className="text-center text-gray-500 text-lg">
              No modules available.
            </p>
          )}
        </section>

        {/* Discussions */}
        <Discussions courseId={course.id} />
      </div>
    </div>
  );
};

export default CourseDetails;
