import React, { useState } from 'react';

function Navbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <nav className="bg-lightcoral p-4 fixed top-0 w-full z-10">
      <div className="flex justify-between items-center">
        <div className="text-white text-lg font-bold">Parksons Packaging</div>
        <div className="relative">
          <button onClick={toggleDropdown} className="text-white">Menu</button>
          {isDropdownOpen && (
            <ul className="absolute right-0 mt-2 w-48 bg-white shadow-lg">
              <li className="p-2 hover:bg-gray-200"><a href="#">Home</a></li>
              <li className="p-2 hover:bg-gray-200"><a href="#">About</a></li>
              <li className="p-2 hover:bg-gray-200"><a href="#">Careers</a></li>
              <li className="p-2 hover:bg-gray-200"><a href="#">Locations</a></li>
            </ul>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
