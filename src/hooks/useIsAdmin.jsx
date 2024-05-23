import { useQuery } from '@tanstack/react-query';
import useAuth from './useAuth';
import useAxiosSecure from './useAxiosSecure';

const useIsAdmin = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: isAdmin } = useQuery({
    queryKey: ['isAdmin', user.email],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/users/isAdmin/${user.email}`);
      console.log(data);
      return data.isAdmin;
    },
  });
  return [isAdmin];
};

export default useIsAdmin;
