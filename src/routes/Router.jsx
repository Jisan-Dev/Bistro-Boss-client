import { createBrowserRouter } from 'react-router-dom';
import Home from '../pages/homepage/Home';
import Root from './Root';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
  },
]);

export default router;
