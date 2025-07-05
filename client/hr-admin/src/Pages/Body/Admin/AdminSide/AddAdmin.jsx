import React, { useState } from "react";
import { FaSistrix, FaArrowsUpDownLeftRight } from "react-icons/fa6";
import { useGlobalContext } from "../../../../Context/userContext";
import AddAdminModal from "../../../../Components/Modal/AddAdminModal";
import Pagination from "./Pagination";

const AddAdmin = () => {
  const [showOptions, setShowOptions] = useState(false);
  const { openModal, isModalOpen } = useGlobalContext();

  console.log(showOptions);

  return (
    <div className="bioDataProfileContainer">
      {isModalOpen && <AddAdminModal />}
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
              Status
            </button>
            <button className="btnAdmin" disabled>
              Delete
            </button>
            <button className="btnAdmin" onClick={openModal}>
              Add Admin
            </button>
          </div>
        </div>
        <div className="addAdminTable">
          <div className="tableBody">
            <table>
              <tr>
                <th>
                  <input type="checkbox" />
                </th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Created</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
              <tr>
                <td>
                  <input type="checkbox" />
                </td>
                <td>Felixx Hamed</td>
                <td>chukwuebuka.obi@theplace.com.ng</td>
                <td>Admin</td>
                <td>2025-07-30</td>
                <td>Active</td>
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
              <tr>
                <td>
                  <input type="checkbox" />
                </td>
                <td>Super Ben</td>
                <td>Ben.Odimkpa@techythings.com.ng</td>
                <td>Admin</td>
                <td>2025-07-27</td>
                <td>Active</td>
                <td>
                  <FaArrowsUpDownLeftRight />
                </td>
              </tr>
            </table>
          </div>
        </div>
        <div className="paginationBody">
          <Pagination />
        </div>
      </div>
    </div>
  );
};

export default AddAdmin;
