import React, { useState, useEffect } from "react";
import { format, addMilliseconds } from "date-fns";

const Clock = ({ utcDatetime }) => {
  const [time, setTime] = useState(
    new Date(utcDatetime || "2023-12-21T06:20:26.447963-04:00"),
  );
  const [isRunning, setIsRunning] = useState(true);

  useEffect(() => {
    if (utcDatetime) {
      const offsetIndex =
        utcDatetime.indexOf("+") !== -1
          ? utcDatetime.indexOf("+")
          : utcDatetime.indexOf("-");
      const withoutOffset = utcDatetime.slice(0, offsetIndex); // Remove the offset part
      const offset = utcDatetime.slice(offsetIndex);
      const parsedDate = new Date(withoutOffset);

      // Adjust the time based on the offset
      setTime((prevTime) => new Date(prevTime.getTime() + parseOffset(offset)));

      // Helper function to parse the offset and convert it to milliseconds
      const parseOffset = (offset) => {
        const [hours, minutes] = offset.slice(1).split(":");
        const totalMilliseconds =
          (parseInt(hours, 10) * 60 + parseInt(minutes, 10)) * 60 * 1000;
        return offset[0] === "+" ? totalMilliseconds : -totalMilliseconds;
      };
    }
  }, [utcDatetime]);

  useEffect(() => {
    let interval;

    if (isRunning) {
      interval = setInterval(() => {
        setTime((prevTime) => addMilliseconds(prevTime, 1000)); // Add 1000 milliseconds (1 second)
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isRunning]);

  const togglePause = () => {
    setIsRunning(!isRunning);
  };

  return (
    <>
      <div className="clock-container">
        <span className="clock-text">{format(time, "HH:mm:ss")}</span>
        <button
          onClick={togglePause}
          className={isRunning ? "play-button" : "pause-button"}
        >
          {isRunning ? "Pause" : "Play"}
        </button>
      </div>
    </>
  );
};

export default Clock;
