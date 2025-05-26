import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { User, Mail, LogOut, Save } from 'lucide-react';
import { fetchUser, updateUser } from '../service/api';
import { logout } from '../redux/authSlice';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const Profile = () => {
  const { user, token } = useSelector((state) => state.auth);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!token) navigate('/login');
    const loadUser = async () => {
      try {
        const response = await fetchUser(user);
        
        setUsername(response.data.username);
        setEmail(response.data.email);
      } catch (err) {
        setError('Failed to load user data');
      }
    };
    loadUser();
  }, [token, user, navigate]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!username.trim()) {
      setError('Username cannot be empty');
      return;
    }

    try {
      await updateUser(user.id, { username, email });
      setSuccess('Profile updated successfully');
    } catch (err) {
      setError('Failed to update profile');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md bg-white shadow-2xl rounded-2xl overflow-hidden">
        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-6 text-center">
          <div className="mx-auto w-24 h-24 bg-white/20 rounded-full flex items-center justify-center mb-4">
            <User className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white">My Profile</h1>
        </div>

        <form onSubmit={handleUpdate} className="p-8 space-y-6">
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 text-indigo-500" />
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              placeholder="Username"
              className="w-full p-3 pl-10 border-2 border-indigo-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
            />
          </div>

          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-indigo-500" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Email"
              className="w-full p-3 pl-10 border-2 border-indigo-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
            />
          </div>

          {error && (
            <div className="bg-red-50 border border-red-300 text-red-600 p-3 rounded-lg text-center">
              {error}
            </div>
          )}

          {success && (
            <div className="bg-green-50 border border-green-300 text-green-600 p-3 rounded-lg text-center">
              {success}
            </div>
          )}

          <button 
            type="submit" 
            className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-3 rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all transform hover:scale-105 active:scale-95 shadow-lg flex items-center justify-center"
          >
            <Save className="mr-2 w-5 h-5" />
            Update Profile
          </button>

          <button
            onClick={() => {
              dispatch(logout());
              navigate('/login');
              toast.success('Logged out successfully')
            }}
            className="w-full bg-red-50 text-red-600 p-3 rounded-lg hover:bg-red-100 transition-all flex items-center justify-center"
          >
            <LogOut className="mr-2 w-5 h-5" />
            Logout
          </button>
        </form>
      </div>
    </div>
  );
};

export default Profile;