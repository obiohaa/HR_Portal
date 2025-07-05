import React, { useState } from "react";
import { FaSistrix, FaArrowsUpDownLeftRight } from "react-icons/fa6";
// import { useGlobalContext } from "../../../../Context/userContext";
import AddAdminModal from "../../../../Components/Modal/AddAdminModal";

const AddAdmin = () => {
  const [showOptions, setShowOptions] = useState(false);
  // const { openModal, isModalOpen } = useGlobalContext();

  console.log(showOptions);

  return (
    <div className="bioDataProfileContainer">
      {/* {isModalOpen && <AddAdminModal />} */}
      <div
        className="addAdminBody"
        onClick={(e) => {
          if (e.target.className === "addAdminBody") setShowOptions(false);
        }}>
        <div className="addAdminControl">
          <div className="searchBar">
            <FaSistrix className="searchIcon" />
            <input className="searchInput" type="search" placeholder="Search Admins" />
          </div>
          <div className="actionButtons">
            <button className="btnAdmin" disabled>
              Delete
            </button>
            <button className="btnAdmin">Export</button>
          </div>
        </div>
        <div className="addAdminTable">
          <div className="tableBody">
            <table>
              <tr>
                <th>Name</th>
                <th>Relationship</th>
                <th>gender</th>
                <th>Phone Number</th>
                <th>Action</th>
              </tr>
              <tr>
                <td>Chiamaka Obinna</td>
                <td>sister</td>
                <td>Female</td>
                <td>7055899687</td>
                <td>
                  <div className="actionAdmin">
                    <FaArrowsUpDownLeftRight
                      className="actionIcon"
                      onClick={() => setShowOptions(true)}
                    />
                    <div className={showOptions ? "showOptions" : "actionOptions"}>
                      <div className="actionHere">Edit</div>
                      <div className="actionHere">Delete</div>
                      <div className="actionHere">Disable</div>
                    </div>
                  </div>
                </td>
              </tr>
              {/* <tr>
                <td>Loveth Sam</td>
                <td>sister</td>
                <td>female</td>
                <td>08055877935</td>
                <td>
                  <FaArrowsUpDownLeftRight />
                </td>
              </tr> */}
              {/* <tr>
                <td>Jane Doe</td>
                <td>25</td>
                <td>Nigeria</td>
              </tr>
              <tr>
                <td>Sam Doe</td>
                <td>27</td>
                <td>Ghana</td>
              </tr>
              <tr>
                <td>Sam Doe</td>
                <td>27</td>
                <td>Ghana</td>
              </tr> */}
            </table>
            <div className="pagination"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddAdmin;
