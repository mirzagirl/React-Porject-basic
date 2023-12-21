import { all } from "redux-saga/effects";
import usersPost from "./usersPost";
import countryWatcher from "./countryTime";

export default function* rootSaga() {
  yield all([usersPost(), countryWatcher()]);
}
