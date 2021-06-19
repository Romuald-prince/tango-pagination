import { Button } from "react-bootstrap";
import React, { useState, useEffect } from "react";

const Filter = (props) => {
  const [searchValues, setSearchValues] = useState({ culter: "", gender: "" });

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    searchValues[name] = value;
    setSearchValues({ ...searchValues });
  };

  const handleSearch = ()=>{
    let text = "";
    if(searchValues.culter.length > 0)
      text += "&culture=" + searchValues.culter;
    if(searchValues.gender.length > 0)
      text += "&gender=" + searchValues.gender;
    props.listener(text);
  }

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
            <select name="gender" class="form-control" onChange={(e) => handleChange(e)}>
              <option value="">All</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="unknown">Unkown</option>
            </select>
          </div>
          <Button onClick={()=>handleSearch()}>Search</Button>
        </div>
      </div>
    </div>
  );
};

export default Filter;
