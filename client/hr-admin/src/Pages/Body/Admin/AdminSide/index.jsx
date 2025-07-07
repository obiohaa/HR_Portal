import React, { useState, useRef, useEffect } from "react";
import "../adminUser.css";
import AddAdmin from "./AddAdmin";
import SideBarNav from "../../../SideBarNav/SideBarNav";

const Index = () => {
  return (
    <div className="generalContainer">
      <div className="sideBars">
        <SideBarNav />
      </div>
      <div className="userContainer">
        <AddAdmin />
      </div>
    </div>
  );
};

// const items = [
//   { id: 1, name: "Item A", description: "This is the description for Item A", price: 100 },
//   { id: 2, name: "Item B", description: "This is the description for Item B", price: 200 },
//   { id: 3, name: "Item C", description: "This is the description for Item C", price: 300 },
// ];

// const Index = () => {
//   const [data, setData] = useState(items);
//   const [selectedId, setSelectedId] = useState(null);

//   const handleEdit = (id) => {
//     const name = prompt("New name:");
//     const description = prompt("New description:");
//     const price = prompt("New price:");

//     if (name && description && !isNaN(price)) {
//       setData((prev) =>
//         prev.map((item) =>
//           item.id === id ? { ...item, name, description, price: Number(price) } : item
//         )
//       );
//       setSelectedId(null);
//     }
//   };

//   const handleDelete = (id) => {
//     setData((prev) => prev.filter((item) => item.id !== id));
//     setSelectedId(null);
//   };

//   return (
//     <div style={{ padding: "20px" }}>
//       <h2>Item Table</h2>
//       <table style={{ width: "100%", borderCollapse: "collapse", position: "relative" }}>
//         <thead>
//           <tr style={{ backgroundColor: "#f0f0f0" }}>
//             <th style={{ padding: "10px", textAlign: "left" }}>Name</th>
//             <th style={{ padding: "10px", textAlign: "left" }}>Description</th>
//             <th style={{ padding: "10px", textAlign: "left" }}>Price</th>
//             <th style={{ width: "120px" }}></th> {/* Space for modal */}
//           </tr>
//         </thead>
//         <tbody>
//           {data.map((item) => (
//             <tr
//               key={item.id}
//               style={{ borderBottom: "1px solid #ddd", position: "relative" }}
//               onClick={() => setSelectedId((prev) => (prev === item.id ? null : item.id))}>
//               <td style={{ padding: "10px" }}>{item.name}</td>
//               <td style={{ padding: "10px" }}>{item.description}</td>
//               <td style={{ padding: "10px" }}>${item.price}</td>
//               <td style={{ padding: "10px", position: "relative" }}>
//                 {selectedId === item.id && (
//                   <div
//                     style={{
//                       position: "absolute",
//                       top: "50%",
//                       right: "0",
//                       transform: "translateY(-50%)",
//                       backgroundColor: "#fff",
//                       border: "1px solid #ccc",
//                       borderRadius: "4px",
//                       boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
//                       zIndex: 1,
//                       padding: "10px",
//                       display: "flex",
//                       flexDirection: "column",
//                       gap: "5px",
//                       minWidth: "90px",
//                     }}
//                     onClick={(e) => e.stopPropagation()}>
//                     <button onClick={() => handleEdit(item.id)}>Edit</button>
//                     <button onClick={() => handleDelete(item.id)}>Delete</button>
//                   </div>
//                 )}
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

export default Index;

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// const items = [
//   { id: 1, name: "Item A", description: "This is the description for Item A", price: 100 },
//   { id: 2, name: "Item B", description: "This is the description for Item B", price: 200 },
//   { id: 3, name: "Item C", description: "This is the description for Item C", price: 300 },
// ];

// const Index = () => {
//   const [data, setData] = useState(items);
//   const [selectedItemId, setSelectedItemId] = useState(null);
//   const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });
//   const tableRef = useRef(null);

//   const handleSelect = (event, id) => {
//     const row = event.currentTarget;
//     console.log(row);
//     // const rect = row.getBoundingClientRect();
//     const containerRect = tableRef.current.getBoundingClientRect();
//     console.log(containerRect);

//     setMenuPosition({
//       top: row.offsetTop + row.offsetHeight / 2 - 20,
//       left: containerRect.width - 100,
//     });
//     //if prev value, in this case null is same as id, return null else return id as the new selectedItemId.
//     setSelectedItemId((prev) => (prev === id ? null : id));
//   };
//   console.log(menuPosition);
//   const handleDelete = (id) => {
//     setData((prev) => prev.filter((item) => item.id !== id));
//     setSelectedItemId(null);
//   };

//   const handleEdit = (id) => {
//     const name = prompt("New name:");
//     const description = prompt("New description:");
//     const price = prompt("New price:");

//     setData((prev) =>
//       prev.map((item) =>
//         item.id === id ? { ...item, name, description, price: Number(price) } : item
//       )
//     );
//     setSelectedItemId(null);
//   };

//   useEffect(() => {
//     const closeMenu = () => setSelectedItemId(null);
//     window.addEventListener("click", closeMenu);
//     return () => window.removeEventListener("click", closeMenu);
//   }, []);

//   return (
//     <div style={{ padding: "20px", position: "relative" }}>
//       <h2>Item Table</h2>

//       <div ref={tableRef} style={{ position: "relative" }}>
//         <table
//           border="1"
//           cellPadding="10"
//           cellSpacing="0"
//           style={{ width: "100%", position: "relative" }}>
//           <thead>
//             <tr style={{ backgroundColor: "#f0f0f0" }}>
//               <th>Name</th>
//               <th>Description</th>
//               <th>Price ($)</th>
//             </tr>
//           </thead>
//           <tbody>
//             {data.map((item) => (
//               <tr
//                 key={item.id}
//                 onClick={(e) => {
//                   e.stopPropagation();
//                   handleSelect(e, item.id);
//                 }}
//                 style={{
//                   backgroundColor: selectedItemId === item.id ? "#e6f7ff" : "white",
//                   cursor: "pointer",
//                 }}>
//                 <td>{item.name}</td>
//                 <td>{item.description}</td>
//                 <td>{item.price}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>

//         {/* Floating Options Menu */}
//         {selectedItemId && (
//           <div
//             onClick={(e) => e.stopPropagation()}
//             style={{
//               position: "absolute",
//               top: menuPosition.top,
//               left: menuPosition.left,
//               backgroundColor: "#fff",
//               border: "1px solid #ccc",
//               borderRadius: "4px",
//               boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
//               padding: "10px",
//               zIndex: 100,
//               minWidth: "90px",
//             }}>
//             <button
//               onClick={() => handleEdit(selectedItemId)}
//               style={{ display: "block", marginBottom: "5px" }}>
//               Edit
//             </button>
//             <button onClick={() => handleDelete(selectedItemId)}>Delete</button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };
