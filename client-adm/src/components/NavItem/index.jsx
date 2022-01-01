import { Link } from 'react-router-dom';

function NavItem({ children, href, target, rel, externalLink }) {
  return (
    <>
      {externalLink ? (
        <a
          href={href}
          target={target}
          rel={rel}
          className="block first:mt-4 lg:first:mt-0 p-2 text-lg font-medium text-gray-200 lg:inline-block lg:mt-0 lg:text-lg lg:mr-4 lg:hover:text-sky-200"
        >
          {children}
        </a>
      ) : (
        <Link
          to={href}
          target={target}
          className="block first:mt-4 lg:first:mt-0 p-2 text-lg font-medium text-gray-200 lg:inline-block lg:mt-0 lg:text-lg lg:mr-4 lg:hover:text-sky-200"
        >
          {children}
        </Link>
      )}
    </>
  );
}

export default NavItem;
