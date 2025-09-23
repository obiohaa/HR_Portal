import React from "react";

const FormatThisDate = (dateString) => {
  if (!dateString) return "";

  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // months are 0-based
  const year = date.getFullYear();

  //   return `${day}-${month}-${year}`;
  return `${month}-${day}-${year}`;
};

export default FormatThisDate;
