import { useContext } from "react";
import { useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";

export default function Replies({ discussionId, initialReplies }) {
  const [replies, setReplies] = useState(initialReplies || []);
  const [newReply, setNewReply] = useState("");
  const [loadingReplyPost, setLoadingReplyPost] = useState(false);
  const [error, setError] = useState(null);
  const token = localStorage.getItem("access_token");
  const {user} = useContext(AuthContext);

  const postReply = async () => {
    if (!newReply.trim()) return;
    setLoadingReplyPost(true);
    setError(null);

    try {
      const res = await fetch(`http://localhost:8000/api/replies/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ discussion: discussionId, content: newReply }),
      });

      if (!res.ok) throw new Error("Failed to post reply");

      const reply = await res.json();
      setReplies((prev) => [...prev, reply]);
      setNewReply("");
    } catch (err) {
      console.error(err);
      setError("Error posting reply. Please try again.");
    } finally {
      setLoadingReplyPost(false);
    }
  };

  return (
    <div className="mt-4 pl-4 border-l border-gray-200">
      {replies.length > 0 &&
        replies.map((reply) => (
          <div key={reply.id} className="flex items-start gap-3 mb-4">
            <img
              src={reply.user.profile_pic || "https://via.placeholder.com/32"}
              alt={reply.user.username}
              className="w-8 h-8 rounded-full object-cover border border-gray-400"
            />
            <div className="p-3hover:shadow-md transition w-full">
              <div className="flex justify-between items-center mb-1">
                <p className="text-sm font-semibold text-gray-900">
                  {reply.user.username}
                </p>
                <span className="text-xs text-gray-500 font-semibold select-none">
                  {new Date(reply.created_at).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>
              <p className="text-gray-800 whitespace-pre-line">{reply.content}</p>
            </div>
          </div>
        ))}

      {error && (
        <p className="mt-2 text-red-600 text-sm font-medium">{error}</p>
      )}

      <div className="flex items-center gap-3 mt-2">
        <img
          src={
            user.profile_pic ||
            "https://via.placeholder.com/40"
          }
          alt="Your avatar"
          className="w-10 h-10 rounded-full object-cover border border-gray-400"
        />
        <textarea
          value={newReply}
          onChange={(e) => setNewReply(e.target.value)}
          placeholder="Write a reply..."
          className="flex-1 rounded-3xl border border-gray-300 px-4 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 transition shadow-sm hover:shadow-md"
          rows={1}
          disabled={loadingReplyPost}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              postReply();
            }
          }}
        />
        <button
          onClick={postReply}
          disabled={!newReply.trim() || loadingReplyPost}
          className={`px-5 py-2 rounded-full font-semibold text-white transition-transform transform ${
            newReply.trim() && !loadingReplyPost
              ? "bg-[#3E64FF] hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 active:scale-95"
              : "bg-blue-300 cursor-not-allowed"
          }`}
        >
          {loadingReplyPost ? "Replying..." : "Reply"}
        </button>
      </div>
    </div>
  );
}
