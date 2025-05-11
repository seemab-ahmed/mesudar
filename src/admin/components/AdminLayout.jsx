import { Link, Outlet } from 'react-router-dom';

export const AdminLayout = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-teal-600 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Admin Panel</h1>
          {/* <nav>
            <ul className="flex space-x-6">
              <li><Link to="/admin" className="hover:underline">Login</Link></li>
              <li><Link to="/admin" className="hover:underline">Logout</Link></li>
            </ul>
          </nav> */}
        </div>
      </div>
      
      <div className="container mx-auto p-6">
        <div className="bg-white rounded-lg shadow-md p-6 border-2 border-teal-500">
          <Outlet />
        </div>
      </div>
    </div>
  );
};