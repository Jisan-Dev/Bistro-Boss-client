import { NavLink } from 'react-router-dom';

const Header = () => {
  const navOptions = (
    <>
      <li>
        <NavLink to="/" className={({ isActive }) => (isActive ? 'text-yellow-300' : '')}>
          HOME
        </NavLink>
      </li>
      <li>
        <NavLink to="/contact">CONTACT US</NavLink>
      </li>
    </>
  );

  return (
    <>
      <header className=" fixed z-10 bg-opacity-30 bg-black text-white bg-blend-color-burn backdrop-blur-sm w-full">
        <div className="w-[1200px] mx-auto navbar">
          <div className="navbar-start">
            <div className="dropdown">
              <label tabIndex={0} className="btn btn-ghost lg:hidden">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
                </svg>
              </label>
              <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                {navOptions}
              </ul>
            </div>
            <a className="btn btn-ghost normal-case text-xl">Bistro Boss</a>
          </div>
          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1">{navOptions}</ul>
          </div>
          <div className="navbar-end">
            <a className="btn">Get started</a>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
