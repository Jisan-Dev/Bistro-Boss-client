import Header from '../components/Header';
import { Outlet, ScrollRestoration, useLocation } from 'react-router-dom';
import Footer from '../components/Footer';

const Root = () => {
  const location = useLocation();
  const noHeaderFooter = location.pathname.includes('/login') || location.pathname.includes('/register');
  return (
    <>
      <ScrollRestoration />
      {noHeaderFooter || <Header />}
      <Outlet />
      {noHeaderFooter || <Footer />}
    </>
  );
};

export default Root;
