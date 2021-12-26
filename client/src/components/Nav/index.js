function Nav({ children, drawer }) {
  return (
    <nav className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
      {drawer ? <div className="text-sm lg:flex-grow">{children}</div> : null}
    </nav>
  );
}

export default Nav;
