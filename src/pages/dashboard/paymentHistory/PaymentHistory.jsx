import { useQuery } from '@tanstack/react-query';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const PaymentHistory = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: payments = [] } = useQuery({
    queryKey: ['payments', user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/payments/${user?.email}`);
      return data;
    },
  });

  return (
    <div className="px-24 py-10">
      <h2 className="text-3xl">Total Payments: {payments.length}</h2>
      <div className="overflow-x-auto">
        <table className="table mt-4">
          {/* head */}
          <thead className="bg-orange-400 text-neutral-700 text-base">
            <tr>
              <th className="rounded-tl-2xl">#</th>
              <th>price</th>
              <th>Transaction Id</th>
              <th className="rounded-tr-2xl">Status</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment, index) => (
              <tr key={payment._id}>
                <th className="text-neutral-400">{index + 1}</th>
                <td> ${payment.price} </td>
                <td>{payment.transactionId}</td>
                <td>{payment.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentHistory;
