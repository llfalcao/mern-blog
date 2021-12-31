import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import LoadingIndicator from '../../components/LoadingIndicator';
import { API_URL } from '../../api';

function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    (async function getPosts() {
      try {
        // heroku soon(tm)
        const url = `${API_URL}/posts`;
        const response = await fetch(url);
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        setPosts(error);
      }
    })();
  }, []);

  return (
    <>
      <main className="m-4 flex flex-col">
        {posts.length > 0 ? (
          posts.map((post) => (
            <Link
              to={`/posts/${post._id}`}
              key={post._id}
              className="mb-4 p-4 text-gray-800 rounded-xl bg-zinc-800 post"
            >
              <h2 className="text-lg font-medium text-sky-200 tracking-wide">
                {post.title}
              </h2>
              <p className="my-2 text-sm text-gray-300 tracking-wide">
                {post.text.substring(0, 69)}...
              </p>

              <span className="text-sm text-gray-400">{post.created_at}</span>

              {post.updated_at ? (
                <span className="text-sm text-gray-400">{post.updated_at}</span>
              ) : null}
            </Link>
          ))
        ) : (
          <LoadingIndicator />
        )}
      </main>
    </>
  );
}

export default Home;
