import { useState, useEffect } from 'react';
import { API_URL } from '../../api';

function Comments({ post }) {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState({ post });

  useEffect(() => {
    (async () => {
      try {
        const url = `${API_URL}/posts/${post}/comments`;
        const response = await fetch(url);
        const data = await response.json();
        setComments(data);
      } catch (error) {
        console.error(error);
      }
    })();
  }, [post]);

  function handleInput(e) {
    setNewComment((prev) => {
      const next = prev;
      next[e.target.name] = e.target.value;
      return next;
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    const url = `${API_URL}/comments`;
    fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ newComment }),
    });
  }

  return (
    <div className="m-3 p-5 rounded-md text-gray-200 bg-zinc-800">
      <h2 className="mb-5 text-lg font-semibold">Comments</h2>
      <form method="POST" onSubmit={handleSubmit}>
        <input
          className="w-full p-1 pl-2 rounded-md bg-zinc-700"
          placeholder="Name"
          name="author"
          value={newComment.author}
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
          className="w-full mb-10 py-2 px-2 rounded-md bg-blue-500 active:bg-blue-600 font-semibold"
          onSubmit={handleSubmit}
        >
          Submit
        </button>
      </form>

      {comments.length > 0 ? (
        comments.map((comment) => (
          <div key={comment._id}>
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
