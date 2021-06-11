import React from "react";

const GenderFilter = () => {
  return (
    <div>
      <select class="form-control form-control-lg">
        <option>Characters</option>
        <option>Male</option>
        <option>Female</option>
        <option>Unkown</option>
      </select>
    </div>
  );
};

export default GenderFilter;
