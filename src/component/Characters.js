import React, { useEffect, useState } from "react";
import SmartTable from "./SmartTable";

const Characters = () => {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);

  const fetchData = (page, size) => {
    fetch(
      "https://anapioficeandfire.com/api/characters?page=" +
        page +
        "&pageSize=" +
        size
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setData(data);
      });
  };

  useEffect(() => {
    fetchData(page, pageSize);
  }, []);

  const showData = (data) => {
    return data.length === 0 ? "Unknown" : data;
  };

  const columns = [
    {
      name: "Character",
      accessor: "name​",
      cell: (row) => <div>{row.name}</div>,
    },

    {
      name: "Alive",
      accessor: "createdDate",
      cell: (row) => <div>{row.died.length === 0 ? "Yes" : "No"}</div>,
    },

    {
      name: "Gender",
      accessor: "gender",
      cell: (row) => <div>{showData(row.gender)}</div>,
    },

    {
      name: "Culter",
      accessor: "culture",
      cell: (row) => <div>{showData(row.culture)}</div>,
    },

    {
      name: "Allegiances",
      accessor: "allegiances",
      cell: (row) => <div>{row.allegiances.length}</div>,
    },

    {
      name: "Books",
      accessor: "books",
      cell: (row) => <div>{showData(row.books.length)}</div>,
    },

    // todo: romuald will add other column
  ];

  return (
    <div className="col">
      <div class="container">
        <div class="row">
          <div class="col">
            <input type="text" class="form-control" placeholder="First name" />
          </div>
          <div class="col">
            <select id="inputState" class="form-control">
              <option selected>Gender</option>
              <option>Male</option>
              <option>Female</option>
              <option>Unkown</option>
            </select>
          </div>
        </div>
      </div>

      <div className="row">
        <SmartTable
          columns={columns}
          fetchData={fetchData}
          data={data}
          total={total}
          page={page}
          size={pageSize}
        />
      </div>
    </div>
  );
};

export default Characters;
