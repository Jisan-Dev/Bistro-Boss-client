import { useEffect, useState } from 'react';
import SectionHeader from '../../../../components/SectionHeader';
import MenuItem from '../../../../components/MenuItem';

const Menu = () => {
  const [menu, setMenu] = useState([]);
  useEffect(() => {
    fetch('menu.json')
      .then((res) => res.json())
      .then((data) => {
        const popularItems = data.filter((item) => item.category === 'popular');
        setMenu(popularItems);
      });
  }, []);
  return (
    <section className="mb-12 container mx-auto max-w-[1160px]">
      <SectionHeader heading="From Our Menu" subHeading="Popular Items"></SectionHeader>
      <div className="grid md:grid-cols-2 gap-10">
        {menu.map((item) => (
          <MenuItem key={item._id} item={item}></MenuItem>
        ))}
      </div>
      <div className="flex items-center justify-center mt-6">
        <button className="btn btn-outline border-0 border-b-4 mt-4 hover:border-none">View Full Menu</button>
      </div>
    </section>
  );
};

export default Menu;
