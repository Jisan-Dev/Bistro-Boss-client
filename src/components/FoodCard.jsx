/* eslint-disable react/prop-types */

import useAuth from '../hooks/useAuth';

const FoodCard = ({ item }) => {
  const { user } = useAuth();
  const { name, image, price, recipe } = item;

  const handleAddToCart = (item) => {
    console.log(item);
  };

  return (
    <div className="card w-96 bg-base-100 shadow-xl">
      <figure>
        <img src={image} alt="Shoes" />
      </figure>
      <p className="absolute right-0 mr-4 mt-4 px-4 bg-slate-900 text-white">${price}</p>
      <div className="card-body flex flex-col items-center">
        <h2 className="card-title">{name}</h2>
        <p>{recipe}</p>
        <div className="card-actions justify-end">
          <button
            onClick={() => handleAddToCart(item)}
            className="btn btn-outline bg-slate-100 border-0 border-b-4 border-yellow-600 mt-4 hover:border-yellow-600 hover:text-yellow-600">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default FoodCard;
