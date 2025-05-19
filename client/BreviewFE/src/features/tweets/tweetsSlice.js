import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/api";

// Fetch all tweets initially
export const fetchTweets = createAsyncThunk(
  "tweets/fetchTweets",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/api/reviews/all-tweets");
      console.log("all tweets",response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Add a new tweet
export const addTweet = createAsyncThunk(
  "tweets/addTweet",
  async ({ bookId, userId, tweet }, { rejectWithValue }) => {
    try {
      const response = await api.post("/api/reviews/tweet", { bookId, userId, tweet });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const tweetsSlice = createSlice({
  name: "tweets",
  initialState: { tweets: [], books: [], loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTweets.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTweets.fulfilled, (state, action) => {
        state.tweets = action.payload.tweets || [];  // ✅ Directly store tweets array
        state.books = action.payload.books || [];
      })
      .addCase(fetchTweets.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addTweet.fulfilled, (state, action) => {
        console.log("action.payload",action.payload);
        state.tweets.unshift(action.payload.tweet_added); // Add new tweet at the top
      });
  },
});

export default tweetsSlice.reducer;
