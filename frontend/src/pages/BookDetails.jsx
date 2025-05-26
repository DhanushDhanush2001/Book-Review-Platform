import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { Book, User, ArrowLeft } from "lucide-react";
import ReviewCard from "../components/ReviewCard";
import ReviewForm from "../components/ReviewForm";
import Spinner from "../components/Spinner";
import { fetchBookById, fetchReviews } from "../service/api";

const BookDetails = () => {
  const { id } = useParams();

  const { currentBook, reviews, loading } = useSelector((state) => state.books);
  const { token } = useSelector((state) => state.auth);
  const [activeSection, setActiveSection] = useState("description");
  const [description, setDescription] = useState("");
  const [bookReviews, setBookReviews] = useState([]);

  useEffect(() => {
    getData();
    getReviews();
  }, [id]);

  const getData = async () => {
    try {
      const { data } = await fetchBookById(id);
      setDescription(data?.book?.description);
    } catch (error) {
      console.log(error);
    }
  };

  const getReviews = async () => {
    try {
      const { data } = await fetchReviews(id);
      setBookReviews(data?.reviews);
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) return <Spinner />;

  if (!description) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 flex items-center justify-center">
        <p className="text-red-500 text-xl">Book not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 py-12 px-4">
      <div className="container mx-auto max-w-4xl bg-white shadow-2xl rounded-2xl overflow-hidden relative">
        <Link
          to="/books"
          className="absolute m-6 p-2 hover:bg-indigo-300 bg-indigo-50 rounded-full transition-colors"
        >
          <ArrowLeft className="text-indigo-600" />
        </Link>

        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-8 text-white">
          <div className="flex mt-6 items-center mb-4">
            <Book className="w-10 h-10 mr-4" />
            <div>
              <h1 className="text-3xl font-bold">{currentBook?.title}</h1>
              <p className="text-indigo-100 flex items-center mt-2">
                <User className="w-5 h-5 mr-2" />
                {currentBook?.author}
              </p>
            </div>
          </div>
          {currentBook?.genre && (
            <span className="inline-block bg-white/20 text-white text-sm px-3 py-1 rounded-full">
              {currentBook?.genre}
            </span>
          )}
        </div>

        <div className="p-8">
          <div className="flex border-b mb-6">
            {["description", "reviews"].map((section) => (
              <button
                key={section}
                onClick={() => setActiveSection(section)}
                className={`px-4 py-2 text-lg font-semibold transition-colors ${
                  activeSection === section
                    ? "text-indigo-600 border-b-2 border-indigo-600"
                    : "text-gray-500 hover:text-indigo-500"
                }`}
              >
                {section === "description" ? "Description" : "Reviews"}
              </button>
            ))}
          </div>

          {activeSection === "description" && (
            <p className="text-gray-600">{description}</p>
          )}

          {activeSection === "reviews" && (
            <div>
              {!bookReviews || bookReviews.length === 0 ? (
                <p className="text-gray-500 text-center py-8">No reviews yet</p>
              ) : (
                <div className="space-y-4">
                  {bookReviews.map((review) => (
                    <ReviewCard key={review._id} review={review} />
                  ))}
                </div>
              )}

              {token ? (
                <div className="mt-8">
                  <h3 className="text-xl font-bold text-indigo-600 mb-4">
                    Add a Review
                  </h3>
                  <ReviewForm bookId={id} />
                </div>
              ) : (
                <div className="bg-indigo-50 border border-indigo-200 text-indigo-600 p-4 rounded-lg mt-8 text-center">
                  <p>
                    Please{" "}
                    <Link to="/login" className="underline">
                      log in
                    </Link>{" "}
                    to submit a review.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
