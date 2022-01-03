import { useState, useEffect } from 'react';
import { API_URL } from '../../api';
import { v4 as uuidv4 } from 'uuid';
import { DateTime } from 'luxon';

function Comments({ post }) {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState({ post });
  const [reload, setReload] = useState(false);
  const [errors, setErrors] = useState(null);

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

  function handleInput(e) {
    setNewComment({ ...newComment, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const url = `${API_URL}/comments`;
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newComment),
      });

      if (response.status === 200) {
        setErrors(null);
        setReload(true);
        return;
      }

      let data = await response.json();
      for await (const err of data.errors) {
        err.id = uuidv4();
      }
      setErrors(data.errors);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="m-3 p-5 lg:p-10 rounded-xl text-gray-200 bg-zinc-900 lg:border lg:border-gray-700 lg:mx-auto lg:w-8/12">
      <h2 className="mb-5 text-lg font-semibold">Comments</h2>
      <form method="POST" onSubmit={handleSubmit}>
        <input
          className="w-full p-1 pl-2 rounded-sm bg-zinc-700"
          placeholder="Name"
          name="author"
          onChange={handleInput}
        />
        <textarea
          className="w-full h-20 p-1 pl-2 my-2 rounded-sm bg-zinc-700"
          placeholder="Comment"
          name="text"
          onChange={handleInput}
        >
          {newComment.text}
        </textarea>
        <button
          type="submit"
          className="w-full py-2 px-2 rounded-md bg-blue-500 active:bg-blue-600 font-semibold"
          onSubmit={handleSubmit}
        >
          Submit
        </button>

        {errors ? (
          <ul className="ml-3 mt-2 list-disc">
            {errors.map((err) => (
              <li key={err.id} className="text-red-500">
                {err.msg}
              </li>
            ))}
          </ul>
        ) : null}
      </form>

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
