import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/api/v1',
});


api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  } else {
    console.warn("No token found in localStorage");
  }
  return config;
});



export const fetchBooks = (page = 1, limit = 10) => api.get(`/books/getbooks?page=${page}&limit=${limit}`);
export const fetchBookById = (id) => api.get(`/books/getsinglebook/${id}`);
export const addBook = (data) => api.post('/books/addbooks', data);


// Review APIs
export const fetchReviews = (bookId) => api.get(`/reviews/getreviews/${bookId}`);
export const submitReview = (data) => api.post('/reviews/postreviews', data);


// Auth APIs
export const signup = (data) => api.post('/auth/signup', data);
export const login = (data) => api.post('/auth/login', data);
export const fetchUser = (id) => api.get(`/auth/userprofile/${id}`);
export const updateUser = (id, data) => api.put(`/auth/updateprofile/${id}`, data);

