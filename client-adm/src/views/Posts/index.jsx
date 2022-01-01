import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { DateTime } from 'luxon';
import { API_URL } from '../../api';
import LoadingIndicator from '../../components/LoadingIndicator';

function Posts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_URL}/posts`);
        const data = await response.json();
        console.log(data);
        setPosts(data);
        setLoading(false);
      } catch (err) {
        console.error(err);
      }
    })();
  }, []);

  return (
    <main className="p-5 flex flex-col gap-3">
      {posts.length > 0 ? (
        posts.map((post) => (
          <div
            key={post._id}
            className="p-4 mx-auto flex flex-col justify-between text-gray-800 rounded-md bg-zinc-800 shadow-md ease-out duration-150 lg:w-8/12 lg:border lg:border-gray-700 hover:border-gray-500"
          >
            <Link to="/posts">
              <h2 className="text-lg font-medium text-sky-200 tracking-wide hover:underline">
                {post.title}
              </h2>
            </Link>

            <div className="flex flex-row justify-between items-center">
              <span className="text-sm text-gray-400">
                {DateTime.fromISO(post.created_at).toLocaleString(
                  DateTime.DATETIME_MED,
                )}
                {post.updated_at ? (
                  <span className="text-sm text-gray-400">
                    (updated{' '}
                    {DateTime.fromISO(post.updated_at).toLocaleString(
                      DateTime.DATETIME_MED,
                    )}
                    )
                  </span>
                ) : null}
              </span>

              <div>
                <span className="text-white">
                  {/* TODO: publish/unpublish post */}
                </span>
                <Link
                  to={`/${post._id}/edit`}
                  className="mx-2 bg-gray-600 text-gray-200 text-sm rounded px-4 py-2 duration-150 hover:bg-gray-500 hover:text-gray-100"
                >
                  Edit
                </Link>
                <Link
                  to={`/${post._id}/delete`}
                  className="bg-red-700 text-gray-200 text-sm rounded px-4 py-2 duration-150 hover:bg-red-600 hover:text-gray-100"
                >
                  Delete
                </Link>
              </div>
            </div>
          </div>
        ))
      ) : loading ? (
        <LoadingIndicator />
      ) : (
        <h1
          className="text-gray-200 text-3xl text-center"
          style={{ textShadow: '0 2px #000' }}
        >
          There are no posts.
        </h1>
      )}
    </main>
  );
}

export default Posts;
