import { useQuery } from '@tanstack/react-query';
import useAuth from './useAuth';
import useAxiosSecure from './useAxiosSecure';

const useIsAdmin = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: isAdmin, isPending: isAdminLoading } = useQuery({
    queryKey: ['isAdmin', user.email],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/users/isAdmin/${user.email}`);
      console.log(data);
      return data.isAdmin;
    },
  });
  return [isAdmin, isAdminLoading];
};

export default useIsAdmin;
