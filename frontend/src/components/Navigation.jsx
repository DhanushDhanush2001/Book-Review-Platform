import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  Home, 
  Book, 
  User, 
  BookOpen, 
  Star, 
  LogIn, 
  LogOut,
  PlusCircle 
} from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/authSlice';
import toast from 'react-hot-toast';

const Navigation = ({ children }) => {
  const location = useLocation();
  const dispatch = useDispatch();
  const { token, isAdmin } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const navigationItems = [
    { name: 'Home', path: '/', icon: Home, isVisible: true },
    { name: 'Books', path: '/books', icon: BookOpen, isVisible: true },
    { name: 'Profile', path: '/profile', icon: User, isVisible: !!token },
    { name: 'Add Book', path: '/add-book', icon: PlusCircle, isVisible: token && isAdmin },
    { name: 'Login', path: '/login', icon: LogIn, isVisible: !token },
    { name: 'Signup', path: '/signup', icon: Star, isVisible: !token }
  ];

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
    toast.success('Logged out successfully');
  };

  return (
    <div className="flex w-full">

      {/* Sidebar for Desktop */}
      <div className="hidden md:block w-64 bg-white border-r fixed left-0 top-0 bottom-0 z-40">
        <div className="p-6 border-b flex items-center justify-between">
          <div className="flex items-center">
            <Book className="w-8 h-8 text-indigo-600 mr-2" />
            <span className="text-xl font-bold text-indigo-600">BookReview</span>
          </div>
        </div>
        <nav className="p-4">
          <ul className="space-y-2">
            {navigationItems.filter(item => item.isVisible).map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`flex items-center p-3 rounded-lg transition-all ${
                    location.pathname === item.path
                      ? 'bg-indigo-50 text-indigo-600'
                      : 'hover:bg-indigo-50 text-gray-600 hover:text-indigo-600'
                  }`}
                >
                  <item.icon className="w-5 h-5 mr-3" />
                  {item.name}
                </Link>
              </li>
            ))}
            {token && (
              <li>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center p-3 rounded-lg text-red-600 hover:bg-red-50 transition-all"
                >
                  <LogOut className="w-5 h-5 mr-3" />
                  Logout
                </button>
              </li>
            )}
          </ul>
        </nav>
      </div>

      {/* Mobile Top Navbar */}
      <div className="md:hidden fixed top-0 left-0 right-0 bg-white border-b z-50">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center">
            <Book className="w-6 h-6 text-indigo-600 mr-2" />
            <span className="text-lg font-bold text-indigo-600">BookReview</span>
          </div>
        </div>
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t md:hidden z-50">
        <div className="grid grid-cols-5 py-2">
          {navigationItems.filter(item => item.isVisible).map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center justify-center py-2 transition-all ${
                location.pathname === item.path
                  ? 'text-indigo-600'
                  : 'text-gray-500 hover:text-indigo-600'
              }`}
            >
              <item.icon className="w-6 h-6" />
              <span className="text-xs mt-1">{item.name}</span>
            </Link>
          ))}
          {token && (
            <button
              onClick={handleLogout}
              className="flex flex-col items-center justify-center py-2 text-red-500 hover:text-red-600"
            >
              <LogOut className="w-6 h-6" />
              <span className="text-xs mt-1">Logout</span>
            </button>
          )}
        </div>
      </div>

      {/* Main Content Area */}
      <main className="flex-grow w-full pt-14 pb-20 md:pt-0 md:pb-0 md:pl-64">
        {children}
      </main>
    </div>
  );
};

export default Navigation;
