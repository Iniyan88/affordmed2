import React, { useState, useEffect } from "react";
import Table from "./Table";

const New = () => {
  const [limit, setLimit] = useState(5);
  const [pageIndex, setPageIndex] = useState(1);
  const [searchKey, setSearchKey] = useState("courses");
  const [tableData, setTableData] = useState([]);
  const [listmap, setMap] = useState("");
  const handleTableDataLoaded = (data) => setTableData(data);

  const handlePerPageChange = (event) => {
    setLimit(parseInt(event.target.value, 10));
  };
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("https://tinyurl.com/dummyapi", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ limit, pageIndex, searchKey }),
      });
      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }
      const responseData = await response.json();
      setTableData(responseData);
    };
    fetchData();
    console.log("fetchData", tableData);
  }, [limit, pageIndex, searchKey]);
  const handleFilterClick = (filterType: string) => {
    setMap(filterType);
  };
  const getFilteredData = () => {
    switch (listmap) {
      case "techruit":
        return tableData.techruitList;
      case "courses":
        return tableData.coursesList;
      case "fellowship":
        return tableData.fellowshipList;
      default:
        return [];
    }
  };
  const filteredData = getFilteredData().slice(0, limit);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl mb-4">Employee</h1>

      <div className="grid grid-cols-3 gap-4 p-4">
        <button
          onClick={() => handleFilterClick("techruit")}
          className="bg-gray-100 p-4 text-center border border-gray-300"
        >
          TechruitCount: {tableData.techruitCount}
        </button>
        <button
          onClick={() => handleFilterClick("courses")}
          className="bg-gray-100 p-4 text-center border border-gray-300"
        >
          CoursesCount: {tableData.coursesCount}
        </button>
        <button
          onClick={() => handleFilterClick("fellowship")}
          className="bg-gray-100 p-4 text-center border border-gray-300"
        >
          FellowShipCount: {tableData.fellowshipCount}
        </button>
      </div>
      <h1 className="font-bold mt-7 w-full ml-96">
        {" "}
        {listmap.toUpperCase()}
        {"!!"}
      </h1>

      <div className="mb-4">
        <label htmlFor="perPage">Items Per Page: </label>
        <select
          id="perPage"
          value={limit}
          onChange={handlePerPageChange}
          className="border border-black p-2 rounded"
        >
          <option value="5">5</option>
          <option value="10">10</option>
        </select>
      </div>

      <table className="w-full border-collapse border border-black">
        <thead className="bg-gray-700 text-slate-100">
          <tr>
            <th className="p-2 border border-black">Name</th>
            <th className="p-2 border border-black">Contact Number</th>
            <th className="p-2 border border-black">Email</th>
            <th className="p-2 border border-black">Field</th>
          </tr>
        </thead>

        {filteredData &&
          filteredData.map((item) => (
            <tr key={item.id}>
              <td className="p-2 border border-black">{item.name}</td>
              <td className="p-2 border border-black">{item.mobileNo}</td>
              <td className="p-2 border border-black">{item.emailId}</td>
              <td className="p-2 border border-black">{item.field}</td>
            </tr>
          ))}
      </table>
    </div>
  );
};

export default New;
