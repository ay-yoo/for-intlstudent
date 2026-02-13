import React, { useState, useEffect } from "react";

const makeSchool = (name, rank = 1) => ({
  id: crypto.randomUUID(),
  name,
  rank,
  isFavorite: false,
  fields: {
    size: "",
    otherSchool: "",
    weather: "",
    walkscore: "",
  },
});

function Table() {
  const [schools, setSchools] = useState([
    makeSchool("A school"),
    makeSchool("B school"),
    makeSchool("C school"),
  ]);
  return (
    <div>
      <h1>희망학교 List</h1>
    </div>
  );
}

export default Table;
