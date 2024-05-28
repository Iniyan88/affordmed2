import React, { useState, useEffect } from "react";

function AdminDashboard() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(5);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      const response = await fetch(
        `https://hub.dummyapis.com/employee?noofRecords=1000`
      );
      const jsonData = await response.json();
      setData(jsonData);
      setLoading(false);
      setTotalPages(Math.ceil(jsonData.length / perPage));
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const handleNextPage = () => {
    setPage(page + 1);
  };
  const handlePrevPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };
  const handlePerPageChange = (event) => {
    setPerPage(parseInt(event.target.value, 10));
    setPage(1);
  };
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };
  const filteredData = data.filter((item) => {
    const fullName = `${item.firstName}`.toLowerCase();
    const email = item.email.toLowerCase();
    const contactNumber = item.contactNumber;
    const id = item.id.toString();
    return (
      fullName.includes(searchQuery.toLowerCase()) ||
      email.includes(searchQuery.toLowerCase()) ||
      contactNumber.includes(searchQuery) ||
      id.includes(searchQuery)
    );
  });
  const paginatedData = filteredData.slice(
    (page - 1) * perPage,
    page * perPage
  );
  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl mb-4">Employee</h1>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search"
          value={searchQuery}
          onChange={handleSearchChange}
          className="border border-black p-2 rounded"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="perPage">Items Per Page: </label>
        <select
          id="perPage"
          value={perPage}
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
            <th className="p-2 border border-black">ID</th>
            <th className="p-2 border border-black">Image</th>
            <th className="p-2 border border-black">Name</th>
            <th className="p-2 border border-black">Email</th>
            <th className="p-2 border border-black">Contact Number</th>
            <th className="p-2 border border-black">Age</th>
            <th className="p-2 border border-black">Date of Birth</th>
            <th className="p-2 border border-black">Salary</th>
            <th className="p-2 border border-black">Address</th>
          </tr>
        </thead>
        <tbody>
          {paginatedData.map((item) => (
            <tr key={item.id}>
              <td className="p-2 border border-black">{item.id}</td>
              <td className="p-2 border border-black">
                <img
                  src={item.imageUrl}
                  alt="Profile"
                  className="w-12 h-12 rounded-full mx-auto"
                />
              </td>
              <td className="p-2 border border-black">{`${item.firstName} ${item.lastName}`}</td>
              <td className="p-2 border border-black">{item.email}</td>
              <td className="p-2 border border-black">{item.contactNumber}</td>
              <td className="p-2 border border-black">{item.age}</td>
              <td className="p-2 border border-black">{item.dob}</td>
              <td className="p-2 border border-black">{item.salary}</td>
              <td className="p-2 border border-black">{item.address}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-between">
        <button
          className="p-2 mt-4 bg-black text-white rounded hover:bg-slate-600"
          onClick={handlePrevPage}
          disabled={page === 1}
        >
          {"<< Prev"}
        </button>
        <div className="mt-5">
          <span className="text-slate-50 bg-gray-700 rounded-sm px-2 py-2">
            Page {page} of {totalPages}
          </span>
        </div>
        <button
          className="p-2 mt-4 bg-black text-white rounded hover:bg-slate-600 "
          onClick={handleNextPage}
          disabled={page === totalPages}
        >
          {"Next >> "}
        </button>
      </div>
    </div>
  );
}

export default AdminDashboard;
