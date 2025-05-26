import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Navigation from './components/Navigation';
import Home from './components/Home';
import BookList from './pages/BookList';
import BookDetails from './pages/BookDetails';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Signup from './pages/Signup';
import AddBook from './components/AddBook';
import { Toaster } from "react-hot-toast";

function App() {
  const isLogged = useSelector((state) => state.auth.token);

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Navigation>
        <div className="container mx-auto px-4 py-6">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/books" element={<BookList />} />
            <Route path="/books/:id" element={<BookDetails />} />
            <Route 
              path="/profile" 
              element={isLogged ? <Profile /> : <Navigate to="/login" />} 
            />
            <Route 
              path="/login" 
              element={!isLogged ? <Login /> : <Navigate to="/" />} 
            />
            <Route 
              path="/signup" 
              element={!isLogged ? <Signup /> : <Navigate to="/" />} 
            />
            <Route 
              path="/add-book" 
              element={isLogged ? <AddBook /> : <Navigate to="/login" />} 
            />
          </Routes>
        </div>
      </Navigation>
      <Toaster />
    </div>
  );
}

export default App;
