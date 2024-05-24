import React from 'react';
import SectionHeader from '../../../components/SectionHeader';
import useMenu from '../../../hooks/useMenu';
import { FaTrashAlt } from 'react-icons/fa';
import { BiSolidEdit } from 'react-icons/bi';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { Link } from 'react-router-dom';

const MangeItems = () => {
  const [menu, , refetch] = useMenu();
  const axiosSecure = useAxiosSecure();

  const handleDelete = (item) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        const { data } = await axiosSecure.delete(`/menu/${item._id}`);
        if (data.deletedCount > 0) {
          refetch();
          Swal.fire({
            title: 'Deleted!',
            html: `<strong>${item.name}</strong> has been deleted.`,
            icon: 'success',
          });
        }
      }
    });
  };
  return (
    <div className="px-20">
      <SectionHeader heading="manage all items" subHeading="hurry up" />
      <div className="overflow-x-auto">
        <table className="table mt-4">
          {/* head */}
          <thead className="bg-orange-400 text-neutral-700 text-base">
            <tr>
              <th className="rounded-tl-2xl">#</th>
              <th>Item Image</th>
              <th>Item Name</th>
              <th>Price</th>
              <th>Update</th>
              <th className="rounded-tr-2xl">Delete</th>
            </tr>
          </thead>
          <tbody>
            {menu.map((item, i) => (
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
                  <Link to={`/dashboard/updateItem/${item._id}`}>
                    <button className="btn bg-orange-400 text-white hover:bg-orange-500 btn-md text-lg">
                      <BiSolidEdit />
                    </button>
                  </Link>
                </td>
                <td>
                  <button onClick={() => handleDelete(item)} className="btn bg-red-600 text-white hover:bg-red-700 btn-md">
                    <FaTrashAlt />
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

export default MangeItems;
