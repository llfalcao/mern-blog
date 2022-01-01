import { useState, useEffect } from 'react';
import { API_URL } from '../../api';
import { v4 as uuidv4 } from 'uuid';

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
    setNewComment((prev) => {
      const next = prev;
      next[e.target.name] = e.target.value;
      return next;
    });
  }

  async function handleSubmit(e) {
    try {
      e.preventDefault();
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
    <div className="m-3 p-5 rounded-xl text-gray-200 bg-zinc-900 lg:border lg:border-gray-700 lg:mx-auto lg:w-8/12">
      <h2 className="mb-5 text-lg font-semibold">Comments</h2>
      <form method="POST" onSubmit={handleSubmit}>
        <input
          className="w-full p-1 pl-2 rounded-md bg-zinc-700"
          placeholder="Name"
          name="author"
          onChange={handleInput}
        />
        <textarea
          className="w-full h-20 p-1 pl-2 my-2 rounded-md bg-zinc-700"
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
        comments.map((comment) => (
          <div key={comment._id} className="mt-10">
            <span className="font-semibold">{comment.author}</span>
            <p>{comment.text}</p>
            <span className="text-xs text-gray-400">{comment.created_at}</span>
          </div>
        ))
      ) : (
        <p>There are no comments yet.</p>
      )}
    </div>
  );
}

export default Comments;
