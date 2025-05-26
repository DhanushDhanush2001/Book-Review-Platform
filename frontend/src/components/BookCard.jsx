import { Link } from 'react-router-dom';
import { Book, User } from 'lucide-react';

const BookCard = ({ book }) => (
  <Link 
    to={`/books/${book._id}`} 
    className="group block bg-white shadow-lg rounded-xl overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
  >
    <div className="p-6">
      <div className="flex items-center mb-4">
        <Book className="w-8 h-8 text-indigo-500 mr-3 group-hover:text-indigo-600 transition-colors" />
        <h3 className="text-xl font-bold text-gray-800 group-hover:text-indigo-600 transition-colors">
          {book.title}
        </h3>
      </div>
      <div className="flex items-center text-gray-600">
        <User className="w-5 h-5 mr-2 text-gray-400" />
        <span className="text-sm font-medium group-hover:text-gray-800 transition-colors">
          {book.author}
        </span>
      </div>
      {book.genre && (
        <div className="mt-4">
          <span className="inline-block bg-indigo-50 text-indigo-600 text-xs px-2 py-1 rounded-full">
            {book.genre}
          </span>
        </div>
      )}
      {book.rating && (
        <div className="mt-4 flex items-center">
          <div className="flex">
            {[...Array(5)].map((star, index) => (
              <svg 
                key={index} 
                xmlns="http://www.w3.org/2000/svg" 
                className={`h-5 w-5 ${
                  index < Math.floor(book.rating) 
                    ? 'text-yellow-400' 
                    : 'text-gray-300'
                }`} 
                viewBox="0 0 20 20" 
                fill="currentColor"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <span className="ml-2 text-sm text-gray-500">({book.rating}/5)</span>
        </div>
      )}
    </div>
  </Link>
);

export default BookCard;