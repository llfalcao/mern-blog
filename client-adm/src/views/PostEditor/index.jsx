import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PostForm from '../../components/PostForm';
import { API_URL } from '../../api';
import token from '../../auth';

function PostEditor({ tab }) {
  const navigate = useNavigate();
  const [errors, setErrors] = useState();
  const [post, setPost] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const postId = window.location.pathname.split('/')[1];
        const response = await fetch(`${API_URL}/posts/${postId}`);
        const data = await response.json();
        setPost(data);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  function onChange(e) {
    setPost({ ...post, [e.target.name]: e.target.value });
  }

  function onVisibilityChange() {
    setPost({ ...post, private: !post.private });
  }

  async function onSubmit(e) {
    e.preventDefault();
    try {
      const updatedPost = {
        ...post,
        visibility: post.private ? 'private' : 'public',
      };
      const response = await fetch(`${API_URL}/posts/${post._id}/edit`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: token,
        },
        body: JSON.stringify(updatedPost),
      });

      if (response.status === 200) {
        return navigate('/posts');
      }

      const data = await response.json();
      setErrors(data.errors);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <main className="w-full mx-auto p-5 lg:w-8/12">
      <h1 className="mb-10 text-gray-200 text-2xl font-semibold">
        Post Editor
      </h1>

      <nav className="w-max mb-5 overflow-hidden mx-auto text-gray-200 font-semibold border border-zinc-600 rounded-md">
        <button
          type="button"
          className="px-5 py-2 hover:bg-black hover:text-zinc-200 duration-150"
        >
          <Link to={`/${window.location.pathname.split('/')[1]}/edit`}>
            Post Editor
          </Link>
        </button>
        <span className="p-px h-full bg-zinc-600 rounded-sm"></span>
        <button
          type="button"
          className="px-5 py-2 hover:bg-black hover:text-zinc-200 duration-150"
        >
          <Link to={`/${window.location.pathname.split('/')[1]}/comments`}>
            Comments
          </Link>
        </button>
      </nav>

      {post && tab === 'editor' ? (
        <>
          <PostForm
            post={post}
            onChange={onChange}
            onVisibilityChange={onVisibilityChange}
            onSubmit={onSubmit}
            errors={errors}
          />
        </>
      ) : (
        <h4 className="text-gray-200 w-full mt-20 text-center text-xl">
          Something went wrong.
        </h4>
      )}
    </main>
  );
}

export default PostEditor;
