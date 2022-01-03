import { useState, useEffect } from 'react';
import Comments from '../../components/Comments';
import LoadingIndicator from '../../components/LoadingIndicator';
import { API_URL } from '../../api';
import { DateTime } from 'luxon';

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
            <span className="text-gray-400 text-sm">
              {DateTime.fromISO(post.created_at).toLocaleString(
                DateTime.DATETIME_MED,
              )}
            </span>
            <div className="mt-5">
              {post.text.split('\n').map((line, i) => (
                <p key={`${post._id}${i}`} className="mb-2">
                  {line}
                </p>
              ))}
            </div>
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
