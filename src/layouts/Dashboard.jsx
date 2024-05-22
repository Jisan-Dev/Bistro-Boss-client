import React from 'react';
import { FaCalendar, FaClipboardList, FaHome, FaList, FaShoppingCart, FaStar } from 'react-icons/fa';
import { FaBagShopping } from 'react-icons/fa6';
import { MdOutlineRestaurantMenu } from 'react-icons/md';
import { NavLink, Outlet } from 'react-router-dom';

const Dashboard = () => {
  return (
    <div className="flex">
      {/* Dashboard sidebar */}
      <div className="w-64 min-h-screen bg-orange-400">
        <ul className="menu">
          <li>
            <NavLink to="/dashboard/userHome">
              <FaHome /> User Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/cart">
              <FaShoppingCart /> My Cart
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
          <div className="divider"></div>
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
