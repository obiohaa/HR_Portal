import React, { useEffect, useState } from "react";
import Images from "./Images";

const Pagination = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/photos").then((response) =>
      response.json().then((data) => {
        setImages(data);
      })
    );
  }, []);
  console.log(images);
  return (
    <div>
      <Images data={images} />
    </div>
  );
};
export default Pagination;
