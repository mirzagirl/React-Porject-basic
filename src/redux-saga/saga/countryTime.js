import { put, takeLatest } from "redux-saga/effects";
import { getData } from "../../utils/axios";
import {
  fetchCountryRequest,
  fetchCountrySuccess,
  fetchCountryFailure,
  fetchCountryCurrentTimeRequest,
  fetchCountryCurrentTimeSuccess,
  fetchCountryCurrentTimeFailure,
} from "../redux/countryTime";

function* countryWatcher() {
  yield takeLatest(fetchCountryRequest.type, countryWorker);
  yield takeLatest(fetchCountryCurrentTimeRequest.type, countryTimeWorker);
}

function* countryWorker(action) {
  try {
    const result = yield getData({
      url: "http://worldtimeapi.org/api/timezone",
    });
    if (result && result.data) {
      yield put(fetchCountrySuccess(result.data));
    }
  } catch (error) {
    console.error("Error in countryWorker:", error);
    yield put(fetchCountryFailure(error.response?.data));
  }
}

function* countryTimeWorker(action) {
  try {
    const place = action.payload;
    const result = yield getData({
      url: `http://worldtimeapi.org/api/timezone/${place}`,
    });
    yield put(fetchCountryCurrentTimeSuccess(result.data));
  } catch (error) {
    console.error("Error in countryTimeWorker:", error);
    yield put(fetchCountryCurrentTimeFailure(error.response?.data));
  }
}

export default countryWatcher;
