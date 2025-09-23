import React, { useState, useRef, useEffect } from "react";
import {
  FaSistrix,
  FaArrowsUpDownLeftRight,
  FaRegEye,
  FaPencil,
  FaTrashCan,
} from "react-icons/fa6";
import { useGlobalContext } from "../../../../Context/userContext";
import DeleteAdminModal from "../../../../Components/Modal/DeleteAdminModal";
import EmployeeBioModal from "../../../../Components/Modal/BIO/EmployeeBioModal";
import EditEmployeeBioModal from "../../../../Components/Modal/BIO/EditEmployeeBioModal";
import ExportBio from "../../../../Components/Modal/Exports/ExportBio";
import Checkbox from "../../../../Components/CheckBoxTest";
import { useQuery } from "@tanstack/react-query";
import { axiosFetch } from "../../../../Utils/axiosFetch";
import PageLoading from "../../../../Components/Checks/PageLoading";
import capitalizeFirstLetter from "../../../../Components/ToUpperCase";
import ReactPaginate from "react-paginate";
import { toast } from "react-toastify";
import NoData from "../../../../Components/Modal/NoData";
import "../adminUser.css";

const AddAdmin = () => {
  const [selected, setSelected] = useState([]);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const {
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
    queryKey: ["adminBioDataOneKey"],
    retryOnMount: true, //do not retry on mount
    refetchOnWindowFocus: false, //do not refetch on window focus
    refetchOnReconnect: true, //do not refetch on reconnect
    refetchOnMount: true, //do not refetch on mount
    refetchInterval: false, //do not refetch at intervals
    refetchIntervalInBackground: true, //do not refetch in background
    queryFn: async () => {
      const { data } = await axiosFetch.get("/admins/getAllBioData");
      // console.log(data);
      // console.log(data.AllBioData);
      // console.log(data.AllBioData.length);
      setPaginationData(data.AllBioData);
      setSelected([]);
      //   setItemOffset(0);
      return data;
    },
  });

  //USE STALE DATA IF AVAILABLE
  // This will set the pagination data to the fetched data when it is available
  useEffect(() => {
    data && setPaginationData(data.AllBioData);
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

    const filterQuery = data.AllBioData.filter((user) => {
      const fullName = `${user.firstName} ${user.lastName}`.toLowerCase();
      return (
        user.jobLocation?.toLowerCase().includes(query) ||
        user.staffId?.toLowerCase().includes(query) ||
        user.jobName?.toLowerCase().includes(query) ||
        fullName.includes(query) ||
        user.email?.toLowerCase().includes(query)
      );
    });
    setPaginationData(filterQuery);
    //Controls what page to display when you search, in this case page 1
    setItemOffset(0);
  };
  // END SEARCH SECTION

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
      const mappedValue = data.AllBioData.map((item) => {
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
  // const handleDelete = (id) => {
  //   openDelModal();
  //   const arrayTest = [];
  //   arrayTest.push(id);
  //   // console.log(arrayTest);
  //   setSelected(arrayTest);
  //   setSelectedItemId(null);
  // };

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
      {isDeleteModalOpen && <DeleteAdminModal deletedItem={selected} />}
      {isViewModalOpen && <EmployeeBioModal viewUser={viewUser} />}
      {isEditModalOpen && <EditEmployeeBioModal editUser={editUser} />}
      {isExportModalOpen && <ExportBio editUser={editUser} />}
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
                        data.AllBioData &&
                        data.AllBioData.length > 0 &&
                        data.AllBioData.length === selected.length
                      }
                      updateValue={selectAll}></Checkbox>
                  </th>
                  <th>Name</th>
                  <th>Staff ID</th>
                  <th>Job Name</th>
                  <th>Location</th>
                  <th>Status</th>
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
                          {capitalizeFirstLetter(item.firstName)}{" "}
                          {capitalizeFirstLetter(item.lastName)}
                        </td>
                        {/* <td>{item && item.dateOfBirth.split("T")[0]}</td> */}
                        <td>{item.staffId}</td>
                        <td>{item.jobName}</td>
                        <td>
                          <div>{item.jobLocation}</div>
                        </td>
                        <td>
                          {item.user
                            ? capitalizeFirstLetter(item.user.employeeStatus)
                            : "Employee Status"}
                        </td>
                        <td>
                          <div>{item.phoneNumber}</div>
                        </td>
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

export default AddAdmin;
