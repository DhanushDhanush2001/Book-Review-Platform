import { User, Star, Quote } from 'lucide-react';

const ReviewCard = ({ review }) => (
  <div className="bg-white border border-indigo-50 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 group">
    <div className="flex items-start mb-4">
      <Quote className="w-6 h-6 text-indigo-500 mr-3 opacity-70 group-hover:text-indigo-600 transition-colors" />
      <p className="text-gray-800 text-base flex-grow italic">
        "{review?.reviewText}"
      </p>
    </div>
    <div className="flex items-center justify-between mt-4">
      <div className="flex items-center">
        <User className="w-5 h-5 mr-2 text-gray-400" />
        <span className="text-sm font-medium text-gray-600">
          {review?.userId?.userName || 'Anonymous'}
        </span>
      </div>
      <div className="flex items-center">
        <div className="flex mr-2">
          {[...Array(5)]?.map((_, index) => (
            <Star
              key={index}
              className={`w-5 h-5 ${
                index < Math.floor(review.rating) 
                  ? 'text-yellow-400 fill-yellow-400' 
                  : 'text-gray-300'
              }`}
            />
          ))}
        </div>
        <span className="text-sm text-gray-500">
          {review?.rating}/5
        </span>
      </div>
    </div>
  </div>
);

export default ReviewCard;