import useAuth from '../../../hooks/useAuth';

const UserHome = () => {
  const { user } = useAuth();
  return (
    <div className="px-10">
      <h2 className="text-3xl my-3">HI, Welcome {user.displayName ?? 'Back'}</h2>
    </div>
  );
};

export default UserHome;
