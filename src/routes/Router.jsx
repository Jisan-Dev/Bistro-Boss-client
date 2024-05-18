import { createBrowserRouter } from 'react-router-dom';
import Home from '../pages/homepage/Home';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
]);

export default router;
