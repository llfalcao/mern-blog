import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PostForm from '../../components/PostForm';
import { API_URL } from '../../api';
import token from '../../auth';

function NewPost() {
  const navigate = useNavigate();
  const [errors, setErrors] = useState();
  const [post, setPost] = useState({ title: '', text: '', visibility: true });

  function onChange(e) {
    setPost({ ...post, [e.target.name]: e.target.value });
  }

  function onVisibilityChange() {
    setPost({ ...post, visibility: !post.visibility });
  }

  async function onSubmit(e) {
    e.preventDefault();
    try {
      const newPost = {
        ...post,
        visibility: post.visibility ? 'private' : 'public',
      };
      const response = await fetch(`${API_URL}/posts`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: token,
        },
        body: JSON.stringify(newPost),
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
      <PostForm
        post={post}
        onChange={onChange}
        onVisibilityChange={onVisibilityChange}
        onSubmit={onSubmit}
        errors={errors}
      />
    </main>
  );
}

export default NewPost;
