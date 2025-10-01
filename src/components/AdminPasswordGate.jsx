import React, { useState, useEffect } from "react";

const ADMIN_PASSWORD = "eli-mesudar.com";
const STORAGE_KEY = "admin_authenticated";
const EXPIRY_KEY = "admin_auth_expiry";

// eslint-disable-next-line react/prop-types
const AdminPasswordGate = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = () => {
    try {
      const isAuthed = localStorage.getItem(STORAGE_KEY);
      const expiryTime = localStorage.getItem(EXPIRY_KEY);
      
      if (isAuthed === "true" && expiryTime) {
        const now = new Date().getTime();
        const expiry = parseInt(expiryTime);
        
        if (now < expiry) {
          setIsAuthenticated(true);
        } else {
          // Authentication expired, clear storage
          localStorage.removeItem(STORAGE_KEY);
          localStorage.removeItem(EXPIRY_KEY);
        }
      }
    } catch (error) {
      console.error("Error checking auth status:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");
    
    if (passwordInput === ADMIN_PASSWORD) {
      const now = new Date().getTime();
      const expiryTime = now + (24 * 60 * 60 * 1000); // 24 hours from now
      
      localStorage.setItem(STORAGE_KEY, "true");
      localStorage.setItem(EXPIRY_KEY, expiryTime.toString());
      setIsAuthenticated(true);
      setPasswordInput(""); // Clear password input
    } else {
      setError("Incorrect password. Please try again.");
      setPasswordInput(""); // Clear password input on wrong password
    }
  };

  const handleLogout = () => {
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(EXPIRY_KEY);
    setIsAuthenticated(false);
    setPasswordInput("");
    setError("");
  };

  // Show loading state briefly
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <div className="text-gray-600">Loading...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-[#1f7333] mb-2">Admin Access</h1>
            <p className="text-gray-600">Please enter the admin password to continue</p>
          </div>
          
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                placeholder="Enter admin password"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#1f7333] focus:border-[#1f7333] outline-none transition ${
                  error ? 'border-red-500' : 'border-gray-300'
                }`}
                required
              />
              {error && (
                <p className="mt-2 text-sm text-red-600">{error}</p>
              )}
            </div>
            
            <button
              type="submit"
              className="w-full bg-[#1f7333] hover:bg-[#89c497] text-white font-medium py-3 px-4 rounded-lg transition duration-200"
            >
              Access Admin Panel
            </button>
          </form>
          
          <div className="mt-6 text-center">
            <p className="text-xs text-gray-500">
              Access will be valid for 24 hours
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Return children and inject logout function into AdminLayout via React.cloneElement
  return (
    <div>
      {React.cloneElement(children, { onLogout: handleLogout })}
    </div>
  );
};

export default AdminPasswordGate;