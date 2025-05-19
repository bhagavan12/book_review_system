// src/features/books/booksSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';

export const checkBook = createAsyncThunk(
  'books/checkBook',
  async (title, { rejectWithValue }) => {
    try {
      const response = await api.post('/api/books/check', { title });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const addBook = createAsyncThunk(
  'books/addBook',
  async (bookData, { rejectWithValue }) => {
    try {
      const response = await api.post('/api/books/add', bookData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
// Async thunk for fetching books by userId
export const getBooksByUser = createAsyncThunk(
    'books/getBooksByUser',
    async (userId, { rejectWithValue }) => {
      try {
        const response = await api.get(`/api/books/${userId}`);
        return response.data; // Returning books data
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    }
  );

const booksSlice = createSlice({
  name: 'books',
  initialState: {
    books:[],
    profilebooks:[],
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(checkBook.pending, (state) => {
        state.loading = true;
      })
      .addCase(checkBook.fulfilled, (state, action) => {
        state.loading = false;
        console.log("action.payload.book",action.payload.book);
        state.books=[];
        state.books=action.payload.book;
        // localStorage.setItem('selectedBook', JSON.stringify(action.payload.book));

      })
      .addCase(checkBook.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })
      .addCase(addBook.pending, (state) => {
        state.loading = true;
      })
      .addCase(addBook.fulfilled, (state, action) => {
        state.loading = false;
        state.books.push(action.payload.book);
      })
      .addCase(addBook.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })      
      .addCase(getBooksByUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(getBooksByUser.fulfilled, (state, action) => {
        state.loading = false;
        state.profilebooks = action.payload; // Replace current books with fetched books
      })
      .addCase(getBooksByUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Set error if any
      });
  },
});

export default booksSlice.reducer;
