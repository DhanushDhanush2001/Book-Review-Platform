import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Star, Send } from 'lucide-react';
import { submitReview } from '../service/api';
import { getReviews } from '../redux/booksSlice';

const ReviewForm = ({ bookId }) => {
  const [reviewText, setReviewText] = useState('');
  const [rating, setRating] = useState(0);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!reviewText.trim()) {
      setError('Please write a review');
      return;
    }

    if (rating === 0) {
      setError('Please select a rating');
      return;
    }

    setIsSubmitting(true);
    try {
      await submitReview({ bookId, reviewText: reviewText.trim(), rating });
      dispatch(getReviews(bookId));
      setReviewText('');
      setRating(0);
    } catch (err) {
      setError('Failed to submit review. Please try again.');
    }
    setIsSubmitting(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-5 sm:p-6 rounded-xl shadow-lg border border-indigo-50 max-w-lg mx-auto"
    >
      <div className="mb-4">
        <label className="block text-gray-700 font-semibold mb-2 text-base sm:text-lg">
          Rate Your Experience
        </label>
        <div className="flex justify-center space-x-1 sm:space-x-2 mb-4">
          {[1, 2, 3, 4, 5].map((num) => (
            <button
              key={num}
              type="button"
              aria-label={`Rate ${num} star${num > 1 ? 's' : ''}`}
              aria-pressed={rating === num}
              onClick={() => setRating(num)}
              className={`transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-400 rounded ${
                rating >= num
                  ? 'text-yellow-400 scale-110'
                  : 'text-gray-300 hover:text-yellow-300'
              }`}
            >
              <Star
                className={`w-6 h-6 sm:w-8 sm:h-8 ${
                  rating >= num ? 'fill-yellow-400' : 'fill-transparent'
                }`}
              />
            </button>
          ))}
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-semibold mb-2 text-base sm:text-lg">
          Your Review
        </label>
        <textarea
          value={reviewText}
          onChange={(e) => {
            setReviewText(e.target.value);
            if (error) setError('');
          }}
          placeholder="Share your thoughts about this book..."
          className="w-full p-3 border-2 border-indigo-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all min-h-[100px] sm:min-h-[120px] resize-y text-sm sm:text-base"
          rows={4}
        />
      </div>

      {error && (
        <div className="bg-red-50 border border-red-300 text-red-600 p-3 rounded-lg text-center mb-4 text-sm sm:text-base">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className={`w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-3 rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg flex items-center justify-center ${
          isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
        }`}
      >
        <Send className="mr-2 w-4 h-4 sm:w-5 sm:h-5" />
        {isSubmitting ? 'Submitting...' : 'Submit Review'}
      </button>
    </form>
  );
};

export default ReviewForm;
