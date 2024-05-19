import { createBrowserRouter } from 'react-router-dom';
import Home from '../pages/homepage/Home';
import Root from './Root';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        index: true,
        element: <Home />,
      },
    ],
  },
]);

export default router;
