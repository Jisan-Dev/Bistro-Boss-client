import React from 'react';
import Hero from '../../components/Hero';
import ItemSection from './sections/ItemSection';
import useMenu from '../../hooks/useMenu';
import dessertImg from '../../assets/menu/dessert-bg.jpeg';
import pizzaImg from '../../assets/menu/pizza-bg.jpg';
import saladImg from '../../assets/menu/salad-bg.jpg';
import soupImg from '../../assets/menu/soup-bg.jpg';
import img from '../../assets/menu/banner3.jpg';

const Menu = () => {
  const [menu] = useMenu();
  const offered = menu.filter((item) => item.category === 'offered');
  const desserts = menu.filter((item) => item.category === 'dessert');
  const pizza = menu.filter((item) => item.category === 'pizza');
  const salad = menu.filter((item) => item.category === 'salad');
  const soup = menu.filter((item) => item.category === 'soup');

  return (
    <>
      <Hero title="OUR MENU" subtitle="Would you like to try a dish?" img={img} />
      <ItemSection heading="Today's Offer" subHeading="Don't Miss" items={offered} />
      <ItemSection
        items={desserts}
        img={dessertImg}
        title="desserts"
        subtitle="Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
      />
      <ItemSection
        items={pizza}
        img={pizzaImg}
        title="pizza"
        subtitle="Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
      />
      <ItemSection
        items={salad}
        img={saladImg}
        title="salads"
        subtitle="Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
      />
      <ItemSection
        items={soup}
        img={soupImg}
        title="soups"
        subtitle="Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
      />
    </>
  );
};

export default Menu;
