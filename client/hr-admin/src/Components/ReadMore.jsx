import { useState } from "react";

const ReadMore = ({ description }) => {
  const [expanded, setExpanded] = useState(false);

  const truncateText = (text, wordLimit) => {
    const words = text.split(" ");
    if (words.length <= wordLimit) return text;
    return words.slice(0, wordLimit).join(" ") + "...";
  };

  return (
    <>
      {expanded ? description : truncateText(description, 4)}
      {description.split(" ").length > 4 && (
        <div
          onClick={() => setExpanded(!expanded)}
          style={{
            display: "inline",
            color: "black",
            background: "none",
            border: "none",
            cursor: "pointer",
            marginLeft: "8px",
          }}>
          {expanded ? "Read less" : "Read more"}
        </div>
      )}
    </>
  );
};

export default ReadMore;
