import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getBooks } from '../redux/booksSlice';
import BookCard from '../components/BookCard';
import { Link } from 'react-router-dom';

const Home = () => {
  const dispatch = useDispatch();
  const { books, loading } = useSelector((state) => {
    const rawBooks = state.books.books;
    const parsedBooks = Array.isArray(rawBooks)
      ? rawBooks
      : rawBooks?.data || [];
    return {
      books: parsedBooks,
      loading: state.books.loading,
    };
  });

  useEffect(() => {
    dispatch(getBooks(1)); // Fetch first page
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6 sm:px-12">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl md:text-5xl font-extrabold mb-12 text-center text-indigo-700 drop-shadow-md">
          📚 Explore Books
        </h1>

        {loading ? (
          <div className="text-center text-indigo-600 font-semibold py-16">
            Loading books...
          </div>
        ) : books.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {books.map((book) => (
              <BookCard key={book._id} book={book} />
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-400 italic py-16 text-lg">
            No books available at the moment.
          </div>
        )}

        <div className="text-center mt-14">
          <Link
            to="/books"
            className="inline-block bg-indigo-600 text-white px-7 py-3 rounded-lg shadow-lg hover:bg-indigo-700 hover:scale-105 transform transition duration-300"
          >
            View All Books
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
