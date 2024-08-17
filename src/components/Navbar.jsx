import React, { useContext } from 'react';
import { AuthContext } from '../providers/AuthProvider';
import { useNavigate } from 'react-router-dom'; 

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const navigate = useNavigate(); 

  const handleLogout = async () => {
    try {
      await logOut();
      navigate('/login'); 
    } catch (error) {
    //   console.error('Logout Error:', error);
    }
  };

  const handleLogin = () => {
    navigate('/login'); 
  };

  return (
    <nav className="bg-blue-600 p-4 ">
        <div className='flex lg:flex-row md:flex-row flex-col justify-between'>
            <div>
                <h1 className='text-2xl text-white'>SearchSync</h1>

            </div>
            <div className='flex justify-center items-center gap-4'>
            <div className="text-white text-lg">
        {user ? ` ${user.displayName || 'User'}` : ''}
      </div>
      <div>
        {user ? (
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white rounded hover:bg-red-600 btn-sm"
          >
            Logout
          </button>
        ) : (
          <button
            onClick={handleLogin}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Login
          </button>
        )}
      </div>
            </div>
            
        </div>
      
    </nav>
  );
};

export default Navbar;
