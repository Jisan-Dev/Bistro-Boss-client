import React from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { FaUsers } from 'react-icons/fa';
import Swal from 'sweetalert2';
import { MdAdminPanelSettings } from 'react-icons/md';

const AllUsers = () => {
  const axiosSecure = useAxiosSecure();
  const { data: users = [], refetch } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const res = await axiosSecure.get('/users');
      return res.data;
    },
  });

  const handleMakeAdmin = (user) => {
    axiosSecure
      .patch(`/users/admin/${user._id}`)
      .then((res) => {
        console.log(res);
        if (res.data.modifiedCount > 0) {
          refetch();
          Swal.fire({
            title: 'Updated!',
            text: `${user.name} is now an Admin`,
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
  };

  const handleDeleteUser = (user) => {
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
          .delete(`/users/${user._id}`)
          .then((res) => {
            if (res.data.deletedCount > 0) {
              refetch();
              Swal.fire({
                title: 'Deleted!',
                text: 'User has been deleted.',
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
      <h2 className="text-3xl">ALL USERS: {users.length}</h2>
      <div className="overflow-x-auto">
        <table className="table mt-4">
          {/* head */}
          <thead>
            <tr className="bg-base-200">
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, i) => (
              <tr key={user._id}>
                <th className="text-neutral-400">{i + 1}</th>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  {user.role === 'Admin' ? (
                    <div title="Admin" className="bg-orange-400 px-2 py-2 inline-block text-white text-xl rounded-md">
                      <MdAdminPanelSettings />
                    </div>
                  ) : (
                    <div onClick={() => handleMakeAdmin(user)} title="User" className="bg-orange-400 px-2 py-2 inline-block text-white text-xl rounded-md">
                      <FaUsers />
                    </div>
                  )}
                </td>
                <td>
                  <button onClick={() => handleDeleteUser(user)} className="btn bg-red-600 text-white hover:bg-red-700 btn-sm">
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

export default AllUsers;
