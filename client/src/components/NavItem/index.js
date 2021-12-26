function NavItem({ children, href, target, rel }) {
  return (
    <a
      href={href}
      target={target}
      rel={rel}
      className="block mt-4 font-semibold lg:inline-block lg:mt-0 lg:text-lg text-gray-800 mr-4"
    >
      {children}
    </a>
  );
}

export default NavItem;
