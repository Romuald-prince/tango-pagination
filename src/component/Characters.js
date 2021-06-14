import React, { useEffect, useState } from "react";
import {Link} from "react-router-dom";
import {Button} from "react-bootstrap";
import SmartTable from "./SmartTable";
const Characters = () => {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);


  const setLinkToState = (res) =>{
    for (var pair of res.headers.entries()) {
      if(pair[0] === "link"){
        findsize(pair[1]);
        console.log(typeof pair[1])
      }
      console.log(pair[0]+ ': '+ pair[1]);
   }
  }


  const findsize =(text) =>{
      const firstIndex = text.indexOf("first");
      const startIndex = text.indexOf("page",firstIndex);
      const finishIndex = text.indexOf("&",firstIndex);
      const substring = parseInt(text.substring(startIndex,finishIndex).replace(/\D/g, ""),10);
      console.log("substring",substring);
      setTotal(substring);
  }
  const  fetchData = async (page, size) => {
    await fetch(
      "https://anapioficeandfire.com/api/characters?page=" +
        page +
        "&pageSize=" +
        size
    )
    .then(res => {setLinkToState(res); return res})
      .then((res) => res.json())
      .then((data) => {
        setPage(page);
        setPageSize(size);
        console.log(data);
        setData(data);
        
      });
  };

  useEffect(() => {
    fetchData(page, pageSize);
  }, []);

  const showData = (data,accessor) => {
    let value = null;
    if(accessor === "name"){
      if(data.name)
        value = data.name;
      else
        value = "";
      if(data.aliases){
        data.aliases.forEach(element => {
          if(value.length>0)
            value += ", "+element;
          else
            value += element;
        });
      }
      if(value.slice(-1) === ',')
        value = value.slice(0,-1);
      return value;
    }

    if(accessor === "allegiances"){
      if(data.allegiances && data.allegiances.length>0){
        
        value = [];
        data.allegiances.forEach(element => {
          const id = element.replace(/\D/g, '');
          const item = (<Link to={"/housedetail/" +id }><Button className="mr-2">{id}</Button></Link>);
          value.push(item);
          
        })
        return value;
      }
      else
        return (<p>Unknow</p>);
    }

    return data[accessor].length === 0 ? "Unknown" : data[accessor];
  };

  const columns = [
    {
      name: "Character",
      accessor: "name​",
      cell: (row) => <div className="name-field"><p>{showData(row,"name")}</p></div>,
    },

    {
      name: "Alive",
      accessor: "createdDate",
      cell: (row) => <div>{row.died.length === 0 ? "Yes" : "No"}</div>,
    },

    {
      name: "Gender",
      accessor: "gender",
      cell: (row) => <div>{showData(row,"gender")}</div>,
    },

    {
      name: "Culter",
      accessor: "culture",
      cell: (row) => <div>{showData(row,"culture")}</div>,
    },

    {
      name: "Allegiances",
      accessor: "allegiances",
      cell: (row) => <div>{showData(row,"allegiances")}</div>,
    },

    {
      name: "Books",
      accessor: "books",
      cell: (row) => <div>{row.books.length}</div>,
    },

    // todo: romuald will add other column
  ];

  return (
    <div className="col">
      <div className="row">filter component is here</div>
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
