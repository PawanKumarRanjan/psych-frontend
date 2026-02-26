import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white shadow-xl sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 text-2xl font-bold hover:opacity-90 transition transform hover:scale-105">
          <span className="text-4xl">🎯</span>
          <span className="text-gradient" style={{ backgroundClip: 'text', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'white' }}>
            PsychTest
          </span>
        </Link>
        
        <ul className="flex gap-8 items-center">
          <li>
            <Link to="/" className="hover:text-blue-200 transition font-semibold text-lg hover:scale-105 inline-block">
              Home
            </Link>
          </li>
          <li>
            <Link 
              to="/assessment" 
              className="bg-white text-indigo-600 font-bold py-2 px-6 rounded-lg hover:shadow-lg transition transform hover:scale-105 hover:bg-gray-50"
            >
              Start Test
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
