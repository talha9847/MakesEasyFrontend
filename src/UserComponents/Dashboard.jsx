import axios from "axios";
import React, { useState } from "react";

const Dashboard = () => {
  const [count, setCount] = useState({
    member: "",
    students: "",
    "40 Days": "",
    "4 Month": "",
  });

  getCounts();
  const getCounts = async () => {
    const result = await axios.get(
      "http://localhost:5169/api/People/GetCount",
      {
        withCredentials: true,
      }
    );
    if (result.status == 200) {
      console.log(result.data);
    }
  };
  return <div>Dashboard</div>;
};
 

export default Dashboard;
