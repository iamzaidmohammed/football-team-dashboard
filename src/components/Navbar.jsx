import { NavLink } from "react-router-dom";

const Navbar = () => {
  const linkClass = ({ isActive }) =>
    isActive
      ? "py-2 px-4 bg-blue-500 text-white text-xs lg:text-lg hover:bg-blue-500 hover:text-white"
      : "py-2 px-4 text-xs lg:text-lg hover:text-white hover:bg-blue-500";
  return (
    <nav className="sticky top-0 z-50 bg-white shadow-sm py-5">
      <div className="max-w-7xl flex items-center md:px-5 lg:px-16 xl:mx-auto">
        <NavLink to="/">
          <h1 className="text-2xl px-4">Football Team Dashboard</h1>
        </NavLink>

        <div>
          <NavLink to="/" className={linkClass}>
            Players
          </NavLink>
          <NavLink to="/managers" className={linkClass}>
            Managers
          </NavLink>
          <NavLink to="/matches" className={linkClass}>
            Matches
          </NavLink>
          <NavLink to="/goals" className={linkClass}>
            Goals
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
