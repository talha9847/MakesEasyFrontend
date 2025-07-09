import axios from "axios";
import React, { useState } from "react";

const People = () => {
  const [people, setPeople] = useState([]);
  const getPeople = async () => {
    const result = await axios.get(
      "http://localhost:5169/api/People/GetPeopleByVillage",
      { withCredentials: true }
    );
    if (result.status == 200) {
      console.log(result.data);
    }
  };
  return (<div></div>);
};

export default People;
