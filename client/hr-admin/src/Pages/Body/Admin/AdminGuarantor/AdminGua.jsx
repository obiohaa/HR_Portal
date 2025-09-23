import React, { useState, useRef, useEffect } from "react";
import {
  FaSistrix,
  FaArrowsUpDownLeftRight,
  FaRegEye,
  FaPencil,
  FaTrashCan,
} from "react-icons/fa6";
import { useGlobalContext } from "../../../../Context/userContext";
import DeleteGUAModal from "../../../../Components/Modal/GUA/DeleteGUAModal";
import EmployeeGuaModal from "../../../../Components/Modal/GUA/EmployeeGuaModal";
import EditEmployeeGuaModal from "../../../../Components/Modal/GUA/EditEmployeeGuaModal";
import ExportGua from "../../../../Components/Modal/Exports/ExportGua";
import Checkbox from "../../../../Components/CheckBoxTest";
import { useQuery } from "@tanstack/react-query";
import { axiosFetch } from "../../../../Utils/axiosFetch";
import PageLoading from "../../../../Components/Checks/PageLoading";
import capitalizeFirstLetter from "../../../../Components/ToUpperCase";
import ReactPaginate from "react-paginate";
import { toast } from "react-toastify";
import NoData from "../../../../Components/Modal/NoData";
import "../adminUser.css";

