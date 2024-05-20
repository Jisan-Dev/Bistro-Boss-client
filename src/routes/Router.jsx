import { createBrowserRouter } from 'react-router-dom';
import Home from '../pages/homepage/Home';
import Root from './Root';
import Menu from '../pages/menu/Menu';
import Order from '../pages/order/Order';

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
    ],
  },
]);

export default router;
