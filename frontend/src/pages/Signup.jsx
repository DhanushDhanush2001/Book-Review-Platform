import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { signup } from '../service/api';
import { User, Mail, Lock } from 'lucide-react';
import toast from 'react-hot-toast';

const Signup = () => {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await signup({ userName, email, password });
      toast.success('Signed Up successfully');
      navigate('/login');
    } catch (err) {
      toast.error('Signup failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white shadow-2xl rounded-2xl overflow-hidden">
        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-6 text-center">
          <h1 className="text-3xl font-bold text-white">Create Account</h1>
          <p className="text-indigo-100 mt-2">Join our community</p>
        </div>
        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 text-indigo-500" />
            <input
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="Username"
              required
              className="w-full p-3 pl-10 border-2 border-indigo-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
            />
          </div>
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
          {error && (
            <div className="bg-red-50 border border-red-300 text-red-600 p-3 rounded-lg text-center">
              {error}
            </div>
          )}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-3 rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg"
          >
            Sign Up
          </button>
          <div className="text-center text-sm text-gray-500 mt-4">
            Already have an account?
            <Link to={'/login'} className="ml-1 text-indigo-600 hover:text-indigo-800 transition-colors">Login</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
