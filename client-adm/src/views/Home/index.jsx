import { Link } from 'react-router-dom';

function Home() {
  return (
    <main className="flex gap-3 p-10">
      <Link
        to="/posts"
        className=" flex flex-col bg-zinc-800 p-5 text-gray-200 border border-gray-700 rounded-xl w-4/12 lg:w-2/12 h-40 hover:border-gray-500 hover:bg-zinc-700 ease-out duration-150"
      >
        <h2>All posts</h2>
        <svg
          className="fill-gray-200 flex-grow p-5 w-max mx-auto"
          xmlns="http://www.w3.org/2000/svg"
          width="75"
          height="75"
          viewBox="0 0 24 24"
        >
          <path d="M11.362 2c4.156 0 2.638 6 2.638 6s6-1.65 6 2.457v11.543h-16v-20h7.362zm.827-2h-10.189v24h20v-14.386c0-2.391-6.648-9.614-9.811-9.614zm4.811 13h-10v-1h10v1zm0 2h-10v1h10v-1zm0 3h-10v1h10v-1z" />
        </svg>
      </Link>

      <Link
        to="/new-post"
        className="flex flex-col bg-zinc-800 p-5 text-gray-200 border border-gray-700 rounded-xl w-4/12 lg:w-2/12 h-40 hover:border-gray-500 hover:bg-zinc-700 ease-out duration-150"
      >
        <h2>New post</h2>
        <svg
          className="fill-gray-200 flex-grow p-5 w-max mx-auto"
          xmlns="http://www.w3.org/2000/svg"
          width="75"
          height="75"
          viewBox="0 0 24 24"
        >
          <path d="M24 10h-10v-10h-4v10h-10v4h10v10h4v-10h10z" />
        </svg>
      </Link>
    </main>
  );
}

export default Home;
