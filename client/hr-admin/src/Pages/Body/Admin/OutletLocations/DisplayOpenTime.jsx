// import React from "react";

function to12HourFormat(time) {
  let [hours, minutes] = time.split(":").map(Number);
  const allTime = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12; // convert "0" and "12" correctly
  return `${hours}:${minutes.toString().padStart(2, "0")} ${allTime}`;
}

function formatTimeRange(range) {
  return `${to12HourFormat(range.start)} - ${to12HourFormat(range.end)}`;
}

export default function TimeRangeDisplay(timeRange) {
  return <div>{formatTimeRange(timeRange)}</div>;
}
