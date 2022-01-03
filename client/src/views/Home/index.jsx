import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import LoadingIndicator from '../../components/LoadingIndicator';
import { API_URL } from '../../api';
import { DateTime } from 'luxon';

function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async function getPosts() {
      try {
        // heroku soon(tm)
        setLoading(true);
        const url = `${API_URL}/posts`;
        const response = await fetch(url);
        const data = await response.json();
        setPosts(data);
        setLoading(false);
      } catch (error) {
        setPosts(error);
      }
    })();
  }, []);

  return (
    <>
      <main className="m-4 flex flex-col gap-4 lg:flex-col lg:w-6/12 lg:mx-auto lg:justify-center">
        {posts.length > 0 ? (
          posts.map((post) => (
            <div
              key={post._id}
              className="p-4 flex flex-col justify-between gap-4 text-gray-800 rounded-xl bg-zinc-800 shadow-md ease-out duration-150 lg:shadow-none lg:bg-zinc-900 lg:p-7 lg:border lg:border-gray-700 hover:border-gray-500"
            >
              <div>
                <Link to={`/posts/${post._id}`}>
                  <h2 className="text-lg font-medium text-sky-200 tracking-wide hover:underline">
                    {post.title}
                  </h2>
                </Link>
                <p className="my-2 text-sm text-gray-300 tracking-wide">
                  {post.text.substring(0, 150)}...
                </p>
              </div>

              <div className="flex flex-row justify-between items-center">
                <span className="text-sm text-gray-400">
                  {DateTime.fromISO(post.created_at).toLocaleString(
                    DateTime.DATETIME_MED,
                  )}
                  {post.updated_at ? (
                    <span className="text-sm text-gray-400">
                      {' '}
                      (updated{' '}
                      {DateTime.fromISO(post.updated_at).toLocaleString(
                        DateTime.DATETIME_MED,
                      )}
                      )
                    </span>
                  ) : null}
                </span>

                <Link
                  to={`/posts/${post._id}`}
                  className="bg-green-700 text-gray-200 text-sm rounded px-4 py-2 duration-150 hover:bg-green-600 hover:text-gray-100"
                >
                  Read
                </Link>
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
    </>
  );
}

export default Home;
