import { useState, useEffect } from 'react';
import { API_URL } from '../../api';
import PostForm from '../../components/PostForm';

function PostEditor() {
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
        />
      ) : (
        'Something went wrong.'
      )}
    </main>
  );
}

export default PostEditor;
