import React from "react";
import "../adminUser.css";
import AddAdmin from "./AddAdmin";
import SideBarNav from "../../../SideBarNav/SideBarNav";
///
import Checkbox from "./CheckBoxTest";

const listOptions = ["apple", "banana", "cherry", "date", "elderberry", "fig", "honeydew melon"];

const Index = () => {
  const [selected, setSelected] = React.useState([]);

  function handleSelect(value, name) {
    console.log(value);
    console.log(name);
    console.log(selected);

    if (value) {
      setSelected([...selected, name]);
    } else {
      setSelected(selected.filter((item) => item !== name));
    }
  }
  console.log(selected);

  function selectAll(value) {
    //if select all check mark is checked, the updateValue call back function update value to true
    //this makes setSelected to add all listOptions
    //if unchecked, hence false, the setSelected is updated to an empty array
    if (value) {
      // if true
      setSelected(listOptions); // select all
    } else {
      // if false
      setSelected([]); // unselect all
    }
  }
  //passed name which is item, value, which checks if item selected is included in the array item, updatedValue which handles the function that add the item selected to an array of objects
  //this props are passed into the Checkbox child component.
  return (
    <div>
      <h1>Fruit List</h1>
      <Checkbox name="all" value={selected.length === listOptions.length} updateValue={selectAll}>
        Select All
      </Checkbox>
      {listOptions.map((item) => {
        return (
          <Checkbox name={item} value={selected.includes(item)} updateValue={handleSelect}>
            {item}
          </Checkbox>
        );
      })}
    </div>
  );
};

export default Index;

// const Index = () => {
//   return (
//     <div className="generalContainer">
//       <div className="sideBars">
//         <SideBarNav />
//       </div>
//       <div className="userContainer">
//         <AddAdmin />
//       </div>
//     </div>
//   );
// };
