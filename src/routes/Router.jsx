import { createBrowserRouter } from 'react-router-dom';
import Home from '../pages/homepage/Home';
import Root from './Root';
import Menu from '../pages/menu/Menu';
import Order from '../pages/order/Order';
import Register from '../pages/register/Register';
import Login from '../pages/login/Login';
import PrivateRoute from './PrivateRoute';
import Secret from '../pages/Secret';
import Dashboard from '../layouts/Dashboard';
import Cart from '../pages/dashboard/cart/Cart';
import AllUsers from '../pages/dashboard/allUsers/AllUsers';
import AddItem from '../pages/dashboard/addItem/AddItem';
import ManageItems from '../pages/dashboard/manageItems/MangeItems';
import AdminRoute from './AdminRoute';
import UpdateItem from '../pages/dashboard/updateItem/UpdateItem';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: '/menu',
        element: <Menu />,
      },
      {
        path: '/order/:category',
        element: <Order />,
      },
      {
        path: '/register',
        element: <Register />,
      },
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/secret',
        element: (
          <PrivateRoute>
            <Secret />
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: '/dashboard',
    element: (
      <PrivateRoute>
        <Dashboard />
      </PrivateRoute>
    ),
    children: [
      //note: general user routes
      {
        path: '/dashboard/cart',
        element: <Cart />,
      },

      //note: admin only routes
      {
        path: 'allUsers',
        element: (
          <AdminRoute>
            <AllUsers />
          </AdminRoute>
        ),
      },
      {
        path: '/dashboard/addItem',
        element: (
          <AdminRoute>
            <AddItem />
          </AdminRoute>
        ),
      },
      {
        path: '/dashboard/manageItems',
        element: (
          <AdminRoute>
            <ManageItems />
          </AdminRoute>
        ),
      },
      {
        path: '/dashboard/updateItem/:id',
        element: (
          <AdminRoute>
            <UpdateItem />
          </AdminRoute>
        ),
      },
    ],
  },
]);

export default router;
