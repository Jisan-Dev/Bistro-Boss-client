/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom';
import SectionHeader from '../../../components/SectionHeader';
import MenuItem from '../../../components/MenuItem';
import SectionCover from '../../../components/SectionCover';

const ItemSections = ({ items, heading, subHeading, title, subtitle, img }) => {
  return (
    <section className="my-10">
      {heading && <SectionHeader heading={heading} subHeading={subHeading} />}
      {title && <SectionCover title={title} subtitle={subtitle} img={img} />}
      <main className="container mx-auto max-w-[1160px]">
        <div className="grid md:grid-cols-2 gap-10 my-16">
          {items.map((item) => (
            <MenuItem key={item._id} item={item}></MenuItem>
          ))}
        </div>
        <div className="flex items-center justify-center">
          <Link to={`/order/${title ?? 'salad'}`}>
            <button className="btn btn-outline border-0 border-b-4 mt-4">Order Now</button>
          </Link>
        </div>
      </main>
    </section>
  );
};

export default ItemSections;
