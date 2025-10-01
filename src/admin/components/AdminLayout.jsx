import { Link, Outlet } from 'react-router-dom';

// eslint-disable-next-line react/prop-types
export const AdminLayout = ({ onLogout }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-[#1f7333] text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold"><Link to="/admin">Admin Panel</Link></h1>
          <nav>
            <ul className="flex space-x-6">
              <li><Link to="/" className="hover:underline">Home</Link></li>
              <li><Link to="/admin/suggestion" className="hover:underline">Feedback</Link></li>
              <li><Link to="/admin/exports" className="hover:underline">Exports</Link></li>
              {onLogout && (
                <li>
                  <button 
                    onClick={onLogout}
                    className="hover:underline text-red-200 hover:text-red-100 transition"
                  >
                    Logout
                  </button>
                </li>
              )}
            </ul>
          </nav>
        </div>
      </div>
      
      <div className="container mx-auto p-6">
        <div className="bg-[#fcf1e6] rounded-lg shadow-md p-6  ">
          <Outlet />
        </div>
      </div>
    </div>
  );
};