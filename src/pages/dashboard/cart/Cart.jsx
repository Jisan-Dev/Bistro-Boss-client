import React from 'react';
import useCart from '../../../hooks/useCart';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { Link } from 'react-router-dom';

const Cart = () => {
  const axiosSecure = useAxiosSecure();
  const [cart, refetch] = useCart();
  const totalPrice = cart.reduce((acc, curr) => acc + curr.price, 0);

  const handleDelete = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .delete(`/cart/${id}`)
          .then((res) => {
            if (res.data.deletedCount > 0) {
              refetch();
              Swal.fire({
                title: 'Deleted!',
                text: 'Your file has been deleted.',
                icon: 'success',
              });
            }
          })
          .catch((error) => {
            console.log(error);
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Something went wrong!',
            });
          });
      }
    });
  };
  return (
    <div className="px-24 py-10">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl">
          Total Orders: <strong>{cart.length}</strong>
        </h2>
        <h2 className="text-3xl">
          Total Price: <strong>${totalPrice}</strong>
        </h2>
        <Link to={cart.length ? '/dashboard/payment' : '#'}>
          <button disabled={!cart.length} className="btn bg-orange-600 hover:bg-orange-500 text-white">
            Pay Now
          </button>
        </Link>
      </div>
      <div className="overflow-x-auto">
        <table className="table mt-4">
          {/* head */}
          <thead>
            <tr className="bg-base-200">
              <th>#</th>
              <th>Image</th>
              <th>Name</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {cart.map((item, i) => (
              <tr key={item._id}>
                <th className="text-neutral-400">{i + 1}</th>
                <td>
                  <div className="avatar">
                    <div className="mask mask-squircle w-12 h-12">
                      <img src={item.image} alt="Avatar Tailwind CSS Component" />
                    </div>
                  </div>
                </td>
                <td>{item.name}</td>
                <td>$ {item.price}</td>
                <td>
                  <button onClick={() => handleDelete(item._id)} className="btn bg-red-600 text-white hover:bg-red-700 btn-sm">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Cart;
