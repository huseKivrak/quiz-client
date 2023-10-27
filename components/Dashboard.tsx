import { useAuth } from '@/context/AuthContext';

const Dashboard = () => {
  const { user } = useAuth();

  if (!user) {
    return <div>Loading...</div>;
  }
  return (
    <div className='card bordered w-1/4 mx-auto mt-10 bg-primary'>
      <div className='card-body'>
        <h2 className='card-title font-light'>Dashboard</h2>

          <label className='label'>
            <span className='label-text'>Username</span>
          </label>
          <div className='input input-bordered'>{user.username}</div>
        </div>
        <div className='form-control'>
          <label className='label'>
            <span className='label-text'>Email</span>
          </label>
          <div className='input input-bordered'>{user.email}</div>
        </div>
      </div>

  );
};
export default Dashboard;
