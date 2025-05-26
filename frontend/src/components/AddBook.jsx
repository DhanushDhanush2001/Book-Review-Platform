import {useState, useEffect} from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { addBook } from '../service/api';
import { Book, User, FileText, Tag } from 'lucide-react';
import toast from 'react-hot-toast';

const AddBook = () =>{
    const [title,setTitle] = useState('');
    const [author,setAuthor] = useState('');
    const [description, setDescription] = useState('');
    const [genre, setGenre] = useState('');
    const [error, setError] = useState('');
    const {token, isAdmin} = useSelector((state)=>state.auth);
    const navigate = useNavigate();

    useEffect(()=>{
        if(!token || !isAdmin){
            navigate('/login');
        }
    },[])

    const handleSubmit = async (e) =>{
        e.preventDefault();
        setError('');
        try{
            const bookData = {title,author,description,genre};
            await addBook(bookData);
            toast.success('Book added successfully')
            navigate('/books');
        } catch(error){
            toast.error('Failed to add book. Please try again');
        }
    };
   return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white shadow-2xl rounded-2xl overflow-hidden">
        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-6 text-center">
          <h1 className="text-3xl font-bold text-white">Add New Book</h1>
          <p className="text-indigo-100 mt-2">Share a new story with the community</p>
        </div>
        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <div className="relative">
            <Book className="absolute left-3 top-1/2 -translate-y-1/2 text-indigo-500" />
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Book Title"
              required
              className="w-full p-3 pl-10 border-2 border-indigo-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
            />
          </div>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 text-indigo-500" />
            <input
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              placeholder="Author Name"
              required
              className="w-full p-3 pl-10 border-2 border-indigo-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
            />
          </div>
          <div className="relative">
            <FileText className="absolute left-3 top-1/2 -translate-y-1/2 text-indigo-500" />
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Description"
              className="w-full p-3 pl-10 border-2 border-indigo-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all min-h-[100px]"
            />
          </div>
          <div className="relative">
            <Tag className="absolute left-3 top-1/2 -translate-y-1/2 text-indigo-500" />
            <input
              type="text"
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
              placeholder="Genre"
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
            Add Book
          </button>
          <div className="text-center text-sm text-gray-500 mt-4">
            Back to{' '}
            <Link to="/books" className="ml-1 hover:text-indigo-600 transition-colors">
              Book List
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddBook;