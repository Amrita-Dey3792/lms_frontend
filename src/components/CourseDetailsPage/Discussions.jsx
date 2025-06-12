import React, { useEffect, useState } from "react";
import Replies from "./Replies";

function Discussions({ courseId }) {
  const [discussions, setDiscussions] = useState([]);
  const [newDiscussion, setNewDiscussion] = useState("");
  const [loadingDiscussions, setLoadingDiscussions] = useState(false);
  const [loadingPost, setLoadingPost] = useState(false);
  const [error, setError] = useState(null);
  const token = localStorage.getItem("access_token");

  useEffect(() => {
    const fetchDiscussions = async () => {
      setLoadingDiscussions(true);
      setError(null);
      try {
        const res = await fetch(
          `http://localhost:8000/api/discussions/?course=${courseId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        if (!res.ok) throw new Error("Failed to load discussions");
        const data = await res.json();
        setDiscussions(data);
      } catch (err) {
        console.error(err);
        setError("Could not load discussions. Please try again.");
      } finally {
        setLoadingDiscussions(false);
      }
    };

    fetchDiscussions();
  }, [courseId, token]);

  const postDiscussion = async () => {
    if (!newDiscussion.trim()) return;
    setLoadingPost(true);
    setError(null);
    try {
      const res = await fetch(`http://localhost:8000/api/discussions/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ course: courseId, content: newDiscussion }),
      });
      if (!res.ok) throw new Error("Failed to post discussion");
      const newDisc = await res.json();
      setDiscussions((prev) => [newDisc, ...prev]);
      setNewDiscussion("");
    } catch (err) {
      console.error(err);
      setError("Error posting discussion. Please try again.");
    } finally {
      setLoadingPost(false);
    }
  };

  return (
    <div>
      <h3 className="text-3xl text-indigo-600 font-semibold text-grey-600 mb-8">
        Discussions
      </h3>

      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <textarea
          value={newDiscussion}
          onChange={(e) => {
            setNewDiscussion(e.target.value);
            if (error) setError(null);
          }}
          placeholder="Ask something or share your thoughts..."
          className="flex-1 rounded-2xl border border-indigo-300 p-4 resize-y focus:outline-none focus:ring-1 focus:ring-indigo-400 transition shadow-sm hover:shadow-md min-h-[100px] font-medium text-gray-800 "
          disabled={loadingPost}
          rows={4}
          onKeyDown={(e) => {
            if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
              e.preventDefault();
              postDiscussion();
            }
          }}
        />
        <button
          onClick={postDiscussion}
          disabled={!newDiscussion.trim() || loadingPost}
          className={`self-start rounded-2xl px-7 py-3 font-semibold text-white transition-transform transform ${
            newDiscussion.trim() && !loadingPost
              ? "bg-indigo-700 hover:bg-indigo-800 focus:ring-4 focus:ring-indigo-300 active:scale-95"
              : "bg-indigo-300 cursor-not-allowed"
          }`}
        >
          {loadingPost ? "Posting..." : "Post"}
        </button>
      </div>

      {error && (
        <p className="mb-6 text-center text-red-600 font-semibold">{error}</p>
      )}

      {loadingDiscussions ? (
        <p className="text-center text-gray-500 italic">Loading discussions...</p>
      ) : discussions.length === 0 ? (
        <p className="text-center text-gray-500 italic">No discussions yet.</p>
      ) : (
        discussions.map((disc) => (
          <div
            key={disc.id}
            className="mb-8 p-6 bg-white rounded-2xl border border-indigo-200 shadow-md hover:shadow-lg transition-shadow duration-300"
          >
            <div className="flex items-start gap-5">
              <img
                src={disc.user.profile_pic || "https://via.placeholder.com/48"}
                alt={disc.user.username}
                className="w-12 h-12 rounded-full object-cover border-2 border-indigo-400 shadow-sm"
              />
              <div className="flex-1">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-semibold text-indigo-900 text-lg">
                    {disc.user.username}
                  </h4>
                  <span className="text-xs text-indigo-400 italic select-none">
                    {new Date(disc.created_at).toLocaleString()}
                  </span>
                </div>
                <p className="text-gray-700 whitespace-pre-line leading-relaxed mb-5 font-medium">
                  {disc.content}
                </p>

                <hr className="border-indigo-200 mb-5" />
                <Replies discussionId={disc.id} initialReplies={disc.replies} />
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default Discussions;
