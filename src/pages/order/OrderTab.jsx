/* eslint-disable react/prop-types */

import FoodCard from '../../components/FoodCard';

const OrderTab = ({ items }) => {
  return (
    <div className="grid md: grid-cols-3 gap-12">
      {items.map((item, i) => (
        <FoodCard key={i} item={item} />
      ))}
    </div>
  );
};

export default OrderTab;
