import axios from "axios";
import { isEqual } from "lodash";
import qs from "qs";

const defaultConfig = {
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
  },
};

const bodyFormatter = (data, config) => {
  if (isEqual(config, defaultConfig)) {
    return qs.stringify(data);
  }
  return data;
};

export const getData = ({ url, params }) => {
  // const headers = defaultConfig.headers;
  const headers = {
    "Content-Type": "application/x-www-form-urlencoded",
  };
  const options = {
    method: "GET",
    params,
    url,
    headers,
  };
  return axios(options);
};

export const postData = ({ url, body }, config = defaultConfig) =>
  axios.post(url, bodyFormatter(body, config), config);

export const putData = ({ url, body }, config = defaultConfig) =>
  axios.put(url, bodyFormatter(body, config), config);

export const patchData = ({ url, body }, config = defaultConfig) =>
  axios.patch(url, bodyFormatter(body, config), config);

export const deleteData = (url, data) => axios.delete(url, { data });
