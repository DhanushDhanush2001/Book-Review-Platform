import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchBooks, fetchBookById } from '../service/api';
import toast from 'react-hot-toast';
import axios from 'axios';
// Async Thunks

export const getBooks = createAsyncThunk('books/getBooks', async (page, { rejectWithValue }) => {
  try {
    const response = await fetchBooks(page);
    return response.data; // Expected to have { success: true, data: [...] }
  } catch (error) {
    toast.error(error.response?.data?.message || error.message);
    return rejectWithValue(error.response?.data?.message || error.message);
  }
});

export const getBook = createAsyncThunk('books/getBook', async (id, { rejectWithValue }) => {
  try {
    const response = await fetchBookById(id);
    return response.data;
  } catch (error) {
    toast.error(error.response?.data?.message || error.message);
    return rejectWithValue(error.response?.data?.message || error.message);
  }
});

export const getReviews = createAsyncThunk('books/getReviews', async (bookId) => {
  const response = await axios.get(`/books/${bookId}/reviews`);
  return response.data.reviews; // ✅ Only the array!
});

// Slice

const booksSlice = createSlice({
  name: 'books',
  initialState: {
    books: [],
    currentBook: null,
    reviews: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Get Books
      .addCase(getBooks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getBooks.fulfilled, (state, action) => {
        state.loading = false;
        state.books = Array.isArray(action.payload?.data) ? action.payload.data : [];
      })
      .addCase(getBooks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Get Single Book
      .addCase(getBook.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getBook.fulfilled, (state, action) => {
        state.loading = false;
        state.currentBook = action.payload;
      })
      .addCase(getBook.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Get Reviews
      .addCase(getReviews.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getReviews.fulfilled, (state, action) => {
        state.loading = false;
        state.reviews = Array.isArray(action.payload) ? action.payload : []; // ✅ safe fallback
      })
      .addCase(getReviews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.reviews = []; // clear reviews on error
      });
  },
});

export default booksSlice.reducer;
