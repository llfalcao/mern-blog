import { useState, useEffect } from 'react';
import Header from '../../components/Header';

function Post() {
  const [post, setPost] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const path = window.location.pathname;
        const url = `http://192.168.100.3:5000/api/v1${path}`;
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
      <Header />
      {post ? (
        <main>
          <h1>{post.title}</h1>
          <span>{post.created_at}</span>
          <p>{post.text}</p>
        </main>
      ) : null}
    </>
  );
}

export default Post;
