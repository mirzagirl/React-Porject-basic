import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCountryRequest,
  fetchCountryCurrentTimeRequest,
} from "../redux-saga/redux/countryTime";
import Clock from "./clock";

const Country = () => {
  const { countries, countryCurrentTime } = useSelector(
    (state) => state.country,
  );
  const dispatch = useDispatch();
  const [time, setTime] = useState("");
  const [selectedOption, setSelectedOption] = useState("");

  useEffect(() => {
    dispatch(fetchCountryRequest());
  }, []);

  useEffect(() => {
    if (selectedOption)
      dispatch(fetchCountryCurrentTimeRequest(selectedOption));
  }, [selectedOption]);

  useEffect(() => {
    setTime(countryCurrentTime?.datetime);
  }, [countryCurrentTime]);
  useEffect(() => {
    if (selectedOption) {
      dispatch(fetchCountryCurrentTimeRequest(selectedOption));
    }
  }, [selectedOption]);

  const handleInputChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <>
      <div className="box">
        Country Dropdown :
        <select
          id="countries"
          className="searchable-dropdown"
          value={selectedOption}
          onChange={handleInputChange}
        >
          {countries &&
            Object.entries(countries).map(([index, label]) => (
              <option key={label} value={label}>
                {label}
              </option>
            ))}
        </select>
      </div>
      <Clock utcDatetime={time} />
    </>
  );
};

export default Country;
