import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  countries: [],
  countryCurrentTime: "",
  error: null,
  loading: false,
  success: false,
};

export const countrySlice = createSlice({
  name: "country",
  initialState,
  reducers: {
    fetchCountryRequest: (state) => {
      state.loading = true;
      state.success = false;
      state.error = null;
    },
    fetchCountrySuccess: (state, action) => {
      state.loading = false;
      state.success = true;
      state.countries = action.payload;
    },
    fetchCountryFailure: (state, action) => {
      state.loading = false;
      state.success = false;
      state.error = action.payload;
    },
    fetchCountryCurrentTimeRequest: (state) => {
      state.loading = true;
      state.success = false;
      state.error = null;
    },
    fetchCountryCurrentTimeSuccess: (state, action) => {
      state.loading = false;
      state.success = true;
      state.countryCurrentTime = action.payload;
    },
    fetchCountryCurrentTimeFailure: (state, action) => {
      state.loading = false;
      state.success = false;
      state.error = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  fetchCountryRequest,
  fetchCountrySuccess,
  fetchCountryFailure,
  fetchCountryCurrentTimeRequest,
  fetchCountryCurrentTimeSuccess,
  fetchCountryCurrentTimeFailure,
} = countrySlice.actions;

export default countrySlice.reducer;
