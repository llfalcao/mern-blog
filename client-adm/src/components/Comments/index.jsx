import { useState, useEffect } from 'react';
import { API_URL } from '../../api';
import { DateTime } from 'luxon';

function Comments({ post }) {
  const [comments, setComments] = useState([]);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    (async function getComments() {
      try {
        const url = `${API_URL}/posts/${post}/comments`;
        const response = await fetch(url);
        const data = await response.json();
        setComments(data);
        setReload(false);
      } catch (error) {
        console.error(error);
      }
    })();
  }, [post, reload]);

  return (
    <div className="mt-10 p-5 lg:p-10 rounded-xl text-gray-200 bg-zinc-900 lg:border lg:border-gray-700 lg:mx-auto">
      <h2 className="mb-5 text-lg font-semibold">Comments</h2>

      {comments.length > 0 ? (
        <ul className="mt-10">
          {comments.map((comment) => (
            <li
              key={comment._id}
              className="py-1 border-b last:border-none border-gray-200"
            >
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
