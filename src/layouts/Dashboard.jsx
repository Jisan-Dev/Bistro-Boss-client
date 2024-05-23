import React from 'react';
import { FaCalendar, FaClipboardList, FaEnvelope, FaHome, FaList, FaShoppingCart, FaStar, FaUsers, FaUtensils } from 'react-icons/fa';
import { FaBagShopping } from 'react-icons/fa6';
import { MdOutlineRestaurantMenu } from 'react-icons/md';
import { NavLink, Outlet } from 'react-router-dom';
import useCart from '../hooks/useCart';
import { BsFillMenuButtonFill } from 'react-icons/bs';

const Dashboard = () => {
  const [cart] = useCart();

  // TODO: get isAdmin value from the database
  const isAdmin = true;

  return (
    <div className="flex">
      {/* Dashboard sidebar */}
      <div className="w-64 min-h-screen bg-orange-400">
        <ul className="menu">
          {isAdmin ? (
            <>
              <li>
                <NavLink to="/dashboard/adminHome">
                  <FaHome /> Admin Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/manageItems">
                  <FaList /> Manage Items
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/addItems">
                  <FaUtensils /> Add Items
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/manageBookings">
                  <BsFillMenuButtonFill /> Manage Bookings
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/allUsers">
                  <FaUsers /> All Users
                </NavLink>
              </li>
            </>
          ) : (
            <>
              <li>
                <NavLink to="/dashboard/userHome">
                  <FaHome /> User Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/cart">
                  <FaShoppingCart /> My Cart ({cart.length})
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/reservations">
                  <FaCalendar /> Reservations
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/review">
                  <FaStar /> Add Review
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/bookings">
                  <FaClipboardList /> My Bookings
                </NavLink>
              </li>
            </>
          )}

          <div className="divider"></div>
          {/* common navLinks. */}
          <li>
            <NavLink to="/">
              <FaHome /> Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/menu">
              <MdOutlineRestaurantMenu /> Menu
            </NavLink>
          </li>
          <li>
            <NavLink to="/order/salads">
              <FaBagShopping /> Shop
            </NavLink>
          </li>
          <li>
            <NavLink to="/contact">
              <FaEnvelope /> Contact
            </NavLink>
          </li>
        </ul>
      </div>

      {/* Dashboard main content */}
      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
