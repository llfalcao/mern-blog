import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PostForm from '../../components/PostForm';
import { API_URL } from '../../api';
import token from '../../auth';

function PostEditor() {
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
        visibility: post.visibility ? 'private' : 'public',
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
      {post ? (
        <PostForm
          post={post}
          onChange={onChange}
          onVisibilityChange={onVisibilityChange}
          onSubmit={onSubmit}
          errors={errors}
        />
      ) : (
        'Something went wrong.'
      )}
    </main>
  );
}

export default PostEditor;
