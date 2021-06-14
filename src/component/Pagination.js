import React, { useState } from "react";
import { Pagination } from "react-bootstrap";

const SmartPagination = (props) => {
  const [currentPage, setCurrentPage] = useState(1);

  const isCurrentPage = (number) => {
    return number === currentPage ? "active " : "";
  };

  const handleCurrentPage = (number) => {
    setCurrentPage(number);
    props.listener(number);
  };

  const createItem = (number) => {
    return number ? (
      <Pagination.Item active={number === currentPage} key={number} onClick={() => handleCurrentPage(number)}>
        {number}
      </Pagination.Item>
    ) : (
      <Pagination.Ellipsis key={number} />
    );
  };

  const renderPage = () => {
    let list = [];
    const countPage = Math.ceil(props.total);
    let n = 1;
    while (n <= countPage) {
      let item;
      const number = n;
      if (currentPage <= 6) {
        if (n <= 5 || n <= currentPage + 2 || n > countPage - 2) {
          item = createItem(number);
        } else if (n === countPage - 2) {
          item = createItem();
        }
      } else if (currentPage > 6 && currentPage < countPage - 5) {
        if (
          n <= 2 ||
          n >= countPage - 2 ||
          (currentPage - 2 <= n && n <= currentPage + 2)
        ) {
          item = createItem(number);
        }
        if (n === 3 || n === countPage - 2) {
          item = createItem();
        }
      } else {
        if (n <= 2 || n >= countPage - 5 || n >= currentPage - 2) {
          item = createItem(number);
        }
        if (n === 3) {
          item = createItem();
        }
      }
      list.push(item);
      n++;
    }
    return list;
  };
  return (
    <Pagination id="pagination">
      <Pagination.First onClick={()=>handleCurrentPage(1)}/>
      <Pagination.Prev onClick={()=>handleCurrentPage(currentPage-1)}/>
      {renderPage()}
      <Pagination.Next onClick={()=>handleCurrentPage(currentPage+1)}/>
      <Pagination.Last onClick={()=>handleCurrentPage(props.total)}/>
    </Pagination>
  );
};

export default SmartPagination;
