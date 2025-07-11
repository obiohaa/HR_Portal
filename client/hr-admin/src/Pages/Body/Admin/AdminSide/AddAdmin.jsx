import React, { useState, useRef, useEffect } from "react";
import {
  FaSistrix,
  FaArrowsUpDownLeftRight,
  FaRegEye,
  FaPencil,
  FaTrashCan,
} from "react-icons/fa6";
import { useGlobalContext } from "../../../../Context/userContext";
import AddAdminModal from "../../../../Components/Modal/AddAdminModal";
import DeleteAdminModal from "../../../../Components/Modal/DeleteAdminModal";
import Checkbox from "../../../../Components/CheckBoxTest";
import { useQuery } from "@tanstack/react-query";
import { axiosFetch } from "../../../../Utils/axiosFetch";
import PageLoading from "../../../../Components/Checks/PageLoading";
import capitalizeFirstLetter from "../../../../Components/ToUpperCase";
import ReactPaginate from "react-paginate";
import NoData from "../../../../Components/Modal/NoData";

const AddAdmin = () => {
  const [selected, setSelected] = useState([]);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const { openModal, isModalOpen, openDelModal, isDeleteModalOpen } = useGlobalContext();
  const [paginationData, setPaginationData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const modalRef = useRef(null);

  //GET ALL ADMIN USERS
  const { data, isLoading } = useQuery({
    queryKey: ["registerAdmin"],
    retryOnMount: true, //do not retry on mount
    refetchOnWindowFocus: false, //do not refetch on window focus
    refetchOnReconnect: false, //do not refetch on reconnect
    refetchOnMount: true, //do not refetch on mount
    refetchInterval: false, //do not refetch at intervals
    refetchIntervalInBackground: false, //do not refetch in background
    queryFn: async () => {
      const { data } = await axiosFetch.get("/admins/getAllAdminUsers");
      console.log(data.adminUsers);
      setPaginationData(data.adminUsers);
      setSelected([]);
      setItemOffset(0);
      return data;
    },
  });
  //END GET ALL ADMIN USERS
  //DELETE ADMIN USERS

  //END DELETE ADMIN USERS

  // SEARCH SECTION
  const handleSearch = (e) => {
    e.preventDefault();
    const query = e.target.value;
    setSearchQuery(query);
    const filterQuery = data.adminUsers.filter(
      (results) => results.firstName.includes(query) || results.lastName.includes(query)
    );
    setPaginationData(filterQuery);
    //Controls what page to display when you search, in this case page 1
    setItemOffset(0);
  };
  // END SEARCH SECTION

  // PAGINATION SECTION
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 2;

  const endOffset = itemOffset + itemsPerPage;
  // console.log(`Loading items from ${itemOffset} to ${endOffset}`);
  const currentItems = paginationData.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(paginationData.length / itemsPerPage);
  // console.log(currentItems);
  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % paginationData.length;
    // console.log(`User requested page number ${event.selected}, which is offset ${newOffset}`);
    setItemOffset(newOffset);
  };
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
      const mappedValue = data.adminUsers.map((item) => {
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

  // HANDLE DELETE
  const handleDelete = (id) => {
    openDelModal();
    const arrayTest = [];
    arrayTest.push(id);
    // console.log(arrayTest);
    setSelected(arrayTest);
    setSelectedItemId(null);
  };

  const handleMultiDelete = () => {
    openDelModal();
    //we can put this empty array outside this function...
    // console.log(selected);
    setSelectedItemId(null);
  };

  // END HANDLE DELETE
  // console.log(selected);
  if (isLoading) {
    return <PageLoading />;
  }

  return (
    <div className="bioDataProfileContainer">
      {isModalOpen && <AddAdminModal />}
      {isDeleteModalOpen && <DeleteAdminModal deletedItem={selected} />}
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
            <button className="btnAdmin" disabled={selected && selected.length == 0}>
              Status
            </button>
            <button
              className="btnAdmin"
              disabled={selected && selected.length == 0}
              onClick={handleMultiDelete}>
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
              <thead>
                <tr style={{ position: "relative" }}>
                  <th>
                    {/* passed name which is item, value, which checks if item selected is included in
                    the array item, updatedValue which handles the function that add the item
                    selected to an array of objects this props are passed into the Checkbox child
                    component. */}
                    <Checkbox
                      name="all"
                      value={data && selected.length === data.adminUsers.length}
                      updateValue={selectAll}></Checkbox>
                  </th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Active</th>
                  <th>Created</th>
                  <th>Verified</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {currentItems && currentItems.length >= 1 ? (
                  currentItems.map((item) => {
                    return (
                      <tr key={item._id} style={{ position: "relative" }}>
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
                        <td>{item.email}</td>
                        <td>{item.role}</td>
                        <td>
                          <div className={item.active ? "tagGreen" : "tagRed"}>
                            {item.active.toString()}
                          </div>
                        </td>
                        <td>{item.createdAt.split("T")[0]}</td>
                        <td>
                          <div className={item.isVerified ? "tagGreen" : "tagRed"}>
                            {item.isVerified.toString()}
                          </div>
                        </td>
                        <td style={{ position: "relative" }}>
                          <FaArrowsUpDownLeftRight
                            className="actionIcon"
                            onClick={() => {
                              setSelectedItemId((prev) => (prev === item._id ? null : item._id));
                            }}
                          />

                          {selectedItemId === item._id && (
                            <div
                              ref={modalRef}
                              style={{
                                position: "absolute",
                                top: "-100%",
                                right: "60%",
                                transform: "translateY(-50%)",
                                backgroundColor: "#fff",
                                border: "1px solid #ccc",
                                borderRadius: "8px",
                                boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                                zIndex: 999999,
                                padding: "5px",
                                display: "flex",
                                flexDirection: "column",
                                gap: "5px",
                                minWidth: "230px",
                              }}
                              onClick={(e) => e.stopPropagation()}>
                              <button className="sideButton">
                                <FaRegEye /> View
                              </button>
                              <button className="sideButton">
                                {" "}
                                <FaPencil /> Edit
                              </button>
                              <button className="sideButton" onClick={() => handleDelete(item._id)}>
                                {" "}
                                <FaTrashCan /> Delete
                              </button>
                            </div>
                          )}
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
            previousLabel="< previous"
            renderOnZeroPageCount={null}
            containerClassName="pagination"
            pageLinkClassName="page-num"
            previousLinkClassName="page-num"
            nextLinkClassName="page-num"
            activeLinkClassName="active"
          />
        </div>
      </div>
    </div>
  );
};

export default AddAdmin;
