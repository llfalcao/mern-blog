import { useState, useEffect } from 'react';
import { API_URL } from '../../api';
import { DateTime } from 'luxon';
import auth from '../../auth';

function Comments({ post }) {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async function getComments() {
      try {
        const url = `${API_URL}/posts/${post._id}/comments`;
        const response = await fetch(url);
        const data = await response.json();
        setComments(data);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    })();
  }, [post, loading]);

  async function onDelete(commentId) {
    try {
      const url = `${API_URL}/comments/${commentId}/delete`;
      const response = await fetch(url, {
        method: 'POST',
        headers: { Authorization: auth },
      });

      if (response.status === 200) setLoading(true);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="mt-10 p-5 lg:p-10 rounded-xl text-gray-200 bg-zinc-900 lg:border lg:border-gray-700 lg:mx-auto">
      <h2 className="mb-5 text-lg font-semibold">Comments</h2>

      {comments.length > 0 ? (
        <ul className="mt-10">
          {comments.map((comment) => (
            <li
              key={comment._id}
              className="flex justify-between p-2 px-5 odd:bg-zinc-800 even:bg-zinc-700"
            >
              <div>
                <span className="text-sm font-semibold">{comment.author}</span>

                {comment.text.split('\n').map((line, i) => (
                  <p key={`${comment._id}${i}`} className="text-sm">
                    {line}
                  </p>
                ))}

                <span className="text-xs text-gray-400">
                  {DateTime.fromISO(comment.created_at).toLocaleString(
                    DateTime.DATETIME_FULL_WITH_SECONDS,
                  )}
                </span>
              </div>
              <button
                type="button"
                className="h-max mt-2 bg-red-700 text-gray-200 text-sm rounded px-4 py-2 duration-150 hover:bg-red-600 hover:text-gray-100"
                onClick={() => onDelete(comment._id)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-10">There are no comments yet.</p>
      )}
    </div>
  );
}

export default Comments;
