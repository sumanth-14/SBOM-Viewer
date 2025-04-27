import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-[#0d1b2a] border-b border-gray-700 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between h-16 items-center">
        
        
        <div className="flex items-center">
          <Link to="/" className="text-2xl font-bold text-white">
            SBOM Viewer
          </Link>
        </div>

       
        <div className="flex space-x-6">
          <Link to="/" className="text-gray-300 hover:text-white font-medium">
            Home
          </Link>
          <Link to="/compare" className="text-gray-300 hover:text-white font-medium">
            Compare Devices
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

