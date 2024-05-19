import Header from '../components/Header';
import { Outlet } from 'react-router-dom';
import Nav from '../components/Nav';

const Root = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

export default Root;
