import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchNews = createAsyncThunk(
    '/news/fetchNews',
    async (skip, { rejectWithValue }) => {
        try {
            const response = await fetch(`https://dummyjson.com/posts?limit=10&skip=${skip}`);
            
            if  (!response.ok) throw new Error('Server error!');
            const data = await response.json();
            console.log(data.posts);
            return data.posts;
        }
        catch (error) {
            return rejectWithValue(error.message);
        }
    }
)
const newsSlice = createSlice({
    name: 'news',
    initialState: {
        items: [],
        loading: false,
        error: null,
        hasMore: true,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(fetchNews.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(fetchNews.fulfilled, (state, action) => {
            state.loading = false;
            state.items = [...state.items, ...action.payload];
            state.hasMore = action.payload.length === 10;
        })
        .addCase(fetchNews.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
    }
})

export default newsSlice.reducer;
