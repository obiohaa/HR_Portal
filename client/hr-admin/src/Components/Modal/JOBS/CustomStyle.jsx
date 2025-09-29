// REACT SELECT COMPONENTS
const customStyles = {
  control: (provided, state) => ({
    ...provided,
    borderRadius: "4px",
    borderColor: state.isFocused ? "hsl(0, 100%, 45%);" : "#808080",
    // boxShadow: state.isFocused ? "0 0 0 0.5px hsl(0, 100%, 45%);" : "none",
    // border: "none",
    boxShadow: "none",
    padding: "4px",
    width: "100%",
    minHeight: "30px",
    "&:hover": {
      borderColor: "hsl(0, 100%, 45%);",
    },
  }),
  multiValue: (provided) => ({
    ...provided,
    backgroundColor: "hsl(0, 100%, 45%);;",
    borderRadius: "6px",
    padding: "0.5px 6px",
  }),
  multiValueLabel: (provided) => ({
    ...provided,
    color: "#fff",
    fontWeight: "500",
  }),
  multiValueRemove: (provided) => ({
    ...provided,
    color: "#fff",
    ":hover": {
      backgroundColor: "hsla(0, 46%, 68%, 1.00);",
      color: "#fff",
      cursor: "pointer",
    },
  }),
  dropdownIndicator: (provided) => ({
    ...provided,
    color: "#808080;",
    padding: "4px",
  }),

  input: (provided) => ({
    ...provided,
    color: "#000",
    fontSize: "15px",
    fontWeight: "500",
  }),
};

export default customStyles;
