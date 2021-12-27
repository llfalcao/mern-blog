function Nav({ children }) {
  return (
    <nav className="hidden w-full block lg:flex lg:items-center lg:w-auto nav">
      <div className="text-sm ">{children}</div>
    </nav>
  );
}

export default Nav;
