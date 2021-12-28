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
    <div>
      {comments.length > 0 ? (
        comments.map((comment) => (
          <div key={comment._id}>
            <span>{comment.author.username}</span>
            <p>{comment.text}</p>
            <span>{comment.created_at}</span>
          </div>
        ))
      ) : (
        <p>There are no comments yet.</p>
      )}
    </div>
  );
}

export default Comments;
