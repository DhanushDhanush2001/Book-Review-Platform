import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BookOpen, Filter, Search } from 'lucide-react';
import { getBooks } from '../redux/booksSlice';
import BookCard from '../components/BookCard';
import Spinner from '../components/Spinner';

const BookList = () => {
  const dispatch = useDispatch();
  const { books, loading, error } = useSelector((state) => {
    const rawBooks = state.books.books;
    const parsedBooks = Array.isArray(rawBooks)
      ? rawBooks
      : rawBooks?.data || [];
    return {
      books: parsedBooks,
      loading: state.books.loading,
      error: state.books.error,
    };
  });

  const [searchTerm, setSearchTerm] = useState('');
  const [genre, setGenre] = useState('');
  const [page, setPage] = useState(1);

  const genres = ['Fiction', 'Non-Fiction', 'Science Fiction', 'Mystery', 'Romance'];

  useEffect(() => {
    dispatch(getBooks(page));
  }, [dispatch, page]);

  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (genre ? book.genre === genre : true)
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 py-12">
      <div className="container mx-auto max-w-6xl">
        <div className="bg-white shadow-2xl rounded-2xl overflow-hidden">
          <div className="bg-gradient-to-r from-indigo-500 to-purple-600 py-4 px-8 text-white">
            <div className="flex items-center justify-center mb-4">
              <BookOpen className="w-10 h-10 mr-4" />
              <h1 className="text-3xl font-bold">Book Collection</h1>
            </div>
            <div className="flex flex-col gap-2 md:flex-row items-center space-x-4">
              <div className="relative flex-grow">
                <input
                  type="text"
                  placeholder="Search books..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full p-3 pl-10 text-gray-100 rounded-lg border-1 focus:outline-none focus:ring-2 focus:ring-indigo-300"
                />
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-100" />
              </div>
              <div className="relative">
                <select
                  value={genre}
                  onChange={(e) => setGenre(e.target.value)}
                  className="w-full p-3 pl-10 text-gray-900 rounded-lg border-1 border-white focus:outline-none focus:ring-2 focus:ring-indigo-300"
                >
                  <option value="">All Genres</option>
                  {genres.map((g) => (
                    <option key={g} value={g}>{g}</option>
                  ))}
                </select>
                <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-100" />
              </div>
            </div>
          </div>

          <div className="p-8">
            {loading && (
              <div className="flex justify-center">
                <Spinner />
              </div>
            )}

            {error && (
              <div className="bg-red-50 border border-red-300 text-red-600 p-4 rounded-lg text-center">
                {error}
              </div>
            )}

            {!loading && filteredBooks.length === 0 ? (
              <div className="text-center text-gray-500 py-12">
                No books found
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredBooks.map((book) => (
                  <BookCard key={book._id} book={book} />
                ))}
              </div>
            )}

            <div className="flex justify-center mt-8 space-x-4">
              <button
                onClick={() => {
                  setPage(Math.max(1, page - 1));
                  window.scrollTo(0, 0);
                }}
                disabled={page === 1}
                className="px-4 py-2 bg-indigo-50 text-indigo-600 rounded-lg disabled:opacity-50 hover:bg-indigo-100 transition-colors"
              >
                Previous
              </button>
              <span className="px-4 py-2 bg-indigo-100 text-indigo-600 rounded-lg">
                Page {page}
              </span>
              <button
                onClick={() => {
                  setPage(page + 1);
                  window.scrollTo(0, 0);
                }}
                disabled={filteredBooks.length < 9}
                className="px-4 py-2 bg-indigo-50 text-indigo-600 rounded-lg disabled:opacity-50 hover:bg-indigo-100 transition-colors"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookList;
