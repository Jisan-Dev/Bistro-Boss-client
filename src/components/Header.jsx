import { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { AuthContext } from '../providers/AuthProvider';
import toast from 'react-hot-toast';
import useCart from '../hooks/useCart';
import { FaShoppingCart } from 'react-icons/fa';
import useIsAdmin from '../hooks/useIsAdmin';

const Header = () => {
  const { user, logOut } = useContext(AuthContext);
  const [isAdmin] = useIsAdmin();
  const [cart] = useCart();
  const navOptions = (
    <>
      <li>
        <NavLink to="/" className={({ isActive }) => (isActive ? 'text-yellow-300 px-6' : 'px-6')}>
          HOME
        </NavLink>
      </li>
      <li>
        <NavLink to="/menu" className={({ isActive }) => (isActive ? 'text-yellow-300 px-6' : 'px-6')}>
          MENU
        </NavLink>
      </li>
      <li>
        <NavLink to="/order/salads" className={({ isActive }) => (isActive ? 'text-yellow-300 px-6' : 'px-6')}>
          ORDER
        </NavLink>
      </li>
      <li>
        <NavLink to="/dashboard/cart">
          <button className="btn bg-opacity-30 border-none text-white">
            <FaShoppingCart className="text-xl" />
            <div className="badge badge-secondary">+{cart.length}</div>
          </button>
        </NavLink>
      </li>
      {user && isAdmin && (
        <li>
          <NavLink to="/dashboard/adminHome" className={({ isActive }) => (isActive ? 'text-yellow-300 px-6' : 'px-6')}>
            Dashboard
          </NavLink>
        </li>
      )}
      {user && !isAdmin && (
        <li>
          <NavLink to="/dashboard/userHome" className={({ isActive }) => (isActive ? 'text-yellow-300 px-6' : 'px-6')}>
            Dashboard
          </NavLink>
        </li>
      )}
      <li>
        {!user && (
          <NavLink to="/login" className={({ isActive }) => (isActive ? 'text-yellow-300 px-6' : 'px-6')}>
            LOGIN
          </NavLink>
        )}
      </li>
    </>
  );

  const handleLogOut = async () => {
    await logOut();
    toast.success('Logged Out successfully', {
      style: {
        border: '1px solid #ca8a04',
        padding: '16px',
        color: '#ca8a04',
      },
      iconTheme: {
        primary: '#ca8a04',
        secondary: '#FFFAEE',
      },
    });
  };

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
            <ul className="menu-horizontal px-1 items-center">{navOptions}</ul>
          </div>
          <div className="navbar-end">
            {user ? (
              <button onClick={handleLogOut} className="btn">
                Logout
              </button>
            ) : (
              <Link to="/register">
                <button className="btn">Get started</button>
              </Link>
            )}
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
