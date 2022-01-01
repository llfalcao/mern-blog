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
          <main className="px-8 py-5 lg:p-10 rounded-xl text-gray-200 lg:bg-zinc-900 lg:border lg:border-gray-700 lg:w-8/12 lg:mx-auto">
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
