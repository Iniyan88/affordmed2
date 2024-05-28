import React from "react";

const Table = ({ data, headers }) => {
  return (
    <table className="w-full table-auto shadow rounded-md">
      <thead>
        <tr className="bg-gray-100 text-gray-700 text-left">
          {headers.map((header) => (
            <th className="px-4 py-2" key={header}>
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row) => (
          <tr
            key={row.id || Math.random()}
            className="border-b border-gray-200 hover:bg-gray-100"
          >
            {headers.map((header) => (
              <td className="px-4 py-2" key={header}>
                {row[header]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
