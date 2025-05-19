import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from '../../services/api';
import axios from 'axios';
import { useSelector } from "react-redux";
// Set base URL if needed
const API_URL = "/api/bookshelves";
const saveShelvesToStorage = (shelves) => {
  localStorage.setItem('shelves', JSON.stringify(shelves));
};
const loadShelvesFromStorage = () => {
  const storedShelves = localStorage.getItem('shelves');
  return storedShelves ? JSON.parse(storedShelves) : [];
};
// // Get all shelves for logged-in user
export const fetchBookshelves = createAsyncThunk(
  "bookshelf/fetchBookshelves",
  async (token, { rejectWithValue }) => {
    try {
      
      const res = await api.get(API_URL, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data.message || err.message);
    }
  }
);

// Create a new bookshelf
export const createBookshelf = createAsyncThunk(
  "bookshelf/createBookshelf",
  async ({ name,token }, { rejectWithValue }) => {
    // const user = useSelector((state) => state.user.user);
    console.log("name:",name,token);
    console.log(token);

    try {
      const res = await axios.post(`http://localhost:3004/api/bookshelves/add`, { name }, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });
      // console.log(token);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data.message || err.message);
    }
  }
);

// Add book to shelf
export const addBookToShelf = createAsyncThunk(
  "bookshelf/addBookToShelf",
  async ({ shelfId, bookId,token }, { rejectWithValue }) => {
    try {
      // const { name, token } = useSelector((state) => state.user);
      console.log(token);
      const res = await api.put(`${API_URL}/add-book`, { shelfId, bookId }, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data.message || err.message);
    }
  }
);

// Optional: Remove book from shelf
export const removeBookFromShelf = createAsyncThunk(
  "bookshelf/removeBookFromShelf",
  async ({ shelfId, bookId,token }, { rejectWithValue }) => {
    try {
      // const { name, token } = useSelector((state) => state.user);
      const res = await api.put(`${API_URL}/remove-book`, { shelfId, bookId }, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data.message || err.message);
    }
  }
);

// Optional: Delete shelf
export const deleteBookshelf = createAsyncThunk(
  "bookshelf/deleteBookshelf",
  async ({shelfId,token },{ rejectWithValue }) => {
    try {
      console.log(shelfId,token);
      // const { name, token } = useSelector((state) => state.user);
      await api.delete(`${API_URL}/${shelfId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });
      return shelfId;
    } catch (err) {
      return rejectWithValue(err.response.data.message || err.message);
    }
  }
);

const bookshelfSlice = createSlice({
  name: "bookshelf",
  initialState: {
    shelves: loadShelvesFromStorage(),
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBookshelves.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBookshelves.fulfilled, (state, action) => {
        state.loading = false;
        state.shelves = action.payload;
        saveShelvesToStorage(action.payload);
      })
      .addCase(fetchBookshelves.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(createBookshelf.fulfilled, (state, action) => {
        console.log(action.payload);
        if(action.payload.message=="Bookshelf created"){
          state.shelves = [...state.shelves, action.payload.shelf];
          saveShelvesToStorage(state.shelves);
          // return action.payload.message;
        }
      })

      .addCase(addBookToShelf.fulfilled, (state, action) => {
        const updatedShelf = action.payload;
        console.log("updatedShelf",updatedShelf);
        const index = state.shelves.findIndex(s => s._id === updatedShelf.shelf._id);
        if (index !== -1) {
          state.shelves[index] = updatedShelf;
        }else{
          state.shelves.push(updatedShelf.shelf);
        }

      })

      .addCase(removeBookFromShelf.fulfilled, (state, action) => {
        const updatedShelf = action.payload;
        const index = state.shelves.findIndex(s => s._id === updatedShelf._id);
        if (index !== -1) {
          state.shelves[index] = updatedShelf;
        }
      })

      .addCase(deleteBookshelf.fulfilled, (state, action) => {
        console.log(action.payload);
        state.shelves = state.shelves.filter(s => s._id !== action.payload);
      });
  },
});

export default bookshelfSlice.reducer;
