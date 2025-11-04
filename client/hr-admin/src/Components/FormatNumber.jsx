import React from "react";

const formatNumber = (num) => {
  if (num === null || num === undefined) return "";
  return new Intl.NumberFormat("en-US").format(num);
};

export default formatNumber;
