import React from "react";

export default function Checkbox({ name, value = false, updateValue = () => {}, children }) {
  // handle checkbox change
  const handleChange = () => {
    updateValue(!value, name);
  };
  //here we have the child component with the props name, value by default is false, updatedValue arrow function and prop children
  //in the input tag, with type checkbox, id is name-checkbox, checked is value which is false by default then onChange function calls the
  //handle change: this function is initiated when a box is checked (change in state), the function then update the value to true then passes the name of the input that is checked into the function updateValue. updateValue takes two parameters (value and name)
  //U can pass a prop from parent to child (you can pass a function from parent to child) and u can pass that function parameter value from child back to parent

  return (
    <div className="my-5">
      <input
        type="checkbox"
        id={`${name}-checkbox`}
        name={name}
        checked={value}
        onChange={handleChange}
      />
      <label for={`${name}-checkbox`}>{children}</label>
    </div>
  );
}
