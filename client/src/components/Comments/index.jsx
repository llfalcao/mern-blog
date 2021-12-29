import { useState, useEffect } from 'react';

function Comments({ post }) {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const url = `http://192.168.100.3:5000/api/v1/posts/${post}/comments`;
        const response = await fetch(url);
        const data = await response.json();
        setComments(data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [post]);

  return (
    <div className="m-3 p-5 rounded-md text-gray-200 bg-zinc-800">
      <h2 className="mb-5 text-lg font-semibold">Comments</h2>
      {comments.length > 0 ? (
        comments.map((comment) => (
          <div key={comment._id}>
            <span className="font-semibold">{comment.author.username}</span>
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
