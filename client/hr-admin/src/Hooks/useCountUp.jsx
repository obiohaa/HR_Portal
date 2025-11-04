import { useEffect, useState } from "react";

const useCountUp = (targetValue = 0, duration = 1000) => {
  const [value, setValue] = useState(0);

  useEffect(() => {
    let start = 0;
    const increment = targetValue / (duration / 32); // ~60fps
    const animate = () => {
      start += increment;
      if (start < targetValue) {
        setValue(Math.floor(start));
        requestAnimationFrame(animate);
      } else {
        setValue(targetValue);
      }
    };
    if (targetValue > 0) animate();
  }, [targetValue, duration]);

  return value;
};

export default useCountUp;
