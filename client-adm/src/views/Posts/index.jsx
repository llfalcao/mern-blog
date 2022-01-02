import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { DateTime } from 'luxon';
import { API_URL } from '../../api';
import LoadingIndicator from '../../components/LoadingIndicator';

function Posts() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_URL}/posts`);
        const data = await response.json();
        setPosts(data);
        setLoading(false);
      } catch (err) {
        console.error(err);
      }
    })();
  }, []);

  async function togglePostVisibility(post) {
    try {
      const updatedPost = { ...post, private: !post.private };
      const response = await fetch(`${API_URL}/posts/${post._id}/edit`, {
        method: 'POST',
        Accept: 'application/json',
        'Content-Type': 'application/json',
        body: JSON.stringify(updatedPost),
      });

      if (response.status === 200) {
        return navigate('/');
      }

      console.log(response);
      console.log(await response.json());
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <main className="p-5 flex flex-col gap-3">
      {posts.length > 0 ? (
        posts.map((post) => (
          <div
            key={post._id}
            className="p-4 mx-auto flex flex-col justify-between text-gray-800 rounded-md bg-zinc-800 shadow-md ease-out duration-150 w-full lg:w-8/12 lg:border lg:border-gray-700 hover:border-gray-500"
          >
            <Link to={`${post}/edit`}>
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

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => togglePostVisibility(post)}
                >
                  {post.private ? (
                    <svg
                      className="bg-gray-500 rounded-full p-1 fill-gray-300 duration-150 border border-gray-500 hover:border-gray-400"
                      xmlns="http://www.w3.org/2000/svg"
                      width="30"
                      height="30"
                      viewBox="0 0 24 24"
                    >
                      <path d="M19.604 2.562l-3.346 3.137c-1.27-.428-2.686-.699-4.243-.699-7.569 0-12.015 6.551-12.015 6.551s1.928 2.951 5.146 5.138l-2.911 2.909 1.414 1.414 17.37-17.035-1.415-1.415zm-6.016 5.779c-3.288-1.453-6.681 1.908-5.265 5.206l-1.726 1.707c-1.814-1.16-3.225-2.65-4.06-3.66 1.493-1.648 4.817-4.594 9.478-4.594.927 0 1.796.119 2.61.315l-1.037 1.026zm-2.883 7.431l5.09-4.993c1.017 3.111-2.003 6.067-5.09 4.993zm13.295-4.221s-4.252 7.449-11.985 7.449c-1.379 0-2.662-.291-3.851-.737l1.614-1.583c.715.193 1.458.32 2.237.32 4.791 0 8.104-3.527 9.504-5.364-.729-.822-1.956-1.99-3.587-2.952l1.489-1.46c2.982 1.9 4.579 4.327 4.579 4.327z" />
                    </svg>
                  ) : (
                    <svg
                      className="bg-green-700 rounded-full p-1 fill-gray-300 duration-150 border border-gray-500 hover:border-gray-400"
                      xmlns="http://www.w3.org/2000/svg"
                      width="30"
                      height="30"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12.015 7c4.751 0 8.063 3.012 9.504 4.636-1.401 1.837-4.713 5.364-9.504 5.364-4.42 0-7.93-3.536-9.478-5.407 1.493-1.647 4.817-4.593 9.478-4.593zm0-2c-7.569 0-12.015 6.551-12.015 6.551s4.835 7.449 12.015 7.449c7.733 0 11.985-7.449 11.985-7.449s-4.291-6.551-11.985-6.551zm-.015 3c-2.21 0-4 1.791-4 4s1.79 4 4 4c2.209 0 4-1.791 4-4s-1.791-4-4-4zm-.004 3.999c-.564.564-1.479.564-2.044 0s-.565-1.48 0-2.044c.564-.564 1.479-.564 2.044 0s.565 1.479 0 2.044z" />
                    </svg>
                  )}
                </button>

                <Link
                  to={`/${post._id}/edit`}
                  className="bg-gray-600 text-gray-200 text-sm rounded px-4 py-2 duration-150 hover:bg-gray-500 hover:text-gray-100"
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
