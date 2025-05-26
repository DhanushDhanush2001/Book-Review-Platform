import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { setUser } from '../redux/authSlice';
import { login } from '../service/api';
import { Mail, Lock } from 'lucide-react';
import toast from 'react-hot-toast';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await login({ email, password });
      dispatch(setUser({
        user: response.data.user._id,
        token: response.data.token,
        isAdmin: response.data.user.isAdmin
      }));
      localStorage.setItem('userId', response.data.user._id);
      localStorage.setItem('isAdmin', response.data.user.isAdmin);
      toast.success("Logged in successfully");
      navigate('/');
    } catch (err) {
      toast.error('Invalid email or password');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 py-8 px-4">
      <div className="w-full max-w-md bg-white shadow-2xl rounded-2xl overflow-hidden">
        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-6 text-center">
          <h1 className="text-3xl font-bold text-white">Welcome Back</h1>
          <p className="text-indigo-100 mt-2">Sign in to continue</p>
        </div>
        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-indigo-500" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email Address"
              required
              className="w-full p-3 pl-10 border-2 border-indigo-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
            />
          </div>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-indigo-500" />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
              className="w-full p-3 pl-10 border-2 border-indigo-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-3 rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg"
          >
            Sign In
          </button>
          <div className="text-center text-sm text-gray-500 mt-4">
            Don't have an account?
            <Link to="/signup" className="ml-1 hover:text-indigo-600 transition-colors">SignUp</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
