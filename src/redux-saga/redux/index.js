import { combineReducers } from "@reduxjs/toolkit";
import post from "./usersPost";
import country from "./countryTime";

const rootReducer = combineReducers({
  post,
  country,
});

export default rootReducer;
