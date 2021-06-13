import React, { useState, useEffect } from "react";
import SmartTable from "./SmartTable";

const Filter = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState("");
  const [filteredGender, setFilteredGender] = useState([]);

  useEffect((page, size) => {
    fetch(
      "https://anapioficeandfire.com/api/characters?page=" +
        page +
        "&pageSize=" +
        size
    )
      .then((res) => res.json())
      .then((data) => {
        setData(data);
      });
  }, []);

  function search(rows) {
    return rows.filter(
      (row) => row.culter.toLowerCase().indexOf(filteredData) > -1
    );
  }

  return (
    <div>
      <div class="container">
        <div class="row">
          <div class="col">
            <input
              type="text"
              class="form-control"
              placeholder="Culter"
              value={filteredData}
              onChange={(event) => {
                setFilteredData(event.target.value);
              }}
            />
          </div>
          <div>
            <SmartTable data={search(data)} />
          </div>
          <div class="col">
            <select
              id="inputState"
              class="form-control"
              onClick={() => setFilteredGender()}
            >
              <option selected>Gender</option>
              <option>Male</option>
              <option>Female</option>
              <option>Unkown</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Filter;