const AdminGua = () => {
  const [selected, setSelected] = useState([]);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const {
    openDelModal,
    isExportModalOpen,
    openExportModal,
    isDeleteModalOpen,
    isViewModalOpen,
    openViewModal,
    openEditModal,
    isEditModalOpen,
  } = useGlobalContext();
  const [paginationData, setPaginationData] = useState([]);
  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [viewUser, setViewUser] = useState(null);
  const [editUser, setEditUser] = useState(null);
  const [selectPerPage, setSelectPerPage] = useState(false);
  const modalRef = useRef(null);
  const modalRefAgainAgain = useRef(null);
  // Get initial itemsPerPage from localStorage (or default to 5)
  const [itemsPerPage, setItemsPerPage] = useState(() => {
    const saved = localStorage.getItem("itemsPerPage");
    return saved ? Number(saved) : 5;
  });

  //GET ALL ADMIN USERS
  const { data, isLoading, error } = useQuery({
    queryKey: ["adminGuaData"],
    retryOnMount: true, //do not retry on mount
    refetchOnWindowFocus: true, //do not refetch on window focus
    refetchOnReconnect: true, //do not refetch on reconnect
    refetchOnMount: true, //do not refetch on mount
    refetchInterval: false, //do not refetch at intervals
    refetchIntervalInBackground: true, //do not refetch in background
    queryFn: async () => {
      const { data } = await axiosFetch.get("/admins/getAllGuarantor");
      // console.log(data);
      console.log(data.AllGuarantor);
      // console.log(data.AllBioData.length);
      setPaginationData(data.AllGuarantor);
      setSelected([]);
      //   setItemOffset(0);
      return data;
    },
  });

  //USE STALE DATA IF AVAILABLE
  // This will set the pagination data to the fetched data when it is available
  useEffect(() => {
    data && setPaginationData(data.AllGuarantor);
  }, [data]);

  // console.log(data);
  if (error) {
    toast.error(
      <div>
        <span>
          {error.response ? error.response.data.msg : "Something went wrong contact Admin"}
        </span>
      </div>,
      {
        position: "top-center",
        autoClose: 8000,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        className: "toastBad",
      }
    );
  }
  //END GET ALL ADMIN USERS

  // SEARCH SECTION
  const handleSearch = (e) => {
    e.preventDefault();
    const query = e.target.value.trim().toLowerCase();
    setSearchQuery(query);

    const filterQuery = data.AllGuarantor.filter((user) => {
      const fullName = `${user.fullName}`.toLowerCase();
      const employeeFullName = `${user?.user?.firstName} ${user?.user?.lastName}`.toLowerCase();
      return fullName.includes(query) || employeeFullName.includes(query);
    });
    setPaginationData(filterQuery);
    //Controls what page to display when you search, in this case page 1
    setItemOffset(0);
  };
  // END SEARCH SECTION
  // console.log(paginationData);
  // PAGINATION SECTION
  const [itemOffset, setItemOffset] = useState(0);

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    // console.log(`Loading items from ${itemOffset} to ${endOffset}`);
    setCurrentItems(paginationData.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(paginationData.length / itemsPerPage));
    // console.log(currentItems);
    // Invoke when user click to request another page.
  }, [itemOffset, paginationData, itemsPerPage]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % paginationData.length;
    // console.log(`User requested page number ${event.selected}, which is offset ${newOffset}`);
    setItemOffset(newOffset);
  };

  const handleItemsPerPageChange = (value) => {
    const newValue = Number(value);
    setItemsPerPage(newValue);
    localStorage.setItem("itemsPerPage", newValue); // persist choice
    setItemOffset(0); // reset to first page
    setSelectPerPage(false); // close the dropdown after selection
  };

  const start = itemOffset + 1;
  const end = Math.min(itemOffset + itemsPerPage, paginationData.length);
  const total = paginationData.length;

  // PAGINATION SECTION END

  // CHECKBOX SECTION
  function handleSelect(value, name) {
    if (value) {
      setSelected([...selected, name]);
    } else {
      setSelected(selected.filter((item) => item !== name));
    }
  }

  function selectAll(value) {
    //if select all check mark is checked, the updateValue call back function update value to true
    //this makes setSelected to add all listOptions
    //if unchecked, hence false, the setSelected is updated to an empty array
    if (value) {
      // if true
      const mappedValue = data.AllGuarantor.map((item) => {
        return item._id;
      });
      setSelected(mappedValue); // select all
    } else {
      setSelected([]); // unselect all
    }
  }
  // END CHECKBOX SECTION

  //USE EFFECT FUNCTION TO MAKE THE OPEN OPTIONS CLOSE ON MOUSE DOWN OR ON CLICK.
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setSelectedItemId(null);
      }
    };

    if (selectedItemId !== null) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [selectedItemId]);

  //END USE EFFECT FUNCTION TO MAKE THE OPEN OPTIONS CLOSE ON MOUSE DOWN OR ON CLICK.

  //USE EFFECT FUNCTION TO MAKE THE OPEN STATUS OPTIONS CLOSE ON MOUSE DOWN OR ON CLICK.
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRefAgainAgain.current && !modalRefAgainAgain.current.contains(event.target)) {
        setSelectPerPage(false);
      }
    };

    if (selectPerPage) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [selectPerPage]);
  //END USE EFFECT FUNCTION TO MAKE THE OPEN STATUS OPTIONS CLOSE ON MOUSE DOWN OR ON CLICK.

  // HANDLE DELETE
  const handleDelete = (id) => {
    openDelModal();
    const arrayTest = [];
    arrayTest.push(id);
    // console.log(arrayTest);
    setSelected(arrayTest);
    setSelectedItemId(null);
  };

  // const handleMultiDelete = () => {
  //   openDelModal();
  //   //we can put this empty array outside this function...
  //   // console.log(selected);
  //   setSelectedItemId(null);
  // };
  // END HANDLE DELETE
  //EDIT ADMIN USER STATUS
  // const updateAdminStatus = () => {
  //   console.log("update status");
  //   console.log(selected);
  //   updateUserStatus(selected);
  // };
  //END EDIT ADMIN USER STATUS

  // VIEW THIS USER
  const viewThisUser = (item) => {
    setViewUser(item);
    setSelectedItemId(null);
    openViewModal();
  };
  // END VIEW THIS USER
  // EDIT THIS USER
  const editThisUser = (item) => {
    setEditUser(item);
    setSelectedItemId(null);
    openEditModal();
  };
  //END EDIT THIS USER
  // console.log(selected);
  if (isLoading) {
    return <PageLoading />;
  }

  return (
    <div className="bioDataProfileContainer">
      {/* {isModalOpen && <AddAdminModal />} */}
      {isDeleteModalOpen && <DeleteGUAModal deletedItem={selected} />}
      {isViewModalOpen && <EmployeeGuaModal viewUser={viewUser} />}
      {isEditModalOpen && <EditEmployeeGuaModal editUser={editUser} />}
      {isExportModalOpen && <ExportGua editUser={editUser} />}
      <div className="addAdminBody">
        <div className="addAdminControl">
          <div className="searchBar">
            <FaSistrix className="searchIcon" />
            <input
              className="searchInput"
              type="search"
              placeholder="Search Admins"
              onChange={handleSearch}
              value={searchQuery}
            />
          </div>
          <div className="actionButtons">
            {/* <button
              className="btnAdmin"
              disabled={selected && selected.length == 0}
              onClick={updateAdminStatus}>
              Status
            </button> */}
            {/* <button
              className="btnAdmin"
              disabled={selected && selected.length == 0}
              onClick={handleMultiDelete}>
              Delete
            </button> */}
            <button className="btnAdmin" onClick={openExportModal}>
              Export
            </button>
          </div>
        </div>
        <div className="addAdminTable">
          <div className="tableBody">
            <table>
              <thead>
                <tr style={{ position: "relative" }}>
                  <th>
                    {/* passed name which is item, value, which checks if item selected is included in
                    the array item, updatedValue which handles the function that add the item
                    selected to an array of objects this props are passed into the Checkbox child
                    component. */}
                    <Checkbox
                      name="all"
                      value={
                        data &&
                        data.AllGuarantor &&
                        data.AllGuarantor.length > 0 &&
                        data.AllGuarantor.length === selected.length
                      }
                      updateValue={selectAll}></Checkbox>
                  </th>
                  <th>Employee</th>
                  <th>Guarantor</th>
                  <th>Employer</th>
                  <th>Occupation</th>
                  <th>Completed</th>
                  <th>Number</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {currentItems && currentItems.length >= 1 ? (
                  currentItems.map((item) => {
                    const isChecked = selected.includes(item._id);
                    return (
                      <tr
                        key={item._id}
                        style={{ position: "relative", cursor: "pointer" }}
                        onClick={(e) => {
                          // prevent row-click from firing when clicking on buttons or checkbox
                          if (
                            e.target.type === "checkbox" ||
                            e.target.tagName === "BUTTON" ||
                            e.target.closest(".actionIcon")
                          ) {
                            return;
                          }

                          handleSelect(!isChecked, item._id);
                        }}>
                        <td>
                          <Checkbox
                            name={item._id}
                            value={selected.includes(item._id)}
                            updateValue={handleSelect}></Checkbox>
                        </td>
                        <td>
                          <div>
                            {item && item.user && item.user.firstName
                              ? capitalizeFirstLetter(item.user.firstName)
                              : ""}{" "}
                            {item && item.user && item.user.lastName
                              ? capitalizeFirstLetter(item.user.lastName)
                              : ""}
                          </div>
                        </td>
                        <td>{item && item.fullName ? capitalizeFirstLetter(item.fullName) : ""}</td>
                        <td>{item && item.employer ? capitalizeFirstLetter(item.employer) : ""}</td>
                        <td>
                          <div>
                            {item && item.occupation ? capitalizeFirstLetter(item.occupation) : ""}
                          </div>
                        </td>
                        <td>
                          <div className={item.isCompleted === 1 ? "tagGreen" : "tagRed"}>
                            {item.isCompleted === 1 ? "True" : "False"}
                          </div>
                        </td>
                        <td>{item && item.phoneNumber}</td>
                        <td style={{ position: "relative" }}>
                          <FaArrowsUpDownLeftRight
                            className="actionIcon"
                            onClick={() => {
                              setSelectedItemId((prev) => (prev === item._id ? null : item._id));
                            }}
                          />
                          <div className="selectedItemIdClass">
                            {selectedItemId === item._id && (
                              <div
                                ref={modalRef}
                                className="dropdownBox"
                                onClick={(e) => e.stopPropagation()}>
                                <button className="sideButton" onClick={() => viewThisUser(item)}>
                                  <FaRegEye /> View
                                </button>
                                <button className="sideButton" onClick={() => editThisUser(item)}>
                                  <FaPencil /> Edit
                                </button>
                                {item.isCompleted === 0 && (
                                  <button
                                    className="sideButton"
                                    onClick={() => handleDelete(item._id)}>
                                    {" "}
                                    <FaTrashCan /> Delete
                                  </button>
                                )}
                              </div>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr></tr>
                )}
              </tbody>
            </table>

            {currentItems.length <= 0 && <NoData />}
          </div>
        </div>
        <div className="paginationBody">
          <ReactPaginate
            breakLabel="..."
            nextLabel="next >"
            onPageChange={handlePageClick}
            pageRangeDisplayed={5}
            pageCount={pageCount}
            previousLabel="< prev"
            renderOnZeroPageCount={null}
            containerClassName="pagination"
            pageLinkClassName="page-num"
            previousLinkClassName="page-num"
            nextLinkClassName="page-num"
            activeLinkClassName="active"
          />

          <div className="selectPerPageClass">
            {selectPerPage && (
              <div
                ref={modalRefAgainAgain}
                className="dropDownPagination"
                onClick={(e) => e.stopPropagation()}>
                <button className="sideButton" onClick={() => handleItemsPerPageChange(5)}>
                  5 / Page
                </button>
                <button className="sideButton" onClick={() => handleItemsPerPageChange(10)}>
                  10 / Page
                </button>
                <button className="sideButton" onClick={() => handleItemsPerPageChange(20)}>
                  20 / Page
                </button>
              </div>
            )}
            <button
              className="btnAdmin"
              onClick={() => {
                setSelectPerPage(!selectPerPage);
              }}>
              {itemsPerPage} / Page
            </button>
          </div>
          <div>
            Showing {start} - {end} of {total}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminGua;
