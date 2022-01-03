import { useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function PostForm({
  post,
  onChange,
  onVisibilityChange,
  onSubmit,
  errors,
}) {
  useEffect(() => {
    const a = document.getElementById('content');
    a.style.height = a.scrollHeight + 20 + 'px';
  }, []);

  function expandTextarea(e) {
    const textarea = e.target;
    textarea.style.height = textarea.scrollHeight + 'px';
  }

  return (
    <form className="w-full text-gray-200" onSubmit={onSubmit}>
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
            defaultChecked={post.private === true || post.private === undefined}
            className="mr-3 scale-150 origin-left"
          />
          <label htmlFor="private">Private</label>
        </div>

        <div>
          <input
            id="public"
            type="radio"
            name="visibility"
            defaultChecked={post.private === false}
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
