import React, { useState, useEffect } from "react";
import {
  DeleteIcon,
  EditIcon,
  FirstPageBtn,
  LastPageBtn,
  NextPageBtn,
  PrevPageBtn,
  SaveSvg,
} from "./Icons";
import Searchbar from "./Components/Searchbar";
import NodataFound from "./Components/NodataFound";
import SvgLoader from "./Components/SvgLoader";

const headCells = ["", "Name", "Email", "Role", "Action"];
const rowsPerPage = 10;

const Table = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredData, setFilteredData] = useState([]);
  const [isFetching, setIsFetching] = useState(true);
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
        );
        const jsonData = await response.json();
        const dataWithSelection = jsonData.map((item) => ({
          ...item,
          selected: false,
          isEditing: false,
        }));
        setData(dataWithSelection);
        setIsFetching(false);
      } catch (error) {
        setIsFetching(false);
        setData([]);
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    setFilteredData(data);
  }, [data]);

  const handleCheckboxChange = (id) => {
    setData((prevData) =>
      prevData.map((item) =>
        item.id === id ? { ...item, selected: !item.selected } : item
      )
    );
  };

  useEffect(() => {
    const filtered = data.filter(
      (item) =>
        item.name.toLowerCase().includes(searchInput.toLowerCase()) ||
        item.email.toLowerCase().includes(searchInput.toLowerCase()) ||
        item.role.toLowerCase().includes(searchInput.toLowerCase())
    );
    setFilteredData(filtered);
  }, [data, searchInput]);

  const handleDelete = (rowId) => {
    setData(data.filter((obj) => obj.id !== rowId));
  };

  const handleEdit = (rowId) => {
    setData((prevData) =>
      prevData.map((item) =>
        item.id === rowId ? { ...item, isEditing: true } : item
      )
    );
  };

  const handleNameChange = (e, rowId) => {
    const { value } = e.target;
    setData((prevData) =>
      prevData.map((item) =>
        item.id === rowId ? { ...item, name: value } : item
      )
    );
  };

  const handleEmailChange = (e, rowId) => {
    const { value } = e.target;
    setData((prevData) =>
      prevData.map((item) =>
        item.id === rowId ? { ...item, email: value } : item
      )
    );
  };

  const handleRoleChange = (e, rowId) => {
    const { value } = e.target;
    setData((prevData) =>
      prevData.map((item) =>
        item.id === rowId ? { ...item, role: value } : item
      )
    );
  };

  const handleSave = (rowId) => {
    setData((prevData) =>
      prevData.map((item) =>
        item.id === rowId ? { ...item, isEditing: false } : item
      )
    );
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredData.slice(indexOfFirstRow, indexOfLastRow);

  const handlerFun = (value) => {
    setSearchInput(value);
  };
  const handleSelectAll = () => {
    const allSelected = currentRows.every((item) => item.selected);
    const updatedCurrentRows = currentRows.map((item) => ({
      ...item,
      selected: !allSelected,
    }));
    const updatedData = data.map((item) => ({
      ...item,
      selected: updatedCurrentRows.some((row) => row.id === item.id)
        ? !allSelected
        : item.selected,
    }));
    setData(updatedData);
  };
  const handleDeleteSelected = () => {
    const updatedData = data.filter((item) => !item.selected);
    setData(updatedData);
  };

  return (
    <div>
      <Searchbar text={searchInput} setterFun={handlerFun} />
      <table>
        <thead>
          <tr>
            <th>
              <input
                type="checkbox"
                checked={data.length > 0 && data.every((item) => item.selected)}
                onChange={handleSelectAll}
              />
            </th>
            {headCells.slice(1).map((cell, i) => (
              <th key={i}>{cell}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {isFetching ? (
            <tr>
              <td colSpan={headCells.length}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "20px 0px",
                  }}
                >
                  <SvgLoader />
                </div>
              </td>
            </tr>
          ) : currentRows.length > 0 ? (
            currentRows.map((row, index) => (
              <tr
                key={index}
                className={row.selected ? "is-selected-row" : ""}
                style={{
                  backgroundColor:
                    index % 2 === 0 ? "white" : "rgb(244, 243, 243)",
                }}
              >
                <td>
                  <input
                    type="checkbox"
                    checked={row.selected}
                    onChange={() => handleCheckboxChange(row.id)}
                  />
                </td>
                <td>
                  {row.isEditing ? (
                    <input
                      type="text"
                      value={row.name}
                      style={{ outline: "none", padding: "4px" }}
                      onChange={(e) => handleNameChange(e, row.id)}
                    />
                  ) : (
                    row.name
                  )}
                </td>
                <td>
                  {row.isEditing ? (
                    <input
                      type="text"
                      value={row.email}
                      style={{ outline: "none", padding: "4px" }}
                      onChange={(e) => handleEmailChange(e, row.id)}
                    />
                  ) : (
                    row.email
                  )}
                </td>
                <td>
                  {row.isEditing ? (
                    <input
                      type="text"
                      value={row.role}
                      style={{ outline: "none", padding: "4px" }}
                      onChange={(e) => handleRoleChange(e, row.id)}
                    />
                  ) : (
                    row.role
                  )}
                </td>
                <td>
                  <div className="btn-container">
                    {row.isEditing ? (
                      <button
                        className="save action-btn"
                        onClick={() => handleSave(row.id)}
                      >
                        <SaveSvg />
                      </button>
                    ) : (
                      <button
                        className="edit action-btn"
                        onClick={() => handleEdit(row.id)}
                      >
                        <EditIcon />
                      </button>
                    )}
                    <button
                      className="delete action-btn"
                      onClick={() => handleDelete(row.id)}
                    >
                      <DeleteIcon />
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={headCells.length}>
                <NodataFound />
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <div className="paginated-div">
        <button className="delete-all" onClick={() => handleDeleteSelected()}>
          Delete Selected
        </button>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
          }}
        >
          <button
            onClick={() => handlePageChange(1)}
            className="first-page pagination-btn"
          >
            <FirstPageBtn />
          </button>
          <button
            onClick={() =>
              handlePageChange(currentPage > 1 ? currentPage - 1 : 1)
            }
            className="previous-page pagination-btn"
          >
            <PrevPageBtn />
          </button>
          {[...Array(Math.ceil(filteredData.length / rowsPerPage))].map(
            (_, index) => (
              <button
                className={`pagination-btn-text ${
                  currentPage === index + 1 ? "active" : ""
                }`}
                key={index}
                onClick={() => handlePageChange(index + 1)}
              >
                {index + 1}
              </button>
            )
          )}
          <button
            className="next-page pagination-btn"
            onClick={() =>
              handlePageChange(
                currentPage < Math.ceil(filteredData.length / rowsPerPage)
                  ? currentPage + 1
                  : Math.ceil(filteredData.length / rowsPerPage)
              )
            }
          >
            <NextPageBtn />
          </button>
          <button
            className="last-page pagination-btn"
            onClick={() =>
              handlePageChange(Math.ceil(filteredData.length / rowsPerPage))
            }
          >
            <LastPageBtn />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Table;
