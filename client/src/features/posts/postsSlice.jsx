import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const url = "http://localhost:5000/posts";

export const fetchPosts = () => axios.get(url);

const initialState = {
    posts: [],
}


export const getPosts = createAsyncThunk("/...", async() => {
    try {
        const response = await axios.get(url)
        return response.data
    } catch (error) {
       console.log(error.message) 
    }
    
})
export const createPosts = createAsyncThunk("/...", async() => {
    try {
        const response = await axios.post(url)
        return response.data
    } catch (error) {
       console.log(error.message) 
    }
    
})


export const postsSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {
       fetchAll: (state, action) => {
        return action.payload
       },
       create: (state, action) => {
        return posts
       }
    },
    extraReducers: {
        [getPosts.pending]: (state) => {
            state.isLoading = true
        },
        [getPosts.fulfilled]: (state, action) => {
            state.isLoading = false
            state.posts = action.payload
        },
        [getPosts.rejected]: (state) => {
            state.isLoading = false
        },
        [createPosts.pending]: (state) => {
            state.isLoading = true
        },
        [createPosts.fulfilled]: (state, action) => {
            state.isLoading = false
            state.posts = action.payload
        },
        [createPosts.rejected]: (state) => {
            state.isLoading = false
        },
    
      }
})

export const {fetchAll, create} = postsSlice.actions;

export default postsSlice.reducer