import { Link } from 'react-router-dom';

function Sidebar() {
  return (
    <div className="w-64 h-screen bg-gray-800 text-white p-4 flex flex-col">
      <h1 className="text-2xl font-bold mb-8">Visitor Management</h1>
      <nav className="flex-1">
        <ul className="space-y-4">
          <li>
            <Link to="/" className="block py-2 px-4 hover:bg-gray-700 rounded">
              Dashboard
            </Link>
          </li>
          <li>
            <Link to="/visitor-form" className="block py-2 px-4 hover:bg-gray-700 rounded">
              New Visitor
            </Link>
          </li>
          <li>
            <Link to="/records" className="block py-2 px-4 hover:bg-gray-700 rounded">
              Visitor Records
            </Link>
          </li>
          <li>
            <Link to="/pre-arrival" className="block py-2 px-4 hover:bg-gray-700 rounded">
              Pre-Arrival
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Sidebar;
