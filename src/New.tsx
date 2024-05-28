import React, { useEffect, useState } from "react";
function New() {
  const [userList, setUserList] = useState();
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      const response = await fetch(
        " https://hub.dummyapis.com/employee?noofRecords=1"
      );

      const jsonData = await response.json();
      setUserList(jsonData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  return <div>{userList[0].id}</div>;
}

export default New;
