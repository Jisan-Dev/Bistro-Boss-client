/* eslint-disable react/prop-types */

import Swal from 'sweetalert2';
import useAuth from '../hooks/useAuth';
import { useLocation, useNavigate } from 'react-router-dom';
import useAxiosSecure from '../hooks/useAxiosSecure';

const FoodCard = ({ item }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const { name, image, price, recipe, _id } = item;

  const handleAddToCart = async (item) => {
    if (user && user.email) {
      // TODO: send item to the cart collection of db
      const cartItem = {
        foodId: _id,
        email: user?.email,
        name,
        image,
        price,
      };
      try {
        const { data } = await axiosSecure.post('/cart', cartItem);
        if (data.insertedId) {
          Swal.fire({
            icon: 'success',
            title: `${name} added to your cart`,
          });
        }
      } catch (error) {
        console.log(error);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong!',
        });
      }
    } else {
      Swal.fire({
        title: 'You are not logged in!',
        text: 'Please login to add this item to the cart!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#ca8a04',
        cancelButtonColor: '#d62000',
        confirmButtonText: 'Yes, Login!',
      }).then((result) => {
        if (result.isConfirmed) {
          navigate('/login', { state: { from: location } });
        }
      });
    }
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
