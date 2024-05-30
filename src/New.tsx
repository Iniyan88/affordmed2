import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import { useState, useEffect } from "react";
interface TableData {
  techruitCount: number;
  techruitList: Array<Item>;
  coursesCount: number;
  coursesList: Array<Item>;
  fellowshipCount: number;
  fellowshipList: Array<Item>;
}

import { motion } from "framer-motion";
interface Item {
  id: string;
  name: string;
  mobileNo: string;
  emailId: string;
  field: string;
}

const New = () => {
  const [limit, setLimit] = useState(5);
  const [pageIndex, setPageIndex] = useState(1);
  const [searchKey, setSearchKey] = useState("courses");
  const [tableData, setTableData] = useState<TableData | null>(null);
  const [listmap, setMap] = useState("");
  const handleTableDataLoaded = (data: any) => setTableData(data);

  const handlePerPageChange = (event: any) => {
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
        return tableData?.techruitList || [];
      case "courses":
        return tableData?.coursesList || [];
      case "fellowship":
        return tableData?.fellowshipList || [];
      default:
        return [];
    }
  };
  const filteredData = getFilteredData().slice(0, limit);

  return (
    <motion.div className="container mx-auto p-4">
      <h1 className="text-3xl mb-4">Employee</h1>

      <motion.div
        className="grid grid-cols-3 gap-4 p-4
      "
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          type: "tween",
          duration: 0.2,
        }}
      >
        <button
          onClick={() => handleFilterClick("techruit")}
          className="bg-gray-100 p-4 text-center border border-gray-300"
        >
          TechruitCount: {tableData?.techruitCount || []}
        </button>
        <button
          onClick={() => handleFilterClick("courses")}
          className="bg-gray-100 p-4 text-center border border-gray-300"
        >
          CoursesCount: {tableData?.coursesCount || []}
        </button>
        <button
          onClick={() => handleFilterClick("fellowship")}
          className="bg-gray-100 p-4 text-center border border-gray-300"
        >
          FellowShipCount: {tableData?.fellowshipCount || []}
        </button>
      </motion.div>
      <h1 className="font-bold mt-7 w-full ml-96">
        {" "}
        {listmap.toUpperCase()}
        {"!!"}
      </h1>

      <motion.div className="mb-4">
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
      </motion.div>
      <Button variant="ghost">hello</Button>

      <Table
        //  color={selectedColor}
        selectionMode="single"
        defaultSelectedKeys={["2"]}
        aria-label="Example static collection table"
      >
        <TableHeader>
          <TableColumn>Name</TableColumn>
          <TableColumn>Contact Number</TableColumn>
          <TableColumn>Email</TableColumn>
          <TableColumn>Field</TableColumn>
        </TableHeader>
        <TableBody>
          {filteredData &&
            filteredData.map((item: any) => (
              <TableRow key={item.id}>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.mobileNo}</TableCell>
                <TableCell>{item.emailId}</TableCell>
                <TableCell>{item.field}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </motion.div>
  );
};

export default New;
