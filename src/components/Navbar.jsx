import React, { useEffect, useState } from 'react';

const Navbar = () => {
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const data = localStorage.getItem('user');
    if (data) {
      const user = JSON.parse(data);
      setUserInfo(user);
    }
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem('user');
    setUserInfo(null);
    window.location.href = '/login'; // Redirect to login page
  };

  return (
    <nav className="bg-white border-b border-gray-200 shadow-sm py-4 px-6">
      <div className="flex justify-end items-center max-w-7xl mx-auto">
        {/* Right Side: User Info and Sign Out Button */}
        <div className="flex items-center space-x-8">
            
          {userInfo ? (
            <span className="font-normal text-black">
              Hello, {userInfo.name}
            </span>
          ) : (
            <span className="font-normal text-black">
              Guest
            </span>
          )}
          <button
            onClick={handleSignOut}
            className="text-black border border-gray-300 hover:bg-gray-100 px-4 py-2 rounded-lg font-medium focus:outline-none focus:ring-2 focus:ring-gray-200"
          >
            Sign Out
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;