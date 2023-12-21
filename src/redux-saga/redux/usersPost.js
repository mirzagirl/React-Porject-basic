import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  posts: [],
  users: [],
  error: null,
  loading: false,
  success: false,
  usersPost: [],
  userData: "",
};

export const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    fetchPostsRequest: (state) => {
      state.loading = true;
      state.success = false;
      state.error = null;
    },
    fetchPostsSuccess: (state, action) => {
      state.loading = false;
      state.success = true;
      state.posts = action.payload;
    },
    fetchPostsFailure: (state, action) => {
      state.loading = false;
      state.success = false;
      state.error = action.payload;
    },
    fetchUsersRequest: (state) => {
      state.loading = true;
      state.success = false;
      state.error = null;
    },
    fetchUsersSuccess: (state, action) => {
      state.loading = false;
      state.success = true;
      state.users = action.payload;
    },
    fetchUsersFailure: (state, action) => {
      state.loading = false;
      state.success = false;
      state.error = action.payload;
    },
    fetchUserPostsRequest: (state) => {
      state.loading = true;
      state.success = false;
      state.error = "";
    },
    fetchUserPostsSuccess: (state, action) => {
      state.loading = false;
      state.success = true;
      state.usersPost = action.payload;
    },
    fetchUserPostsFailure: (state, action) => {
      state.loading = false;
      state.success = false;
      state.error = action.payload;
    },
    fetchUsersDetailsRequest: (state) => {
      state.loading = true;
      state.success = false;
      state.error = "";
    },
    fetchUsersDetailsSuccess: (state, action) => {
      state.loading = false;
      state.success = true;
      state.userData = action.payload;
    },
    fetchUsersDetailsFailure: (state, action) => {
      state.loading = false;
      state.success = false;
      state.error = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  fetchPostsRequest,
  fetchPostsSuccess,
  fetchPostsFailure,
  fetchUserPostsRequest,
  fetchUserPostsSuccess,
  fetchUserPostsFailure,
  fetchUsersRequest,
  fetchUsersSuccess,
  fetchUsersFailure,
  fetchUsersDetailsRequest,
  fetchUsersDetailsSuccess,
  fetchUsersDetailsFailure,
} = postSlice.actions;
export default postSlice.reducer;
