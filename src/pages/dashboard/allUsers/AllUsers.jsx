import React from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const AllUsers = () => {
  const axiosSecure = useAxiosSecure();
  const { data: users = [] } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const res = await axiosSecure.get('/users');
      return res.data;
    },
  });
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
                <td>user</td>
                <td>
                  <button className="btn bg-red-600 text-white hover:bg-red-700 btn-sm">Delete</button>
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
