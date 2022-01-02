import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { API_URL } from '../../api';
import token from '../../auth';

export default function PostForm({ post, onChange, onVisibilityChange }) {
  const navigate = useNavigate();
  const [errors, setErrors] = useState();

  function expandTextarea(e) {
    const textarea = e.target;
    textarea.style.height = '';
    textarea.style.height = textarea.scrollHeight + 'px';
  }

  async function handleSubmit(e) {
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
    <form className="w-full text-gray-200" onSubmit={handleSubmit}>
      <div className="flex flex-col gap-1">
        <label htmlFor="title" className="font-semibold">
          Title
        </label>
        <input
          id="title"
          name="title"
          className="p-2 pl-3 text-lg bg-zinc-800 rounded-md border border-zinc-500"
          type="text"
          value={post.title}
          placeholder="Title"
          onChange={onChange}
        />
      </div>

      <div className="mt-5">
        <p
          className="cursor-default font-semibold"
          onClick={() => document.getElementById('content').focus()}
        >
          Content
        </p>
        <textarea
          id="content"
          name="text"
          className="w-full mt-1 p-2 pl-3 bg-zinc-800 rounded-md border border-zinc-500"
          value={post.text}
          style={{
            height: () => {
              const textarea = document.getElementById('content');
              textarea.style.height = textarea.scrollHeight + 'px';
            },
          }}
          onInput={expandTextarea}
          onChange={onChange}
        />
      </div>

      <p className="mt-5 mb-3 font-semibold">Visibility</p>
      <div className="flex gap-5" onChange={onVisibilityChange}>
        <div>
          <input
            id="private"
            type="radio"
            name="visibility"
            defaultChecked={post.visibility}
            className="mr-3 scale-150 origin-left"
          />
          <label htmlFor="private">Private</label>
        </div>

        <div>
          <input
            id="public"
            type="radio"
            name="visibility"
            defaultChecked={!post.visibility}
            className="mr-3 scale-150 origin-left"
          />
          <label htmlFor="public">Public</label>
        </div>
      </div>

      {errors ? (
        <ul className="mt-5 text-red-500 list-disc ml-3">
          {errors.map((err) => (
            <li>{err.msg}</li>
          ))}
        </ul>
      ) : null}

      <div className="mt-5">
        <button
          type="submit"
          className="bg-blue-700 hover:bg-blue-600 ease-out duration-150 text-sm font-semibold p-2 px-3 mt-5 mr-5 rounded-md"
        >
          Submit
        </button>
        <button
          type="button"
          className="bg-red-700 hover:bg-red-600 ease-out duration-150 text-sm font-semibold p-2 px-3 mt-5 rounded-md"
        >
          <Link to="/posts">Cancel</Link>
        </button>
      </div>
    </form>
  );
}
