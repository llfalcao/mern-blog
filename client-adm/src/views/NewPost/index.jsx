import { useState } from 'react';
import PostForm from '../../components/PostForm';

function NewPost() {
  const [post, setPost] = useState({ title: '', text: '', visibility: true });

  function onChange(e) {
    setPost({ ...post, [e.target.name]: e.target.value });
  }

  function onVisibilityChange() {
    setPost({ ...post, visibility: !post.visibility });
  }

  return (
    <main className="w-full mx-auto p-5 lg:w-8/12">
      <PostForm
        post={post}
        onChange={onChange}
        onVisibilityChange={onVisibilityChange}
      />
    </main>
  );
}

export default NewPost;
