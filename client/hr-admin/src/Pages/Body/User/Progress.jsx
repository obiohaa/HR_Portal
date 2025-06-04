const Progress = ({ totalSteps, steps }) => {
  const progress = ((steps - 1) / (totalSteps - 1)) * 100;

  return (
    <div
      className="progress"
      style={{ height: "4px", background: "#ddd", width: "100%", transition: "all 0.4s ease-in" }}>
      <div
        className="progress"
        style={{
          height: "4px",
          background: "#43766c",
          width: `${progress}%`,
          transition: "all 0.8s ease-in",
        }}></div>
    </div>
  );
};
export default Progress;
