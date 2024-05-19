import Hero from './sections/Hero';
import Categories from './sections/categories/Categories';
import CTA from './sections/cta/CTA';
import Menu from './sections/menu/Menu';
import Testimonials from './sections/testimonials/Testimonials';

const Home = () => {
  return (
    <>
      <Hero />
      <Categories />
      <Menu />
      <CTA />
      <Testimonials />
    </>
  );
};

export default Home;
