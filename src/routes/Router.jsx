import { createBrowserRouter } from 'react-router-dom';
import Home from '../pages/homepage/Home';
import Root from './Root';
import Menu from '../pages/menu/Menu';
import Order from '../pages/order/Order';
import Register from '../pages/register/Register';
import Login from '../pages/login/Login';

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
    ],
  },
]);

export default router;
