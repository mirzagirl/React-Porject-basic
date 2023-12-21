import { put, takeLatest } from "redux-saga/effects";
import { getData } from "../../utils/axios";
import {
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
} from "../redux/usersPost";

// ENV_VARIABLE
const API_BASE_URL = "https://jsonplaceholder.typicode.com";

function* postWatcher() {
  yield takeLatest(fetchPostsRequest.type, postWorker);
  yield takeLatest(fetchUserPostsRequest.type, userPostsWorker);
  yield takeLatest(fetchUsersRequest.type, usersWorker);
  yield takeLatest(fetchUsersDetailsRequest.type, usersDetailsWorker);
}

function* postWorker(action) {
  try {
    const result = yield getData({
      url: `${API_BASE_URL}/posts`,
    });
    yield put(fetchPostsSuccess(result?.data));
  } catch (error) {
    console.error("Error in postWorker:", error);
    yield put(fetchPostsFailure(error.response?.data));
  }
}

function* userPostsWorker(action) {
  try {
    const userId = action.payload;
    const result = yield getData({
      url: `${API_BASE_URL}/posts?userId=${userId}`,
    });
    yield put(fetchUserPostsSuccess(result?.data));
  } catch (error) {
    console.error("Error in userPostsWorker:", error);
    yield put(fetchUserPostsFailure(error.response?.data));
  }
}

function* usersWorker(action) {
  try {
    const result = yield getData({
      url: `${API_BASE_URL}/users`,
    });
    yield put(fetchUsersSuccess(result?.data));
  } catch (error) {
    console.error("Error in usersWorker:", error);
    yield put(fetchUsersFailure(error.response?.data));
  }
}

function* usersDetailsWorker(action) {
  try {
    const userId = action.payload;
    const result = yield getData({
      url: `${API_BASE_URL}/users/${userId}`,
    });
    yield put(fetchUsersDetailsSuccess(result?.data));
  } catch (error) {
    console.error("Error in usersDetailsWorker:", error);
    yield put(fetchUsersDetailsFailure(error.response?.data));
  }
}

export default postWatcher;
