import { useState, useEffect } from 'react';
import Comments from '../../components/Comments';
import LoadingIndicator from '../../components/LoadingIndicator';
import { API_URL } from '../../api';

function Post() {
  const [post, setPost] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const { pathname } = window.location;
        const url = `${API_URL}${pathname}`;
        const response = await fetch(url);
        const data = await response.json();
        setPost(data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return (
    <>
      {post ? (
        <>
          <main className="p-5 rounded-md text-gray-200">
            <h1 className="text-xl font-semibold">{post.title}</h1>
            <span className="text-gray-400">{post.created_at}</span>
            <p className="mt-5">{post.text}</p>
          </main>
          <Comments post={post._id} />
        </>
      ) : (
        <LoadingIndicator />
      )}
    </>
  );
}

export default Post;
