import { useState } from 'react';
import Nav from '../Nav';
import NavItem from '../NavItem';

function Header() {
  const [drawer, setDrawer] = useState(false);

  function toggleDrawer() {
    setDrawer(!drawer);
  }

  return (
    <header className="flex items-center justify-between flex-wrap p-6">
      <div className="flex items-center flex-shrink-0 mr-6">
        <div>
          <img
            className="fill-current h-9 w-9 mr-2 rounded-full"
            src="https://avatars.githubusercontent.com/u/39093175"
            alt=""
          />
        </div>
        <div className="flex flex-col">
          <span className="font-semibold text-xl tracking-tight">
            The MERN Blog
          </span>
          <span className="font-semibold text-sm tracking-tight">
            by llfalcao
          </span>
        </div>
      </div>
      <div className="block lg:hidden">
        <button
          className="flex items-center px-4 py-3 border rounded text-gray-800 border-gray-800 hover:border-gray-600"
          onClick={toggleDrawer}
        >
          <svg
            className="fill-current h-3 w-3"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Menu</title>
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
          </svg>
        </button>
      </div>

      <Nav drawer={drawer}>
        <NavItem
          href="https://github.com/llfalcao/mern-blog"
          target="_blank"
          rel="noreferrer"
        >
          About
        </NavItem>
        <NavItem href="/posts">Posts</NavItem>
        <NavItem href="!#">Projects</NavItem>
      </Nav>
    </header>
  );
}

export default Header;
