import { Button } from "react-bootstrap";
import React, { useState, useEffect } from "react";

const Filter = () => {
  const [searchValues, setSearchValues] = useState({ culter: "", gender: "" });

  const handleChange = (e) => {
    const name = e.target.name;
    console.log(e.target);
    const value = e.target.value;
    searchValues[name] = value;
    setSearchValues({ ...searchValues });
  };

  return (
    <div>
      <div class="container">
        <div class="row">
          <div class="col">
            <input
              type="text"
              name="culter"
              class="form-control"
              placeholder="Culter"
              value={searchValues.culter}
              onChange={(e) => {
                handleChange(e);
              }}
            />
          </div>
          <div></div>
          <div class="col">
            <select class="form-control" onChange={(e) => handleChange(e)}>
              <option value="">All</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="unknown">Unkown</option>
            </select>
          </div>
          <Button>Search</Button>
        </div>
      </div>
    </div>
  );
};

export default Filter;
