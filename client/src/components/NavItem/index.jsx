function NavItem({ children, href, target, rel }) {
  return (
    <a
      href={href}
      target={target}
      rel={rel}
      className="block first:mt-4 lg:first:mt-0 p-2 text-lg font-medium text-gray-200 lg:inline-block lg:mt-0 lg:text-lg lg:mr-4 lg:hover:text-sky-200"
    >
      {children}
    </a>
  );
}

export default NavItem;
